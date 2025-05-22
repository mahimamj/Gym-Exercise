import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Exercises.css';

const exercisesList = [
  {
    id: 1,
    name: 'Lunges',
    category: 'Legs',
    image: 'https://images.pexels.com/photos/8171681/pexels-photo-8171681.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    description: 'A powerful unilateral leg exercise that builds strength, improves balance, and enhances functional movement patterns.'
  },
  {
    id: 2,
    name: 'Squats',
    category: 'Legs',
    image: 'https://images.pexels.com/photos/4164761/pexels-photo-4164761.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    description: 'The king of all exercises - a compound movement that builds total lower body strength and improves functional fitness.'
  },
  {
    id: 3,
    name: 'Push-Ups',
    category: 'Upper Body',
    image: 'https://images.pexels.com/photos/176782/pexels-photo-176782.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    description: 'The ultimate bodyweight exercise for building upper body strength, chest definition, and core stability.'
  },
  {
    id: 4,
    name: 'Side Plank',
    category: 'Core',
    image: 'https://images.pexels.com/photos/6740056/pexels-photo-6740056.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    description: 'A challenging isometric hold that builds core strength, improves stability, and targets your obliques for a strong, defined core.'
  },
  {
    id: 5,
    name: 'Side Lateral Raises',
    category: 'Shoulders',
    image: 'https://images.pexels.com/photos/4162487/pexels-photo-4162487.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    description: 'An essential shoulder exercise that builds width, strength, and definition in your deltoids for well-rounded shoulder development.'
  },
  {
    id: 6,
    name: 'Sit-Ups',
    category: 'Core',
    image: 'https://images.pexels.com/photos/4803667/pexels-photo-4803667.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    description: 'A fundamental core exercise that targets your entire abdominal region, helping build strength and definition in your midsection.'
  }
];

const Exercises = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('all');

  const handleExerciseClick = (exerciseId) => {
    navigate(`/exercise/${exerciseId}`);
  };

  const filteredExercises = selectedCategory === 'all' 
    ? exercisesList 
    : exercisesList.filter(exercise => exercise.category === selectedCategory);

  // Get unique categories
  const categories = ['all', ...new Set(exercisesList.map(exercise => exercise.category))];

  return (
    <div className="exercises-container">
      <h1>Gym Exercises</h1>
      <p className="exercises-intro">
        Choose an exercise from our collection to get started on your fitness journey
      </p>
      
      <div className="filter-container">
        <select 
          className="filter-dropdown"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          {categories.map(category => (
            <option key={category} value={category}>
              {category === 'all' ? 'All Categories' : category}
            </option>
          ))}
        </select>
      </div>

      <div className="exercises-grid">
        {filteredExercises.map((exercise) => (
          <div 
            key={exercise.id} 
            className="exercise-card" 
            onClick={() => handleExerciseClick(exercise.id)}
          >
            <div className="exercise-image-container">
              <img 
                src={exercise.image} 
                alt={exercise.name} 
                className="exercise-image" 
              />
            </div>
            <div className="exercise-info">
              <h3 className="exercise-name">{exercise.name}</h3>
              <span className="exercise-category">{exercise.category}</span>
              <p className="exercise-description">{exercise.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Exercises; 