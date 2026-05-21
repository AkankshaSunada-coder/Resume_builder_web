from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)

# Configure SQLite database
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

# -------------------
# MODELS
# -------------------
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80))
    email = db.Column(db.String(120), unique=True, nullable=False)

class Resume(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(120))
    content = db.Column(db.Text)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))

class Notification(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    message = db.Column(db.String(200))
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))

# -------------------
# ROUTES
# -------------------

@app.route('/')
def home():
    return "Resume Builder Backend Running!"

# Create a new user
@app.route('/user', methods=['POST'])
def create_user():
    data = request.json
    new_user = User(name=data['name'], email=data['email'])
    db.session.add(new_user)
    db.session.commit()
    return jsonify({"message": "User created successfully!"})

# Get all users
@app.route('/users', methods=['GET'])
def get_users():
    users = User.query.all()
    return jsonify([{"id": u.id, "name": u.name, "email": u.email} for u in users])

# Create a resume
@app.route('/resume', methods=['POST'])
def create_resume():
    data = request.json
    new_resume = Resume(title=data['title'], content=data['content'], user_id=data['user_id'])
    db.session.add(new_resume)
    db.session.commit()
    return jsonify({"message": "Resume created successfully!"})

# Get resumes for a user
@app.route('/resumes/<int:user_id>', methods=['GET'])
def get_resumes(user_id):
    resumes = Resume.query.filter_by(user_id=user_id).all()
    return jsonify([{"id": r.id, "title": r.title, "content": r.content} for r in resumes])

# Add a notification
@app.route('/notification', methods=['POST'])
def add_notification():
    data = request.json
    new_note = Notification(message=data['message'], user_id=data['user_id'])
    db.session.add(new_note)
    db.session.commit()
    return jsonify({"message": "Notification added!"})

# Get notifications for a user
@app.route('/notifications/<int:user_id>', methods=['GET'])
def get_notifications(user_id):
    notes = Notification.query.filter_by(user_id=user_id).all()
    return jsonify([{"id": n.id, "message": n.message} for n in notes])

# -------------------
# INIT
# -------------------
if __name__ == '__main__':
    db.create_all()
    app.run(debug=True)
