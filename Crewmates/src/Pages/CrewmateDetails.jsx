import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../Client';

function CrewmateDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [crewmate, setCrewmate] = useState({ Name: '', Color: '', Speed: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCrewmate();
  }, [id]);

  const fetchCrewmate = async () => {
    const { data, error } = await supabase
      .from('crewmates')
      .select('*')
      .eq('id', id)
      .single();
    if (error) {
      console.log('Error fetching crewmate', error);
      setLoading(false);
    } else {
      setCrewmate(data);
      setLoading(false);
    }
  };

  const handleUpdate = async () => {
    const { data, error } = await supabase
      .from('crewmates')
      .update({ Name: crewmate.Name, Color: crewmate.Color, Speed: parseFloat(crewmate.Speed) })
      .match({ id });
    if (error) {
      console.log('Error updating crewmate', error);
    } else {
      console.log('Crewmate updated:', data);
      navigate('/gallery');
    }
  };

  const handleDelete = async () => {
    const { error } = await supabase
      .from('crewmates')
      .delete()
      .match({ id });
    if (error) {
      console.log('Error deleting crewmate', error);
    } else {
      navigate('/gallery');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCrewmate({ ...crewmate, [name]: value });
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="crewmate-details">
      <h1>Crewmate Details</h1>
      <p>This is {crewmate.Name}! His color is {crewmate.Color}. He also has a speed of {crewmate.Speed}. Make any changes you like and don't forget to save!</p>
      <div className="form">
        <label>Name:</label>
        <input type="text" name="Name" value={crewmate.Name} onChange={handleChange} />

        <label>Color:</label>
        <select name="Color" value={crewmate.Color} onChange={handleChange}>
          <option value="">Select Color</option>
          <option value="Red">Red</option>
          <option value="Blue">Blue</option>
          <option value="Green">Green</option>
          <option value="Yellow">Yellow</option>
          <option value="Purple">Purple</option>
          <option value="Orange">Orange</option>
        </select>

        <label>Speed:</label>
        <input type="number" name="Speed" value={crewmate.Speed} onChange={handleChange} />
      </div>
      <div className="buttons">
        <button className="update-button" onClick={handleUpdate}>Update Crewmate</button>
        <button className="delete-button" onClick={handleDelete}>Delete Crewmate</button>
        <button className="back-button" onClick={() => navigate(-1)}>Go Back</button>
      </div>
    </div>
  );
}

export default CrewmateDetails;


