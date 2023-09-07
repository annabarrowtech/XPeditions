// Flutter app is XPeditions. It is a gamified skill mastery app that helps users break down their learning goals into fun, achievable steps. By entering a skill they wish to learn, users are provided with a series of game-like achievements to guide their journey and track their progress.
// Set up a basic Express server in this file. Include CORS middleware to handle cross-origin requests from your Flutter app.
// Import the Express library

const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json()); // allows parsing JSON data from requests

// PostgreSQL Database Connection Setup
const pool = new Pool({
    user: 'YOUR_PG_USERNAME',
    host: 'YOUR_PG_HOST',
    database: 'YOUR_PG_DATABASE_NAME',
    password: 'YOUR_PG_PASSWORD',
    port: 'YOUR_PG_PORT'
});

// Test route
app.get('/', (req, res) => {
    res.send('Hello from XPeditions API!');
});

// Sample route to get all achievements (You'd add more specific routes and CRUD operations as needed)
app.get('/achievements', async (req, res) => {
    try {
        const achievements = await pool.query('SELECT * FROM achievements');
        res.json(achievements.rows);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
});

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});