// src/components/CrewmateGallery.jsx

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../Client';

function CrewmateGallery() {
  const [crewmates, setCrewmates] = useState([]);

  useEffect(() => {
    fetchCrewmates();
  }, []);

  const fetchCrewmates = async () => {
    const { data, error } = await supabase
      .from('crewmates')
      .select('*');
    if (error) {
      console.log('Error fetching crewmates:', error);
    } else {
      setCrewmates(data);
    }
  };

  const getGlowStyle = (color) => ({
    boxShadow: `0 0 10px 3px ${color}`,
  });

  return (
    <div className="gallery">
      {crewmates.map((crewmate) => (
        <div className="card" key={crewmate.id} style={getGlowStyle(crewmate.Color)}>
          <img src="https://fraternitysororitysvg.com/assets/images/products/Among-Us-Svg.png" alt="Crewmate"/>
          <h3>Name: {crewmate.Name}</h3>
          <p>Speed: {crewmate.Speed} mph</p>
          <p>Color: {crewmate.Color}</p>
          <Link to={`/crewmate/${crewmate.id}`} className="edit-button">
            View Details
          </Link>
        </div>
      ))}
    </div>
  );
}

export default CrewmateGallery;

