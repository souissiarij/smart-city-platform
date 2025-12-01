import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MobilityLines = () => {
  const [lines, setLines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Charger les lignes au démarrage
  useEffect(() => {
    axios.get('/mobility/lines')


      .then(res => {
        setLines(res.data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Chargement des lignes...</p>;
  if (error) return <p>Erreur : {error}</p>;

  return (
    <div>
      <h2>Lignes de transport</h2>
      <ul>
        {lines.map(line => (
          <li key={line.id}>
            {line.name} ({line.type}) — Stations: {line.stations.join(', ')}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MobilityLines;
