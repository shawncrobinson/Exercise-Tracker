// Shawn Robinson ( robinss3@oregonstate.edu )
// CS 290 Section 400, W2022
// 2022/03/12

// Get the mongoose object
import mongoose from "mongoose";

// Prepare to the database exercises in the MongoDB server running locally on port 27017
mongoose.connect("mongodb://localhost:27017/exercises", {
  useNewUrlParser: true,
});

// Connect to to the database
const db = mongoose.connection;

// The open event is called when the database connection successfully opens
db.once("open", () => {
  console.log("Successfully connected to MongoDB using Mongoose!");
});

/**
 * Define the schema
 */
const exerciseSchema = mongoose.Schema({
  name: { type: String, required: true },
  reps: { type: Number, required: true },
  weight: { type: Number, required: true },
  unit: { type: String, required: true },
  date: { type: String, required: true },
});

/**
 * Compile the model from the schema. This must be done after defining the schema.
 */
const Exercise = mongoose.model("Exercise", exerciseSchema);

/**
 * Create an exercise
 * @param {String} name
 * @param {Number} reps
 * @param {Number} weight
 * @param {String} unit
 * @param {String} date
 * @returns A promise. Resolves to the JSON object for the document created by calling save
 */
const createExercise = async (name, reps, weight, unit, date) => {
  // Call the constructor to create an instance of the model class Exercise
  const exercise = new Exercise({
    name: name,
    reps: reps,
    weight: weight,
    unit: unit,
    date: date,
  });
  // Call save to persist this object as a document in MongoDB
  return exercise.save();
};

/**
 * Retrive exercises based on a filter
 * @param {Object} filter
 * @returns
 */
const retrieveExercises = async (filter = {}) => {
  const query = Exercise.find(filter);
  return query.exec();
};

/**
 * Replace the properties of the exercise with the id value provided
 * @param {String} _id
 * @param {String} name
 * @param {Number} reps
 * @param {Number} weight
 * @param {String} unit
 * @param {String} date
 * @returns A promise. Resolves to the number of documents modified
 */
const updateExercise = async (_id, name, reps, weight, unit, date) => {
  const result = await Exercise.findOneAndReplace(
    { _id: _id },
    { name: name, reps: reps, weight: weight, unit: unit, date: date },
    { new: true }
  );
  return result;
};

/**
 * Delete the exercise with provided id value
 * @param {String} _id
 * @returns A promise. Resolves to the count of deleted documents
 */
const deleteExercise = async (_id) => {
  const result = await Exercise.deleteOne({ _id: _id });
  // Return the count of deleted document. Since we called deleteOne, this will be either 0 or 1.
  return result.deletedCount;
};

export { createExercise, retrieveExercises, updateExercise, deleteExercise };
