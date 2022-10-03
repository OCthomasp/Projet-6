const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const helmet = require('helmet');
const dotenv = require('dotenv').config();

const sauceRoutes = require('./routes/sauce')
const userRoutes = require('./routes/user');

mongoose.connect(process.env.MONGO_ADDRESS,{
    useNewUrlParser: true,
    useUnifiedTopology: true 
})
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

const app = express();

// We use helmet to secure our application but we need to allow CORP to upload images
app.use(helmet({
  crossOriginResourcePolicy : false
}));

// CORS : Cross-Origin Ressource Sharing
app.use((req, res, next) => {
  // Everybody can access the app
  res.setHeader('Access-Control-Allow-Origin', '*');
  // allow these headers
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  // Allow these methods 
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

// analyze request body
app.use(express.json());

app.use('/api/sauces', sauceRoutes);
app.use('/api/auth/', userRoutes);
// calls to /images refer to a directory in the backend
app.use('/images', express.static(path.join(__dirname, 'images')));

module.exports = app;