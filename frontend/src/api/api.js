const baseURL = 'http://localhost:5000';

const api = {
  addStudent: async (studentData) => {
    try {
      const response = await fetch(`${baseURL}/add_student`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(studentData),
      });
      return await response.json();
    } catch (error) {
      throw new Error('Failed to add student');
    }
  },

  getStudents: async () => {
    try {
      const response = await fetch(`${baseURL}/students_list`, {
        method: 'GET',
      });
      return await response.json();
    } catch (error) {
      throw new Error('Failed to fetch students');
    }
  },

  deleteStudent: async (studentId) => {
    try {
      const response = await fetch(`${baseURL}/delete_student/${studentId}`, {
        method: 'DELETE',
      });
      return await response.json();
    } catch (error) {
      throw new Error('Failed to delete student');
    }
  },

  addCourse: async (courseData) => {
    try {
      const response = await fetch(`${baseURL}/add_course`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(courseData),
      });
      return await response.json();
    } catch (error) {
      throw new Error('Failed to add course');
    }
  },

  getCourses: async () => {
    try {
      const response = await fetch(`${baseURL}/courses_list`, {
        method: 'GET',
      });
      return await response.json();
    } catch (error) {
      throw new Error('Failed to fetch courses');
    }
  },

  deleteCourse: async (courseId) => {
    try {
      const response = await fetch(`${baseURL}/delete_course/${courseId}`, {
        method: 'DELETE',
      });
      return await response.json();
    } catch (error) {
      throw new Error('Failed to delete course');
    }
  },

  addResult: async (resultData) => {
    try {
      const response = await fetch(`${baseURL}/add_result`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(resultData),
      });
      return await response.json();
    } catch (error) {
      throw new Error('Failed to add result');
    }
  },

  getResults: async () => {
    try {
      const response = await fetch(`${baseURL}/results_list`, {
        method: 'GET',
      });
      return await response.json();
    } catch (error) {
      throw new Error('Failed to fetch results');
    }
  },
};

export default api;
