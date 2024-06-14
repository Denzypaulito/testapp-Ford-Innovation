const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const dbURI = 'mongodb+srv://user:1239@testapp.h3vr5d3.mongodb.net/?retryWrites=true&w=majority&appName=testapp';

mongoose.connect(dbURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('MongoDB connected...'))
  .catch(err => console.log(err));

const app = express();
app.use(cors());
app.use(bodyParser.json());

const DataSchema = new mongoose.Schema({
  engineNumber: String,
  rackNumber: String,
  locationNumber: String,
  shipmentDate: Date
});

const Data = mongoose.model('Data', DataSchema);

// Ruta para obtener todos los datos
app.get('/api/data', async (req, res) => {
  const data = await Data.find();
  res.json(data);
});

// Ruta para crear un nuevo registro
app.post('/api/data', async (req, res) => {
  try {
    const newData = new Data(req.body);
    await newData.save();
    res.json(newData);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Ruta para buscar por ubicacion
app.get('/api/data/:ubicacion', async (req, res) => {
  const data = await Data.find({ locationNumber: req.params.ubicacion });
  res.json(data);
});

// Iniciar el servidor
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
