import React, { useState } from 'react';
import { toast } from 'react-toastify';
import api from '../api/api';

const AddStudent = () => {
  const [formData, setFormData] = useState({
    first_name: '',
    family_name: '',
    dob: '',
    email: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    for (const key in formData) {
      if (formData[key] === '') {
        toast.error('Please fill in all fields');
        return;
      }
    }

    const dobDate = new Date(formData.dob);
    const today = new Date();
    const age = today.getFullYear() - dobDate.getFullYear();

    if (age < 10) {
      toast.error('Student must be at least 10 years old.');
      return;
    }

    try {
      const result = await api.addStudent(formData);

      toast.success(result.message);

      setFormData({
        first_name: '',
        family_name: '',
        dob: '',
        email: '',
      });
    } catch (error) {
      toast.error('Error adding student');
    }
  };

  return (
    <div className="comp-container">
      <h2>Add New Student</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="first_name">First Name:</label>
        <input
          type="text"
          id="first_name"
          value={formData.first_name}
          onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
        />

        <label htmlFor="family_name">Family Name:</label>
        <input
          type="text"
          id="family_name"
          value={formData.family_name}
          onChange={(e) => setFormData({ ...formData, family_name: e.target.value })}
        />

        <label htmlFor="dob">Date of Birth:</label>
        <input
          type="date"
          id="dob"
          value={formData.dob}
          onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
        />

        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AddStudent;
