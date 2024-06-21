from flask import Blueprint, request, jsonify, send_from_directory, current_app
import sqlite3
from config import DATABASE
import os

books_bp = Blueprint('books', __name__)

@books_bp.route('/check_book', methods=['POST'])
def check_book():
    """
    Check if a book with the given title already exists.
    """
    data = request.get_json()
    book_title = data['book_title']
    conn = sqlite3.connect(DATABASE)
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM Book WHERE book_title = ?", (book_title,))
    existing_book = cursor.fetchone()
    conn.close()
    if existing_book:
        return jsonify({"message": "已有同名書籍，是否仍要新增？", "existing": True}), 200
    return jsonify({"existing": False}), 200

@books_bp.route('/add_book', methods=['POST'])
def add_book():
    """
    Add a new book to the database.
    """
    data = request.get_json()
    book_title = data['book_title']
    conn = sqlite3.connect(DATABASE)
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM Book WHERE book_title = ?", (book_title,))
    existing_book = cursor.fetchone()

    if existing_book:
        if '(' in book_title:
            count = int(book_title.split('(')[1].split(')')[0]) + 1
            new_book_title = f"{book_title.split('(')[0]}({count})"
        else:
            new_book_title = f"{book_title}(1)"
    else:
        new_book_title = book_title

    cursor.execute("INSERT INTO Book (ISBN, book_title, author, price, category, edition, current_page) VALUES (?, ?, ?, ?, ?, ?, ?)",
                   (data['ISBN'], new_book_title, data['author'], data['price'], data['category'], data['edition'], data['current_page']))
    conn.commit()
    conn.close()
    return jsonify({"message": f"書籍 {new_book_title} 新增成功！"}), 201

@books_bp.route('/update_page', methods=['PUT'])
def update_page():
    """
    Update the current page of a book.
    """
    data = request.get_json()
    conn = sqlite3.connect(DATABASE)
    cursor = conn.cursor()
    cursor.execute("UPDATE Book SET current_page = ? WHERE id = ?", (data['current_page'], data['book_id']))
    conn.commit()
    conn.close()
    return jsonify({"message": "目前頁數更新成功！"}), 200

@books_bp.route('/upload_pdf', methods=['POST'])
def upload_pdf():
    """
    Upload a PDF file for a book.
    """
    book_id = request.form['book_id']
    if 'file' not in request.files:
        return jsonify({"message": "No file part"}), 400
    file = request.files['file']
    if file.filename == '':
        return jsonify({"message": "No selected file"}), 400
    if file:
        filename = f"book_{book_id}.pdf"
        file.save(os.path.join(current_app.config['UPLOAD_FOLDER'], filename))
        pdf_path = os.path.join(current_app.config['UPLOAD_FOLDER'], filename)
        
        # 更新資料庫中的pdf_path欄位
        conn = sqlite3.connect(DATABASE)
        cursor = conn.cursor()
        cursor.execute("UPDATE Book SET pdf_path = ? WHERE id = ?", (pdf_path, book_id))
        conn.commit()
        conn.close()
        
        return jsonify({"message": "File successfully uploaded"}), 201

@books_bp.route('/view_pdf/<int:book_id>', methods=['GET'])
def view_pdf(book_id):
    """
    View the PDF file for a book.
    """
    conn = sqlite3.connect(DATABASE)
    cursor = conn.cursor()
    cursor.execute("SELECT pdf_path FROM Book WHERE id = ?", (book_id,))
    pdf_path = cursor.fetchone()[0]
    conn.close()
    if pdf_path:
        return send_from_directory(directory=os.path.dirname(pdf_path), path=os.path.basename(pdf_path), as_attachment=False)
    else:
        return jsonify({"message": "PDF not found"}), 404
