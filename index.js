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

//group users by age
app.get('/showByAge', (req, res) => {
  let userID = req.params.userID;
    connection.query("SELECT COUNT(id) as numberOfPeople, age FROM profile GROUP BY age ORDER BY age ASC", function (err, result, fields) {
      if (err) throw err;
      res.send(result);
    });
});
//get all exercises
app.get('/allExercises', (req, res) => {
  connection.query("SELECT exerciseName FROM exercises", function (err, result, fields) {
    if (err) throw err;
    res.send(result);
  });
});
// increase trainer salaries
app.post('/increaseSalary', (req, res) => {
  connection.query("UPDATE trainers SET salary = ROUND((salary * 1.10), 2) WHERE salary  < (SELECT average FROM trainerSalaries)", function (err, result, fields) {
    if (err) throw err;
    res.send(result);
  });
});

// display all users and their workouts
app.get('/userWorkouts', (req, res) => {
  connection.query("SELECT profile.id, profile.name, profile.age, favourites.workoutID, workouts.workoutName FROM Favourites INNER JOIN profile ON Favourites.userID = profile.id INNER JOIN Workouts ON Favourites.workoutID = Workouts.workoutID", function (err, result, fields) {
    if (err) throw err;
    res.send(result);
  });
});

//get this user a recommendation
app.get('/recommendedExercise/:userID', (req, res) =>{
  let userID = req.params.userID;
  connection.query("SELECT exerciseName, muscleWorked FROM exercises WHERE muscleWorked = (SELECT muscleWorked FROM exercises WHERE exerciseName = (SELECT exerciseName FROM favourites WHERE userID =" + userID + ")) LIMIT 5", function (err, result, fields) {
    if (err) throw err;
    console.log(result);
    res.send(result);
  });
});

//display all of this users goals
app.get('/myGoals/:userID', (req, res) =>{
  let userID = req.params.userID;
  connection.query("SELECT profile.name, users.goals FROM profile INNER JOIN users ON profile.id = users.id WHERE users.id = " + userID, function (err, result, fields) {
    if (err) throw err;
    res.send(result);
  });
});

//login
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

app.post('/createUser/:name/:age/:username/:password', (req, res) => {
  let username = req.params.username;
  let password = req.params.password;
  let age = req.params.age;
  let name = req.params.name;

  connection.query("SELECT username FROM profile WHERE username = '" + username + "'", function (err, result, fields) {
    if (err) throw err;
    if(result.length  === 0){
      connection.query("SELECT MAX(id) FROM profile", function (err, secondResult, fields) {
        if (err) throw err;
        let p = secondResult[0];
        let idVal = 0;
        for (let key in p){
          if (p.hasOwnProperty(key))
          idVal = p[key];
        }
        idVal = idVal + 1;
        connection.query("INSERT INTO Profile VALUES (" + idVal + ", '" + name + "', " +  age + ", '" + username + "', '" +  password + "')", function (err, secondResult, fields) {
          if (err) throw err;
        });
        connection.query("INSERT INTO Users VALUES (" + idVal + ",'none')", function (err, secondResult, fields) {
          if (err) throw err;
        });
      });
      res.send({msg: "New Account Created"});
    }
    else{
      res.status(401).send();
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
