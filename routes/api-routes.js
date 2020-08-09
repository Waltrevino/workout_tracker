const db = require("../models");

module.exports = function (app) {

    // Retrieve all workout records and add totalDuration field to to workout collection
    app.get("/api/workouts", function (req, res) {

        db.Workout.find({}).then(dbWorkout => {

            dbWorkout.forEach(workout => {
                var total = 0;
                workout.exercises.forEach(exercise => {
                    total += exercise.duration;
                });
                workout.totalDuration = total;
            });

            res.json(dbWorkout);
        }).catch(err => {
            res.json(err);
        });
    });

    // Add new workout to workout collection
    app.post("/api/workouts", function (req, res) {

        db.Workout.create(req.body).then((dbWorkout => {
            res.json(dbWorkout);
        })).catch(err => {
            res.json(err);
        });
    });

    // Retrieve last record in workout collection based on the last workout id
    app.put("/api/workouts/:id", function (req, res) {

        db.Workout.findOneAndUpdate(
            { _id: req.params.id },
            {
                $push: { exercises: req.body },
                $inc: { totalDuration: req.body.duration }
            },
            { new: true }).then(dbWorkout => {
                res.json(dbWorkout);
            }).catch(err => {
                res.json(err);
            });

    });

    // Retrieve all records from workout collection to be used to populate stats charts
    app.get("/api/workouts/range", function (req, res) {

        db.Workout.find({}).then(dbWorkout => {

            res.json(dbWorkout);
        }).catch(err => {
            res.json(err);
        });

    });
}