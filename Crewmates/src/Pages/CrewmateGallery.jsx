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

  return (
    <div className="gallery">
      {crewmates.map((crewmate) => (
        <div className="card" key={crewmate.id}>
          <h3>Name of Crewmate: {crewmate.Name}</h3>
          <p>Speed of Crewmate: {crewmate.Speed} mph</p>
          <p>Color of Crewmate: {crewmate.Color}</p>
          <Link to={`/crewmate/${crewmate.id}`} className="edit-button">
            Edit Crewmate
          </Link>
        </div>
      ))}
    </div>
  );
}

export default CrewmateGallery;

