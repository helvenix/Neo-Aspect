const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const questionRoutes = require('./routes/questions');

const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());

const MONGO_URI = process.env.MONGO_URI;
mongoose.connect(MONGO_URI)
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.error('MongoDB connection error: ', err));

app.use('/api/questions', questionRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});