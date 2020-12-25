const express = require("express");
const Meals = require("../models/Meals");

const colorLog = require("../../utils/colorLog");

const router = express.Router();

router.get("/", (req, res, next) => {
  Meals.find()
    .then((data) => {
      res.status(200).send(data);
      next();
    })
    .catch((err) => colorLog("error", `Error getting meals: ${err}`));
});

router.get("/:id", (req, res, next) => {
  Meals.findById(req.params.id)
    .then((data) => {
      res.status(200).send(data);
      next();
    })
    .catch((err) => colorLog("error", `Error getting 1 meal: ${err}`));
});

router.post("/", (req, res, next) => {
  Meals.create(req.body)
    .then((data) => {
      res.status(201).send(data);
      next();
    })
    .catch((err) => colorLog("error", `Error posting meal: ${err}`));
});

router.put("/:id", (req, res, next) => {
  Meals.findOneAndUpdate(req.params.id, req.body)
    .then(() => {
      res.status(204);
      next();
    })
    .catch((err) => colorLog("error", `Error updating meal: ${err}`));
});

router.delete("/:id", (req, res, next) => {
  Meals.findOneAndDelete(req.params.id)
    .then(() => {
      colorLog("info", `Meal id: "${req.params.id}" was deleted`);
      next();
    })
    .catch((err) => colorLog("error", `Error deleting meal: ${err}`));
});

module.exports = router;
