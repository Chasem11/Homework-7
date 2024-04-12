import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import CrewmateList from './Pages/CrewmateList';
import AddCrewmate from './Pages/AddCrewmate';
import CrewmateDetails from './Pages/CrewmateDetails';
import CrewmateGallery from './Pages/CrewmateGallery';
import Home from './Home';
import './App.css';

function App() {
  return (
    <Router>
      <div className="navbar">
          <Link to="/">Home</Link>
          <Link to="/add">Create a Crewmate!</Link>
          <Link to="/gallery">Crewmate Gallery</Link>
      </div>
        <div className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/add" element={<AddCrewmate />} />
            <Route path="/gallery" element={<CrewmateGallery />} />
            <Route path="/crewmate/:id" element={<CrewmateDetails />} />
          </Routes>
        </div>
    </Router>
  );
}

export default App;
