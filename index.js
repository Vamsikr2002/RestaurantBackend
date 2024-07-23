const express = require("express");
const mongoose = require('mongoose');
const vendorRoutes = require('./routes/vendorRoutes');
const bodyParser = require('body-parser');
const firmRoutes = require('./routes/firmRoutes');
const productRoutes = require('./routes/productRoutes');
const cors = require('cors');
const path = require('path');

const app = express();

const PORT = 4000; // Hardcoded port
const mongoUri = 'mongodb://localhost:27017/restaurantcrea'; // Hardcoded MongoDB URI

console.log('Mongo URI:', mongoUri);

mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB connected successfully!"))
    .catch((error) => console.error('MongoDB connection error:', error));

app.use(cors());
app.use(bodyParser.json());
app.use('/vendor', vendorRoutes);
app.use('/firm', firmRoutes);
app.use('/product', productRoutes);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.listen(PORT, () => {
    console.log(`Server started and running at ${PORT}`);
});

app.get('/', (req, res) => {
    res.send("<h1>Welcome to SUBY</h1>");
});

// Error-handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});
