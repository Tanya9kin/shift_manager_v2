const express = require("express");

const {
  getEventsByMonth,
  createNewMonth,
  createNewEvent,
} = require("../controllers/calendarController");

const router = express.Router();

router.get("/", (req, res) => {
  console.log("calendarRoutes");
  res.send("calendarRoutes");
});

//not tested
router.get("/:year/:month", getEventsByMonth);

router.post("/event", createNewEvent);

//not tested
router.post("/new-month", createNewMonth);

module.exports = router;
