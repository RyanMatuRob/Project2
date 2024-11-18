const express = require('express');
const db = require('./db');
const app = express();
app.use(express.json());

app.get('/recipes', (req, res) => {
    db.query('SELECT * FROM Recipes', (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

app.listen(3000, () => console.log('Server is running on port 3000'));

app.post('/recipes', (req, res) => {
    const { title, description, ingredients, instructions, user_id } = req.body;
    const sql = `INSERT INTO Recipes (title, description, ingredients, instructions, user_id)
                 VALUES (?, ?, ?, ?, ?)`;
    const values = [title, description, JSON.stringify(ingredients), JSON.stringify(instructions), user_id];
    
    db.query(sql, values, (err, result) => {
        if (err) throw err;
        res.json({ message: 'Recipe added successfully!', recipeId: result.insertId });
    });
});
