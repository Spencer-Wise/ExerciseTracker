import './App.css';
import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import HomePage from './pages/HomePage';
import EditExercise from './pages/EditExercise';
import CreateExercise from './pages/CreateExercise';
import {useState} from 'react';

function App() {
  const [exerciseToEdit, setExerciseToEdit] = useState();

  return (
    <div className="App">
      <Router>
        <header>
          <Route path='/' exact> <HomePage setExerciseToEdit={setExerciseToEdit} /></Route>
          <Route path='/edit-exercise'> <EditExercise exerciseToEdit={exerciseToEdit} /></Route>
          <Route path='/create-exercise'> <CreateExercise /></Route>
        </header>
      </Router>
    </div>
  );
}

export default App;