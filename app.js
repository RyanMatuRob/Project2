const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Database connection
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

db.connect(err => {
  if (err) {
    console.error('Database connection error:', err);
  } else {
    console.log('Connected to the MySQL database');
  }
});

// Route to submit a new recipe
app.post('/submit-recipe', (req, res) => {
  const { title, description, ingredients, instructions, image_url, user_id } = req.body;
  const query = `
    INSERT INTO Recipes (title, description, ingredients, instructions, image_url, user_id)
    VALUES (?, ?, ?, ?, ?, ?)
  `;
  db.query(
    query,
    [title, description, JSON.stringify(ingredients), JSON.stringify(instructions), image_url, user_id],
    (err, result) => {
      if (err) {
        console.error('Error inserting recipe:', err);
        res.status(500).send('Error saving recipe');
      } else {
        res.status(200).send('Recipe saved successfully');
      }
    }
  );
});

// Route to get all recipes
app.get('/recipes', (req, res) => {
  const query = 'SELECT * FROM Recipes';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error retrieving recipes:', err);
      res.status(500).send('Error retrieving recipes');
    } else {
      res.json(results);
    }
  });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
