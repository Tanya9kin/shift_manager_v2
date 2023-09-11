const mongoose = require("mongoose");
const { roleSchema } = require("./role");
const { eventTypes } = require("./enums");

const positionToFillSchema = {
  title: String,
  role: roleSchema,
  filled_by_member: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Team Member",
    default: null,
  },
};

const eventTemplateSchema = {
  title: String,
  type: {
    type: String,
    enum: eventTypes,
  },
  start_date: Date,
  num_instances: Number,
  recurringDays: [Number],
  positions: [positionToFillSchema],
};

const eventSchema = {
  title: String,
  date: Date,
  positions: [positionToFillSchema],
};

const PositionToFill = mongoose.model("Position To Fill", positionToFillSchema);
const EventTemplate = mongoose.model("Event Template", eventTemplateSchema);
const Event = mongoose.model("Event", eventSchema);

module.exports = { PositionToFill, EventTemplate, Event };
