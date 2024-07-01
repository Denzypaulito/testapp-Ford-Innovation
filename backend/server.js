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
  engines: [{type:String}],
  rackNumber: String,
  shipmentDate: Date,
  row : Number,
  pile : Number,
  positionPile : String,
  inTransit: Boolean,
  siteName: String,
});

const Data = mongoose.model('Data', DataSchema);

// Ruta para obtener todos los datos
app.get('/api/data', async (req, res) => {
  if(req.query.row === undefined){
    const data = await Data.find();
    res.json(data);
  }else {
    const data = await Data.find({row: req.query.row});
    res.json(data);
  }
});

// Ruta para crear un nuevo registro
app.post('/api/reports', async (req, res) => {
  try {
    const newData = new Data(req.body);
    await newData.save();
    res.json(newData);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Ruta para buscar por ubicacion
app.get('/api/reports', async (req, res) => {
  const data = await Data.find({ row: req.query.ubicacionId, inTransit: false });
  res.json(data);
});

app.get('/api/findRack', async (req, res) => {
  const data = await Data.find({ rackNumber: req.query.rackNumber });
  res.json(data);
});

app.post('/api/changeRackStatus', async (req, res) => {
  const value = req.body.inTransit;
  const rackNumber = req.body.rackNumber;
  const siteName = req.body.siteName;
  const data = await Data.updateOne({rackNumber: rackNumber}, {inTransit: value, siteName: siteName});
  res.json({modified: data.modifiedCount});

});

// Iniciar el servidor
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
