import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import api from '../api/api';
import './TableStyles.css';

const ResultsList = () => {
  const [results, setResults] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resultsData = await api.getResults();
        setResults(resultsData.results);
      } catch (error) {
        toast.error('Error fetching results data');
      }
    };

    fetchData();
  }, []);

  return (
    <div className='comp-container'>
      <h2>Results List</h2>
      <table className="styled-table">        
        <thead>
          <tr>
            <th>Course</th>
            <th>Student</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          {results.map((result) => (
            <tr key={result.id}>
              <td>{result.course}</td>
              <td>{result.student}</td>
              <td>{result.score}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ResultsList;

