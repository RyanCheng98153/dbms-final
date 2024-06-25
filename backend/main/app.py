import os
from flask import Flask, render_template
from flask_cors import CORS
from database import create_tables, insert_initial_data
from routes import register_routes

app = Flask(__name__, template_folder='../frontend')
CORS(app)
app.config['UPLOAD_FOLDER'] = 'uploads/'

if not os.path.exists(app.config['UPLOAD_FOLDER']):
    os.makedirs(app.config['UPLOAD_FOLDER'])


register_routes(app)

@app.route('/')
def index():
    """
    Renders the index.html template.

    Returns:
        The rendered index.html template.
    """
    return render_template('index.html')

if __name__ == '__main__':
    create_tables()
    insert_initial_data()
    app.run(debug=True)
