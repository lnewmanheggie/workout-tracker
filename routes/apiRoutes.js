const db = require("../models");
const mongoose = require("mongoose");

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", { useNewUrlParser: true });

module.exports = function(app) {
    
  // create workout
  app.post("/api/workouts", function(req, res) {
    db.Workout.create({ day: new Date().setDate(new Date().getDate()) })
    .then(data => {
        res.json(data);
    })
    .catch(({ message }) => {
        console.log(message);
    });
  });

  //get workouts
  app.get("/api/workouts", function(req, res) {
    db.Workout.find().sort({ _id: -1 }).limit(1)
    .populate("exercises")
    .then(data => {
        console.log(data);
        res.json(data);
    })
    .catch(err => {
        res.json(err);
    })
  });

//   add exercise
  app.put("/api/workouts/:id", (req, res) => {
      const query = { _id: req.params.id };
    db.Exercise.create(req.body)
        .then(({ _id }) => db.Workout.findOneAndUpdate(query, { $push: { exercises: _id } }, { new: true }))
        .then(data => {
            res.json(data);
        })
        .catch(err => {
            res.json(err);
        })
  });

//   // get workouts in range
//   app.get("/api/workouts/range", function(req, res) {
    
//   });


};