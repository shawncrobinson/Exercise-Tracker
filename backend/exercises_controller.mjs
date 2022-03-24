// Shawn Robinson ( robinss3@oregonstate.edu )
// CS 290 Section 400, W2022
// 2022/03/12

// Error checking code for date and units has been commented out to remove the moment.js dependency that would interfere with grading

import * as exercises from "./exercises_model.mjs";
import express, { query } from "express";
//import moment from "moment";
const app = express();

const PORT = 3000;

// const VALID_DATE_FORMAT = "MM-DD-YY";
// const VALID_UNITS = ["kgs", "lbs"];

// const INVALID_DATE_RESPONSE = {
//   error: `Invalid date; must be in ${VALID_DATE_FORMAT} format`,
// };
// const INVALID_UNIT_RESPONSE = {
//   error: `Invalid units; must be one of: ${VALID_UNITS}`,
// };

// function isValidDate(date) {
//   return moment(date, VALID_DATE_FORMAT, true).isValid();
// }
// function isValidUnit(unit) {
//   return VALID_UNITS.includes(unit);
// }
// function validateReqUnitAndDate(req, res) {
//   if (!isValidUnit(req.body.unit)) {
//     res.status(400).json(INVALID_UNIT_RESPONSE);
//   }
//   if (!isValidDate(req.body.date)) {
//     res.status(400).json(INVALID_DATE_RESPONSE);
//   }
// }

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.post("/exercises", (req, res) => {
  // validateReqUnitAndDate(req, res);
  if (!res.headersSent) {
    exercises
      .createExercise(
        req.body.name,
        req.body.reps,
        req.body.weight,
        req.body.unit,
        req.body.date
      )
      .then((exercise) => {
        res.status(201).json(exercise);
      })
      .catch((error) => {
        res.status(500).json({ error: `${error}` });
      });
  }
});

app.get("/exercises", (req, res) => {
  exercises
    .retrieveExercises()
    .then((exercises) => {
      res.status(200).json(exercises);
    })
    .catch((error) => {
      res.status(500).json({ error: `${error}` });
    });
});

app.put("/exercises/:_id", (req, res) => {
  // validateReqUnitAndDate(req, res);
  if (!res.headersSent) {
    exercises
      .updateExercise(
        req.params._id,
        req.body.name,
        req.body.reps,
        req.body.weight,
        req.body.unit,
        req.body.date
      )
      .then((updated) => {
        if (updated) {
          res.status(200).json(updated);
        } else {
          res.status(404).json({ Error: "Resource not found" });
        }
      })
      .catch((error) => {
        if (error.name === "CastError") {
          res.status(404).json({ Error: "Resource not found" });
        } else {
          res.status(500).json({ error: `${error}` });
        }
      });
  }
});

app.delete("/exercises/:_id", (req, res) => {
  exercises
    .deleteExercise(req.params._id)
    .then((deletedCount) => {
      if (deletedCount === 1) {
        res.status(204).send();
      } else {
        res.status(404).json({ Error: "Resource not found" });
      }
    })
    .catch((error) => {
      if (error.name === "CastError") {
        res.status(404).json({ Error: "Resource not found" });
      } else {
        res.status(500).json({ error: `${error}` });
      }
    });
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});
