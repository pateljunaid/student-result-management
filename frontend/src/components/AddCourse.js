import React, { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import api from '../api/api';
import './AddCourse.css';

function AddCourse() {
  const [courseName, setCourseName] = useState('');

  const handleAddCourse = () => {
    if (!courseName) {
      toast.error('Please enter the course name.');
      return;
    }

    const courseData = {
      course_name: courseName,
    };

    api.addCourse(courseData)
      .then(data => {
        toast.success(data.message);
        setCourseName('');
      })
      .catch(error => {
        toast.error(error.message);
      });
  };

  return (
    <div className="add-course-container">
      <h2>Add New Course</h2>
      <form>
        <div className="form-group">
          <label>Course Name:</label>
          <input
            type="text"
            value={courseName}
            onChange={(e) => setCourseName(e.target.value)}
          />
        </div>
        <div>
          <button type="button" onClick={handleAddCourse}>Add Course</button>
        </div>
      </form>
    </div>
  );
}

export default AddCourse;

