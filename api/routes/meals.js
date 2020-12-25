const express = require("express");
const Meals = require("../models/Meals");

const router = express.Router();

router.get("/", (req, res, next) => {
  Meals.find()
    .exec()
    .then((data) => {
      next();
      res.send(data);
      return data;
    })
    .catch((err) => console.log(`Error getting meals: ${err}`));
});

// router.get("/:id", (req, res) => {
//   Meals.findById(req.params.id)
//     .exec()
//     .then((data) => res.status(200).send(data))
//     .catch((err) => console.log(`Error getting 1 meal: ${err}`));
// });

// router.post("/", (req, res) => {
//   Meals.create(req.body)
//     .exec()
//     .then((data) => res.status(201).send(data))
//     .catch((err) => console.log(`Error posting meal: ${err}`));
// });

// router.put("/:id", (req, res) => {
//   Meals.findOneAndUpdate(req.params.id, req.body)
//     .exec()
//     .then(() => res.status(204))
//     .catch((err) => console.log(`Error updating meal: ${err}`));
// });

// router.delete("/:id", (req, res) => {
//   Meals.findOneAndDelete(req.params.id)
//     .exec()
//     .then(() => res.status(204))
//     .catch((err) => console.log(`Error deleting meal: ${err}`));
// });

module.exports = router;
