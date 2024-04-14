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
    if (error) {
      console.log('Error:', error);
    } else {
      console.log('Crewmate added:', data);
      navigate('/'); 
    }
  };

  return (
    <div className="form-container">
      <h1>Add New Crewmate</h1>
      <form onSubmit={handleSubmit} className="crewmate-form">
        <div className="input-group">
          <label>Name:</label>
          <input
            type="text"
            value={Name}
            onChange={e => setName(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label>Color:</label>
          <select value={Color} onChange={e => setColor(e.target.value)} required>
            <option value="">Select Color</option>
            <option value="Red">Red</option>
            <option value="Blue">Blue</option>
            <option value="Green">Green</option>
            <option value="Yellow">Yellow</option>
            <option value="Purple">Purple</option>
            <option value="Orange">Orange</option>
          </select>
        </div>
        <div className="input-group">
          <label>Speed:</label>
          <input
            type="number"
            value={Speed}
            onChange={e => setSpeed(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="submit-button">Add Crewmate</button>
      </form>
    </div>
  );
}

export default AddCrewmate;
