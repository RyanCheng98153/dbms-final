from flask import Flask, render_template
from flask_cors import CORS
import os
from database import create_tables, update_database_schema
from routes import register_routes

app = Flask(__name__)
CORS(app)
app.config['UPLOAD_FOLDER'] = 'uploads/'

if not os.path.exists(app.config['UPLOAD_FOLDER']):
    os.makedirs(app.config['UPLOAD_FOLDER'])

# 註冊路由
register_routes(app)

@app.route('/')
def index():
    return "Hello, this is the backend for the book management system."

if __name__ == '__main__':
    create_tables()
    update_database_schema()
    app.run(debug=True)
