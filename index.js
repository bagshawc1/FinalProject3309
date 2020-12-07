const express = require('express');
const app = express();
const port = 3000;
const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'workoutapp',
  insecureAuth: true
});

connection.connect((err) => {
  if (err) throw err;
  console.log('Connected!')
});

//app.use(express.static(path.join(__dirname, 'directory here')));

app.get('/', (req, res) => {
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

