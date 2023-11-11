import React, { useState, useEffect } from 'react';
import api from '../api/api';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './TableStyles.css';

const CoursesList = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // API call to get the list of courses
        const data = await api.getCourses();
        setCourses(data.courses);
      } catch (error) {
        // Handle error and show toast
        console.error(error);
        toast.error('Error fetching courses');
      }
    };

    fetchData();
  }, []);

  const handleDeleteCourse = async (courseId) => {
    try {
      // API call to delete a course
      const data = await api.deleteCourse(courseId);

      // Update state to reflect the deletion
      setCourses((prevCourses) => prevCourses.filter((course) => course.id !== courseId));

      // Show success message
      toast.success(data.message);
    } catch (error) {
      // Handle error and show toast
      console.error(error);
      toast.error('Error deleting course');
    }
  };

  return (
    <div className="comp-container">
      <h2>Courses List</h2>
      <table className="styled-table">        
        <thead>
          <tr>
            <th>Course Name</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {courses.map((course) => (
            <tr key={course.id}>
              <td>{course.course_name}</td>
              <td>
                <button onClick={() => handleDeleteCourse(course.id)}>❌</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CoursesList;

