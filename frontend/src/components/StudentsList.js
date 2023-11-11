import React, { useState, useEffect } from 'react';
import api from '../api/api';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './TableStyles.css';

const StudentsList = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await api.getStudents();
        setStudents(data.students);
      } catch (error) {
        console.error(error);
        toast.error('Error fetching students');
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (studentId) => {
    try {
      const data = await api.deleteStudent(studentId);

      setStudents((prevStudents) => prevStudents.filter((student) => student.id !== studentId));

      toast.success(data.message);
    } catch (error) {
      console.error(error);
      toast.error('Error deleting student');
    }
  };

  return (
    <div className="comp-container">
      <h2>Students List</h2>
      <table className="styled-table">        
        <thead>
          <tr>
            <th>Name & Family</th>
            <th>DOB</th>
            <th>Email</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.id}>
              <td>{`${student.first_name} ${student.family_name}`}</td>
              <td>{student.dob}</td>
              <td>{student.email}</td>
              <td>
                <button onClick={() => handleDelete(student.id)}>❌</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentsList;

