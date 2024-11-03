const express = require('express');
const mysql = require('mysql');
const multer = require('multer');
const path = require('path');

const app = express();

// Middleware setup
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configure storage for uploaded images
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Ensure this folder exists in your project
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
    }
});
const upload = multer({ storage: storage });

// MySQL database connection setup (configure based on your database credentials)
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Rymaro@17',
    database: 'recipehubdb'
});

db.connect((err) => {
    if (err) throw err;
    console.log('Connected to MySQL database.');
});

app.post('/add-recipe', upload.single('image'), (req, res) => {
    const { name, owner, instructions, ingredients } = req.body;
    const imagePath = req.file ? req.file.path : null;

    // Convert the ingredients string into an array
    const ingredientList = ingredients.split(',').map(item => item.trim());

    // Insert the recipe into the `recipes` table
    const recipeQuery = `
        INSERT INTO recipes (recipe_name, recipe_owner, instructions, recipe_image)
        VALUES (?, ?, ?, ?)
    `;

    db.query(recipeQuery, [name, owner, instructions, imagePath], (err, result) => {
        if (err) {
            console.error('Error inserting recipe:', err);
            return res.status(500).send('Error inserting recipe');
        }

        const recipeId = result.insertId; // Get the new recipe's ID

        // Insert ingredients into `ingredients` table and link to recipe
        const ingredientQueries = ingredientList.map(ingredient => {
            return new Promise((resolve, reject) => {
                const ingredientQuery = `
                    INSERT INTO ingredients (ingredient_name, recipe_id)
                    VALUES (?, ?)
                `;
                db.query(ingredientQuery, [ingredient, recipeId], (err, result) => {
                    if (err) return reject(err);
                    resolve(result);
                });
            });
        });

        Promise.all(ingredientQueries)
            .then(() => res.send('Recipe added successfully!'))
            .catch(err => {
                console.error('Error inserting ingredients:', err);
                res.status(500).send('Error inserting ingredients');
            });
    });
});
