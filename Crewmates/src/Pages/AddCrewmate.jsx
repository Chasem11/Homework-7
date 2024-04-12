import React, { useState } from 'react';
import { supabase } from '../Client';
import { useNavigate } from 'react-router-dom';

function AddCrewmate() {
  const [Name, setName] = useState('');
  const [Color, setColor] = useState('');
  const [Speed, setSpeed] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data, error } = await supabase
      .from('crewmates')
      .insert([{ Name, Color, Speed: parseFloat(Speed) }]);
    if (error) console.log('Error:', error);
    else {
      console.log('Crewmate added:', data);
      navigate('/');  // Redirect to the home page after adding
    }
  };

  return (
    <div>
      <h1>Add New Crewmate</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={Name}
            onChange={e => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Color:</label>
          <input
            type="text"
            value={Color}
            onChange={e => setColor(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Speed:</label>
          <input
            type="number"
            value={Speed}
            onChange={e => setSpeed(e.target.value)}
            required
          />
        </div>
        <button type="submit">Add Crewmate</button>
      </form>
    </div>
  );
}

export default AddCrewmate;
