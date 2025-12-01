import React, { useState } from 'react';
import './App.css';
import MobilityLines from './components/MobilityLines';
import AirQuality from './components/AirQuality';

function App() {
  const [zone, setZone] = useState('A'); // zone par défaut

  return (
    <div className="App">
      <header className="App-header">
        <h1>Smart City Dashboard</h1>
      </header>
      <main>
        <section>
          <h2>Transport</h2>
          <MobilityLines />
        </section>

        <section>
          <h2>Air Quality</h2>
          <label>
            Zone:
            <input value={zone} onChange={(e) => setZone(e.target.value)} />
          </label>
          <AirQuality zone={zone} />
        </section>
      </main>
    </div>
  );
}

export default App;
