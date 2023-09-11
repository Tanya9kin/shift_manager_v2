const express = require("express");
const bodyParser = require("body-parser");
const uuid = require("uuid");
const cors = require("cors");
const connectToDatabase = require("./conn");
const teamRoutes = require("./routes/teamRoutes");
const eventsRoutes = require("./routes/eventRoutes");
const calendarRoutes = require("./routes/calendarRoutes");
// const { saveEventTemplates, saveTeamMembers } = require("./initialize.js"); // functions to populate the database with initial data

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

connectToDatabase();

app.use("/api/team", teamRoutes);

app.use("/api/events", eventsRoutes);

app.use("/api/calendar", calendarRoutes);

app.get("/api", async (req, res) => {
  res.send("Hello World");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log("Server is running on port: " + PORT));
