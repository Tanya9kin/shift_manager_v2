const { Event, EventTemplate } = require("../models/event");
const fns = require("date-fns");

exports.getEventsByMonth = async (req, res) => {
  try {
    console.log(
      `getting events by month ${req.params.month} of year ${req.params.year}`
    );
    const year = req.params.year;
    const month = req.params.month;
    const events = await Event.find({
      $expr: {
        $and: [
          { $eq: [{ $year: "$date" }, year] },
          { $eq: [{ $month: "$date" }, month] },
        ],
      },
    });
    if (events.length === 0) {
      res.status(200).send([]);
    } else {
      res.status(200).send(events);
    }
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.createNewMonth = async (req, res) => {
  try {
    console.log("creating new month");
    const year = req.body.year;
    const month = req.body.month;
    const dateStartOfMonth = new Date(year, month, 1);
    const eventTemplates = await EventTemplate.find({ type: "line" }).toArray();
    const days = fns.eachDayOfInterval({
      start: dateStartOfMonth,
      end: fns.endOfMonth(dateStartOfMonth),
    });

    const result = [];

    days.forEach(async (day) => {
      eventTemplates.forEach(async (eventTemplate) => {
        // for each day of the week that the event should happen on, create an event
        const recurringDays = eventTemplate.recurringDays; // is an array!
        if (recurringDays.includes(day.getDay() + 1)) {
          //day.getDay() returns 0-6, but recurringDays is 1-7
          const event = new Event({
            title: eventTemplate.title,
            date: day,
            positions: eventTemplate.positions,
          });
          result.push(await event.save());
        }
      });
    });

    res.status(200).send(result);
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.createNewEvent = async (req, res) => {
  // need to add validation (probably as a middleware)
  console.log("creating new event with req.body: ", req.body);
  try {
    const event = new Event(req.body);
    const result = await event.save();
    console.log("result: ", result);
    res.status(200).send(result);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};
