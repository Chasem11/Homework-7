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
      .update({ Name: crewmate.Name, Color: crewmate.Color, Speed: crewmate.Speed })
      .match({ id });
    if (error) {
      console.log('Error updating crewmate', error);
    } else {
      console.log('Crewmate updated:', data);
      navigate('/gallery');  // Redirect to the gallery after update
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
      navigate('/gallery');  // Redirect to the gallery after deletion
    }
  };

  const handleChange = (e) => {
    const { Name, value } = e.target;
    setCrewmate({ ...crewmate, [Name]: value });
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h1>Crewmate Details</h1>
      <div>
        <label>Name:</label>
        <input type="text" name="Name" value={crewmate.Name} onChange={handleChange} />

        <label>Color:</label>
        <input type="text" name="Color" value={crewmate.Color} onChange={handleChange} />

        <label>Speed:</label>
        <input type="number" name="Speed" value={crewmate.Speed} onChange={handleChange} />

        <button onClick={handleUpdate}>Update Crewmate</button>
        <button onClick={handleDelete}>Delete Crewmate</button>
        <button onClick={() => navigate(-1)}>Go Back</button>
      </div>
    </div>
  );
}

export default CrewmateDetails;

