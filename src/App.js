import './App.css';
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import Dashboard from './Pages/Dashboard';
import Exercises from './Pages/Exercises';
import ExerciseDetail from './Pages/ExerciseDetail';
import ProtectedRoute from './Components/ProtectedRoute';
import ExerciseDetection from './Components/ExerciseDetection';

function App() {
  const [error, setError] = useState(null);

  useEffect(() => {
    // Add window error handler
    const handleError = (event) => {
      console.error('Caught error:', event.error);
      setError(`Error: ${event.error?.message || 'Unknown error'}`);
    };

    window.addEventListener('error', handleError);
    return () => window.removeEventListener('error', handleError);
  }, []);

  if (error) {
    return (
      <div style={{ padding: '20px', color: 'red' }}>
        <h1>Something went wrong</h1>
        <pre>{error}</pre>
        <button onClick={() => setError(null)}>Try Again</button>
      </div>
    );
  }

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/exercises" element={<Exercises />} />
          <Route path="/exercise/:id" element={<ExerciseDetail />} />
          <Route path="/exercise-detection" element={<ExerciseDetection />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
