import React, { useEffect, useState } from 'react';
import { getAQI } from '../services/air';

function AirQuality({ zone }) {
  const [aqi, setAqi] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAQI() {
      setLoading(true);
      try {
        const data = await getAQI(zone);
        setAqi(data.AQI);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchAQI();
  }, [zone]);

  return (
    <div>
      <h3>Air Quality for {zone}</h3>
      {loading ? "Loading..." : `AQI: ${aqi}`}
    </div>
  );
}

export default AirQuality;
