const express = require("express");
const { Event } = require("../models/event");
const { updateEvent } = require("../controllers/eventsController");

const router = express.Router();

router.put("/:eventId", updateEvent);

module.exports = router;
