from flask import Flask, render_template, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///students.db'
db = SQLAlchemy(app)

class Student(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(50), nullable=False)
    family_name = db.Column(db.String(50), nullable=False)
    dob = db.Column(db.String(10), nullable=False)
    email = db.Column(db.String(50), nullable=False, unique=True)

class Course(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    course_name = db.Column(db.String(50), nullable=False)

class Result(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    course_id = db.Column(db.Integer, db.ForeignKey('course.id'), nullable=False)
    student_id = db.Column(db.Integer, db.ForeignKey('student.id'), nullable=False)
    score = db.Column(db.String(1), nullable=False)

with app.app_context():
    db.create_all()

@app.route('/add_student', methods=['POST'])
def add_student():
    if request.method == 'POST':
        data = request.get_json()

        new_student = Student(
            first_name=data['first_name'],
            family_name=data['family_name'],
            dob=data['dob'],
            email=data['email']
        )

        db.session.add(new_student)
        db.session.commit()

        return jsonify({'message': 'Student added successfully'}), 200

@app.route('/students_list', methods=['GET'])
def students_list():
    students = Student.query.all()
    student_list = []
    for student in students:
        student_list.append({
            'id': student.id,
            'first_name': student.first_name,
            'family_name': student.family_name,
            'dob': student.dob,
            'email': student.email
        })
    return jsonify({'students': student_list}), 200

@app.route('/delete_student/<int:id>', methods=['DELETE'])
def delete_student(id):
    student = Student.query.get(id)
    if student:
        db.session.delete(student)
        db.session.commit()
        return jsonify({'message': 'Student deleted successfully'}), 200
    else:
        return jsonify({'message': 'Student not found'}), 404

@app.route('/add_course', methods=['POST'])
def add_course():
    if request.method == 'POST':
        data = request.get_json()

        new_course = Course(
            course_name=data['course_name']
        )

        db.session.add(new_course)
        db.session.commit()

        return jsonify({'message': 'Course added successfully'}), 200

@app.route('/courses_list', methods=['GET'])
def courses_list():
    courses = Course.query.all()
    course_list = []
    for course in courses:
        course_list.append({
            'id': course.id,
            'course_name': course.course_name
        })
    return jsonify({'courses': course_list}), 200

@app.route('/delete_course/<int:course_id>', methods=['DELETE'])
def delete_course(course_id):
    try:
        # Find the course by ID
        course = Course.query.get(course_id)

        if course:
            # Delete the course
            db.session.delete(course)
            db.session.commit()

            return jsonify({'message': 'Course deleted successfully'}), 200
        else:
            return jsonify({'message': 'Course not found'}), 404
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    
@app.route('/add_result', methods=['POST'])
def add_result():
    if request.method == 'POST':
        data = request.get_json()

        new_result = Result(
            course_id=data['courseId'],
            student_id=data['studentId'],
            score=data['score']
        )

        db.session.add(new_result)
        db.session.commit()

        return jsonify({'message': 'Result added successfully'}), 200

@app.route('/results_list', methods=['GET'])
def results_list():
    results = Result.query.all()
    result_list = []

    for result in results:
        course = Course.query.get(result.course_id)
        student = Student.query.get(result.student_id)

        if student and course:
            result_list.append({
                'course': course.course_name,
                'student': f'{student.first_name} {student.family_name}',
                'score': result.score
            })

    return jsonify({'results': result_list}), 200


if __name__ == '__main__':
    app.run(debug=True)
