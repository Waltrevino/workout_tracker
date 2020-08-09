const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const workoutSchema = new Schema(
    {
      day: {
        type: Date,
        default: () => new Date()
      },
      exercises: [
        {
          type: {
            type: String,
            trim: true,
            required: "Excercise is required"
          },
          name: {
            type: String,
            trim: true,
            required: "Name is required"
          },
          duration: {
            type: Number,
            default: 0,
            required: "Duration is required"
          },
          weight: {
            type: Number,
            default: 0,
            required: "Weight is required"
          },
          reps: {
            type: Number,
            default: 0,
            required: "Reps is required"
          },
          sets: {
            type: Number,
            default: 0,
            required: "Sets is required"
          },
          distance: {
            type: Number,
            default: 0,
            required: "Distance is required"
          }
        }
      ],   
      totalDuration: {
        type: Number,
        default: 0
      }
    }
  );
  
const Workout = mongoose.model("Workout", workoutSchema);

module.exports = Workout;