const express = require("express");
const Orders = require("../models/Orders");

const colorLog = require("../../utils/colorLog");

const router = express.Router();

router.get("/", (_, res) => {
  Orders.find()
    .then((data) => res.status(200).send(data))
    .catch((err) => colorLog("error", `Error getting orders: ${err}`));
});

router.get("/:id", (req, res) => {
  Orders.findById(req.params.id)
    .then((data) => res.status(200).send(data))
    .catch((err) => colorLog("error", `Error getting 1 order: ${err}`));
});

router.post("/", (req, res) => {
  Orders.create(req.body)
    .then((data) => res.status(201).send(data))
    .catch((err) => colorLog("error", `Error posting order: ${err}`));
});

router.put("/:id", (req, res) => {
  console.log({
    id: req.params.id,
    body: req.body,
  });
  Orders.findByIdAndUpdate(req.params.id, req.body)
    .then(() => res.status(204).end())
    .catch((err) => colorLog("error", `Error updating order: ${err}`));
});

router.delete("/:id", (req, res) => {
  Orders.findByIdAndRemove(req.params.id)
    .then(() => {
      colorLog("info", `Order id: "${req.params.id}" was deleted`);
      res.end();
    })
    .catch((err) => colorLog("error", `Error deleting order: ${err}`));
});

module.exports = router;
