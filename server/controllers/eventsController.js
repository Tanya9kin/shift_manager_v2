const { Event } = require("../models/event");
const { TeamMember } = require("../models/teamMember");
const { PositionToFill } = require("../models/event");

exports.updateEvent = async (req, res) => {
  const { eventId } = req.params;
  const { positions } = req.body;

  console.log(`updating event ${eventId}`);
  console.log(`positions: ${JSON.stringify(positions)}`);

  const { eventsPositions } = await Event.findById(eventId, { positions: 1 });
  const newPositions = (event.positions = newPositions);
  await event.save();

  res.send(event);
};

exports.updatePosition = async (req, res) => {
  const position = req.body;
  const { eventId, positionId } = req.params;
  const positionFromDB = Event.findById(eventId, { positions: 1 }).findById(
    positionId
  );
};
