const express = require("express");
const Meals = require("../models/Meals");

const colorLog = require("../../utils/colorLog");

const router = express.Router();

router.get("/", (_, res) => {
  Meals.find()
    .then((data) => res.status(200).send(data))
    .catch((err) => colorLog("error", `Error getting meals: ${err}`));
});

router.get("/:id", (req, res) => {
  Meals.findById(req.params.id)
    .then((data) => res.status(200).send(data))
    .catch((err) => colorLog("error", `Error getting 1 meal: ${err}`));
});

router.post("/", (req, res) => {
  Meals.create(req.body)
    .then((data) => res.status(201).send(data))
    .catch((err) => colorLog("error", `Error posting meal: ${err}`));
});

router.put("/:id", (req, res) => {
  console.log({
    id: req.params.id,
    body: req.body,
  });
  Meals.findByIdAndUpdate(req.params.id, req.body)
    .then(() => res.status(204).end())
    .catch((err) => colorLog("error", `Error updating meal: ${err}`));
});

router.delete("/:id", (req, res) => {
  Meals.findByIdAndRemove(req.params.id)
    .then(() => {
      colorLog("info", `Meal id: "${req.params.id}" was deleted`);
      res.end();
    })
    .catch((err) => colorLog("error", `Error deleting meal: ${err}`));
});

module.exports = router;
