import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import AddStudent from './components/AddStudent';
import StudentsList from './components/StudentsList';
import AddCourse from './components/AddCourse';
import CoursesList from './components/CoursesList';
import AddResult from './components/AddResult';
import ResultsList from './components/ResultsList';
import Home from './components/Home';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app-container">
        <ToastContainer />
        <nav className="nav-bar">
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/add_student">Add New Students</Link></li>
            <li><Link to="/students_list">Students List</Link></li>
            <li><Link to="/add_course">Add New Courses</Link></li>
            <li><Link to="/courses_list">Courses List</Link></li>
            <li><Link to="/add_result">Add New Results</Link></li>
            <li><Link to="/results_list">Results List</Link></li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add_student" element={<AddStudent />} />
          <Route path="/students_list" element={<StudentsList />} />
          <Route path="/add_course" element={<AddCourse />} />
          <Route path="/courses_list" element={<CoursesList />} />
          <Route path="/add_result" element={<AddResult />} />
          <Route path="/results_list" element={<ResultsList />} />
        </Routes>
        
      </div>
    </Router>
  );
}

export default App;
