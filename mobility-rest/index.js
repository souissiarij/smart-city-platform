const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// -------------------- MOCK DATA --------------------
let lines = [
  { id: 1, name: "Ligne 1", type: "bus", stations: ["A", "B", "C"] },
  { id: 2, name: "Ligne 2", type: "metro", stations: ["X", "Y", "Z"] }
];

let vehicles = [
  { id: 1, lineId: 1, lat: 36.801, lon: 10.18, timestamp: Date.now() },
  { id: 2, lineId: 2, lat: 36.802, lon: 10.19, timestamp: Date.now() }
];

let traffic = [
  { id: 1, lineId: 1, level: "high", message: "Embouteillage au centre-ville" }
];

// -------------------- HEALTH --------------------
app.get('/health', (req, res) => {
  res.json({ status: 'UP', service: 'Mobility REST' });
});

// -------------------- LINES CRUD --------------------
app.get('/lines', (req, res) => {
  const { type } = req.query;

  if (type) {
    return res.json(lines.filter(l => l.type === type));
  }

  res.json(lines);
});

// search
app.get('/lines/search', (req, res) => {
  const query = req.query.q?.toLowerCase();
  if (!query) return res.json([]);

  res.json(lines.filter(l => l.name.toLowerCase().includes(query)));
});

// detail
app.get('/lines/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const line = lines.find(l => l.id === id);
  line ? res.json(line) : res.status(404).json({ error: 'Line not found' });
});

// create
app.post('/lines', (req, res) => {
  const { name, type, stations } = req.body;

  if (!name || !type || !Array.isArray(stations))
    return res.status(400).json({ error: "Invalid payload" });

  const newLine = { id: lines.length + 1, ...req.body };
  lines.push(newLine);
  res.status(201).json(newLine);
});

// update
app.put('/lines/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = lines.findIndex(l => l.id === id);

  if (index === -1) return res.status(404).json({ error: 'Line not found' });

  lines[index] = { id, ...req.body };
  res.json(lines[index]);
});

// delete
app.delete('/lines/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = lines.findIndex(l => l.id === id);

  if (index === -1) return res.status(404).json({ error: 'Line not found' });

  const deleted = lines.splice(index, 1);
  res.json(deleted[0]);
});

// -------------------- STATIONS --------------------
app.get('/lines/:id/stations', (req, res) => {
  const line = lines.find(l => l.id == req.params.id);
  if (!line) return res.status(404).json({ error: "Line not found" });
  res.json(line.stations);
});

app.post('/lines/:id/stations', (req, res) => {
  const { station } = req.body;
  const line = lines.find(l => l.id == req.params.id);

  if (!line) return res.status(404).json({ error: "Line not found" });

  line.stations.push(station);
  res.json(line);
});

app.delete('/lines/:id/stations/:stationName', (req, res) => {
  const line = lines.find(l => l.id == req.params.id);
  if (!line) return res.status(404).json({ error: "Line not found" });

  line.stations = line.stations.filter(s => s !== req.params.stationName);
  res.json(line);
});

// -------------------- REALTIME VEHICLES --------------------
app.get('/realtime/vehicles', (req, res) => {
  res.json(vehicles);
});

app.get('/realtime/vehicles/:lineId', (req, res) => {
  const list = vehicles.filter(v => v.lineId == req.params.lineId);
  res.json(list);
});

// -------------------- TRAFFIC --------------------
app.get('/traffic', (req, res) => {
  res.json(traffic);
});

app.post('/traffic', (req, res) => {
  const newEntry = { id: traffic.length + 1, ...req.body };
  traffic.push(newEntry);
  res.status(201).json(newEntry);
});

app.delete('/traffic/:id', (req, res) => {
  const id = parseInt(req.params.id);
  traffic = traffic.filter(t => t.id !== id);
  res.json({ deleted: id });
});

// -------------------- START SERVER --------------------
app.listen(port, () => {
  console.log(`Mobility service listening on port ${port}`);
});
