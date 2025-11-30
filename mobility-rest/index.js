const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json()); // pour lire le JSON des requêtes POST/PUT

// Mock data : lignes de transport
let lines = [
  { id: 1, name: "Ligne 1", type: "bus", stations: ["A", "B", "C"] },
  { id: 2, name: "Ligne 2", type: "metro", stations: ["X", "Y", "Z"] }
];

// Endpoint test santé
app.get('/health', (req, res) => {
  res.json({ status: 'UP', service: 'Mobility REST' });
});

// GET /lines → toutes les lignes
app.get('/lines', (req, res) => {
  res.json(lines);
});

// GET /lines/:id → détail d’une ligne
app.get('/lines/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const line = lines.find(l => l.id === id);
  if (line) {
    res.json(line);
  } else {
    res.status(404).json({ error: 'Line not found' });
  }
});

// POST /lines → ajouter une ligne
app.post('/lines', (req, res) => {
  const newLine = { id: lines.length + 1, ...req.body };
  lines.push(newLine);
  res.status(201).json(newLine);
});

// PUT /lines/:id → modifier une ligne
app.put('/lines/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = lines.findIndex(l => l.id === id);
  if (index !== -1) {
    lines[index] = { id, ...req.body };
    res.json(lines[index]);
  } else {
    res.status(404).json({ error: 'Line not found' });
  }
});

// DELETE /lines/:id → supprimer une ligne
app.delete('/lines/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = lines.findIndex(l => l.id === id);
  if (index !== -1) {
    const deleted = lines.splice(index, 1);
    res.json(deleted[0]);
  } else {
    res.status(404).json({ error: 'Line not found' });
  }
});

app.listen(port, () => {
  console.log(`Mobility service listening on port ${port}`);
});
