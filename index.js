const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'workoutapp',
  insecureAuth: true
});


app.use(express.static(path.join(__dirname, 'dist/FinalProject3309')));

app.get('/showByAge', (req, res) => {
    connection.query("SELECT COUNT(id) as numberOfPeople, age FROM profile GROUP BY age ORDER BY age ASC", function (err, result, fields) {
      if (err) throw err;
      res.send(result);
    });
});

app.post('/increaseSalary', (req, res) => {
  connection.query("UPDATE trainers SET salary = ROUND((salary * 1.10), 2) WHERE salary  < (SELECT average FROM trainerSalaries", function (err, result, fields) {
    if (err) throw err;
    res.send(result);
  });
});

app.get('/userWorkouts', (req, res) => {
  connection.query("SELECT profile.id, profile.name, profile.age, favourites.workoutID, workouts.workoutName FROM Favourites INNER JOIN profile ON Favourites.userID = profile.id INNER JOIN Workouts ON Favourites.workoutID = Workouts.workoutID", function (err, result, fields) {
    if (err) throw err;
    res.send(result);
  });
});

app.get('/recommendedExercise', (req, res) =>{
  connection.query("SELECT eName as exerciseName, tMuscleWorked as muscleTargeted FROM (SELECT exercises.exerciseName as eExercises, exercises.muscleWorked, favourites.userID, favourites.exerciseName INTO #temp FROM exercises INNER JOIN favourites ON exercises.exerciseName = favourites.exerciseName) WHERE (SELECT eExercises", function (err, result, fields) {
    if (err) throw err;
    res.send(result);
  });
});

app.get('/showGoals:var', (req, res) =>{
  let userID = req.params.var;
  connection.query("SELECT profile.name, users.goals FROM profile INNER JOIN users ON profile.id = users.id WHERE users.id = " + userID, function (err, result, fields) {
    if (err) throw err;
    res.send(result);
  });
});

app.get('/login/:username/:password', (req, res) => {
  let username = req.params.username;
  let password = req.params.password;

  connection.query("SELECT username, password, id FROM profile WHERE username = '" + username + "' AND password = '" + password + "'", function (err, result, fields) {
    if (err) throw err;
    if(result.length  === 0){
      res.status(404).send()
    }
    else{
      res.send(result);
    }
  });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

//
//   connection.query("", function (err, result, fields) {
//     if (err) throw err;
//     res.send(result);
//   });
