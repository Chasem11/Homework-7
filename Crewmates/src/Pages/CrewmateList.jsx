import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../Client';

function CrewmateList() {
  const [crewmates, setCrewmates] = useState([]);

  useEffect(() => {
    fetchCrewmates();
  }, []);

  const fetchCrewmates = async () => {
    const { data, error } = await supabase
      .from('crewmates')
      .select('*');  // Selects all columns; you could also list columns explicitly
    if (error) console.log('Error fetching data', error);
    else setCrewmates(data);
  };

  const deleteCrewmate = async (id) => {
    const { data, error } = await supabase
      .from('crewmates')
      .delete()
      .match({ id });
    if (error) console.log('Error deleting crewmate', error);
    else fetchCrewmates();  // Refresh list after delete
  };

  return (
    <div>
      <h1>Crewmate List</h1>
      <Link to="/add">Add New Crewmate</Link>
      <ul>
        {crewmates.map(crewmate => (
          <li key={crewmate.id}>
            Name: {crewmate.Name}, Color: {crewmate.Color}, Speed: {crewmate.Speed}
            <button onClick={() => deleteCrewmate(crewmate.id)}>Delete</button>
            <Link to={`/crewmate/${crewmate.id}`}>Details</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CrewmateList;
