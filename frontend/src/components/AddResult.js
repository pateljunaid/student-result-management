import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import api from '../api/api';
import './FormStyles.css';

const AddResult = () => {
  const [formData, setFormData] = useState({
    courseId: '',
    studentId: '',
    score: '',
  });

  const [courses, setCourses] = useState([]);
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const coursesData = await api.getCourses();
        const studentsData = await api.getStudents();
        setCourses(coursesData.courses);
        setStudents(studentsData.students);
      } catch (error) {
        toast.error('Error fetching data');
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.courseId || !formData.studentId || !formData.score) {
      toast.error('Please select course, student, and score');
      return;
    }

    try {
      const result = await api.addResult(formData);

      toast.success(result.message);

      setFormData({
        courseId: '',
        studentId: '',
        score: '',
      });
    } catch (error) {
      toast.error('Error adding result');
    }
  };

  return (
    <div className="comp-container">
      <h2>Add New Result</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="course">Course:</label>
        <select
          id="course"
          value={formData.courseId}
          onChange={(e) => setFormData({ ...formData, courseId: e.target.value })}
        >
          <option value="">Select Course</option>
          {courses.map((course) => (
            <option key={course.id} value={course.id}>
              {course.course_name}
            </option>
          ))}
        </select>

        <label htmlFor="student">Student:</label>
        <select
          id="student"
          value={formData.studentId}
          onChange={(e) => setFormData({ ...formData, studentId: e.target.value })}
        >
          <option value="">Select Student</option>
          {students.map((student) => (
            <option key={student.id} value={student.id}>
              {`${student.first_name} ${student.family_name}`}
            </option>
          ))}
        </select>

        <label htmlFor="score">Score:</label>
        <select
          id="score"
          value={formData.score}
          onChange={(e) => setFormData({ ...formData, score: e.target.value })}
        >
          <option value="">Select Score</option>
          <option value="A">A</option>
          <option value="B">B</option>
          <option value="C">C</option>
          <option value="D">D</option>
          <option value="E">E</option>
          <option value="F">F</option>
        </select>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AddResult;

