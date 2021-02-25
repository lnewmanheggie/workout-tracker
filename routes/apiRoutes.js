const db = require("../models");

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
    .then(data => {
        res.json(data);
    })
    .catch(err => {
        res.json(err);
    })
  });

//   add exercise
  app.put("/api/workouts/:id", (req, res) => {
      const id = req.params.id;
    db.Workout.findByIdAndUpdate(id, { $push: { exercises: req.body } }, { new: true })
        .then(data => {
            res.json(data);
        })
        .catch(err => {
            res.json(err);
        })
  });

   // get workouts in range
  app.get("/api/workouts/range", function(req, res) {
    db.Workout.find().sort({ _id: -1 }).limit(7)
    .then(data => {
        console.log(data);
        res.json(data);
    })
    .catch(err => {
        res.json(err);
    })
  });


};