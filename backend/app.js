const express = require('express');
const http = require('http');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Import Routes
const authRoute = require('./routes/auth');
const profileRoute = require('./routes/profile');

// Use Routes
app.use('/', authRoute);
app.use('/profile', profileRoute)

// MongoDB Connection
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB connected");
})

// Server Connection
const port = process.env.PORT || 8000
http.createServer(app).listen(port, () => {
    console.log('Server listening on port ' + port);
});
