const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'student_db',
  port: 8889
});

db.connect(err => {
  if (err) {
    console.error('MySQL connection error:', err);
    return;
  }
  console.log('MySQL Connected...');
});

// Create a new student
app.post('/etudiant', (req, res) => {
  const { first_name, last_name, email, phone } = req.body;
  const sql = 'INSERT INTO etudiant (first_name, last_name, email, phone) VALUES (?, ?, ?, ?)';
  db.query(sql, [first_name, last_name, email, phone], (err, result) => {
    if (err) {
      console.error('Error inserting student:', err);
      res.status(500).send('Error inserting student');
      return;
    }
    res.send('Student added...');
  });
});

// Read all students
app.get('/etudiant', (req, res) => {
  const sql = 'SELECT * FROM etudiant';
  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error fetching students:', err);
      res.status(500).send('Error fetching students');
      return;
    }
    res.json(results);
  });
});

// Read a single student by id
app.get('/etudiant/:id', (req, res) => {
  const sql = 'SELECT * FROM etudiant WHERE id = ?';
  db.query(sql, [req.params.id], (err, result) => {
    if (err) {
      console.error('Error fetching student:', err);
      res.status(500).send('Error fetching student');
      return;
    }
    res.json(result);
  });
});

// Update a student by id
app.put('/etudiant/:id', (req, res) => {
  const { first_name, last_name, email, phone } = req.body;
  const sql = 'UPDATE etudiant SET first_name = ?, last_name = ?, email = ?, phone = ? WHERE id = ?';
  db.query(sql, [first_name, last_name, email, phone, req.params.id], (err, result) => {
    if (err) {
      console.error('Error updating student:', err);
      res.status(500).send('Error updating student');
      return;
    }
    res.send('Student updated...');
  });
});

// Delete a student by id
app.delete('/etudiant/:id', (req, res) => {
  const sql = 'DELETE FROM etudiant WHERE id = ?';
  db.query(sql, [req.params.id], (err, result) => {
    if (err) {
      console.error('Error deleting student:', err);
      res.status(500).send('Error deleting student');
      return;
    }
    res.send('Student deleted...');
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
