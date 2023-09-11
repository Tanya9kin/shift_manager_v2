const { Role } = require("../models/role");
const { EventTemplate, PositionToFill } = require("../models/event");
const { TeamMember } = require("../models/teamMember");

// this was what I added to the dabaase to initialize it
const bachataInstructor = new Role({
  category: "instructor",
  style: "bachata",
});

const bachataDJ = new Role({
  category: "dj",
  style: "bachata",
});

const bartender = new Role({
  category: "bartender",
});

const advertiser = new Role({
  category: "advertiser",
});

const salsaInstructor = new Role({
  category: "instructor",
  style: "salsa",
});

const salsaDJ = new Role({
  category: "dj",
  style: "salsa",
});

const zoukInstructor = new Role({
  category: "instructor",
  style: "zouk",
});

const zoukDJ = new Role({
  category: "dj",
  style: "zouk",
});

const bachataAndSalsaOpenEventTemplate = new EventTemplate({
  title: "Bachata and Salsa Open",
  type: "line",
  recurringDays: [5],
  positions: [
    new PositionToFill({ title: "LVL1", role: [bachataInstructor] }),
    new PositionToFill({ title: "LVL2", role: [bachataInstructor] }),
    new PositionToFill({ title: "LVL3", role: [bachataInstructor] }),
    new PositionToFill({ title: "LVL4", role: [bachataInstructor] }),
    new PositionToFill({ title: "LVL5", role: [bachataInstructor] }),
    new PositionToFill({ title: "LVL1", role: [salsaInstructor] }),
    new PositionToFill({ title: "LVL2", role: [salsaInstructor] }),
    new PositionToFill({ title: "LVL3", role: [salsaInstructor] }),
    new PositionToFill({ title: "LVL4", role: [salsaInstructor] }),
    new PositionToFill({ title: "DJ", role: [salsaDJ] }),
    new PositionToFill({ title: "DJ", role: [bachataDJ] }),
    new PositionToFill({ title: "bartender", role: [bartender] }),
    new PositionToFill({ title: "advertiser", role: [advertiser] }),
  ],
});

const bachataClosedEventTemplate = new EventTemplate({
  title: "Bachata Closed",
  type: "line",
  recurringDays: [2],
  positions: [
    new PositionToFill({ title: "LVL1", role: [bachataInstructor] }),
    new PositionToFill({
      title: "closed group 1",
      role: [bachataInstructor],
    }),
    new PositionToFill({
      title: "closed group 2",
      role: [bachataInstructor],
    }),
    new PositionToFill({
      title: "closed group 3",
      role: [bachataInstructor],
    }),
    new PositionToFill({
      title: "Pre-Master",
      role: [bachataInstructor],
    }),
    new PositionToFill({ title: "Master", role: [bachataInstructor] }),
    new PositionToFill({ title: "DJ", role: [bachataInstructor] }),
  ],
});

const salsaAndZoukEventTemplate = new EventTemplate({
  title: "Salsa and Zouk",
  type: "line",
  recurringDays: [5],
  positions: [
    new PositionToFill({ title: "LVL1", role: [salsaInstructor] }),
    new PositionToFill({ title: "LVL2", role: [salsaInstructor] }),
    new PositionToFill({ title: "LVL3", role: [salsaInstructor] }),
    new PositionToFill({ title: "LVL4", role: [salsaInstructor] }),
    new PositionToFill({ title: "LVL1", role: [zoukInstructor] }),
    new PositionToFill({ title: "LVL2", role: [zoukInstructor] }),
    new PositionToFill({ title: "LVL3", role: [zoukInstructor] }),
    new PositionToFill({ title: "DJ", role: [zoukDJ] }),
    new PositionToFill({ title: "DJ", role: [salsaDJ] }),
    new PositionToFill({ title: "bartender", role: [bartender] }),
    new PositionToFill({ title: "advertiser", role: [advertiser] }),
  ],
});

const teamMember1 = new TeamMember({
  first_name: "Tanya",
  last_name: "Deveykin",
  phone: "+972547536256",
  email: "tanya9kin@gmail.com",
  roles: [bachataInstructor, zoukInstructor, advertiser],
});

const teamMember2 = new TeamMember({
  first_name: "Daniel",
  last_name: "Lyubin",
  phone: "+972547536256",
  email: "dani9590@gmail.com",
  roles: [bachataDJ, zoukDJ, zoukInstructor, advertiser],
});

const teamMember3 = new TeamMember({
  first_name: "Lior",
  last_name: "Benisty",
  phone: "+972547536256",
  email: "",
  manager: true,
  roles: [salsaInstructor, bachataInstructor, advertiser],
});

const teamMember4 = new TeamMember({
  first_name: "Jordan",
  last_name: "Perez",
  phone: "+972547536256",
  email: "",
  manager: true,
  roles: [salsaInstructor, bachataInstructor, salsaDJ, bachataDJ, advertiser],
});

const teamMember5 = new TeamMember({
  first_name: "Vova",
  last_name: "Cuna",
  phone: "+972547536256",
  email: "",
  roles: [salsaInstructor, salsaDJ, advertiser],
});

//Already ran this one
function saveEventTemplates() {
  salsaAndZoukEventTemplate.save().then(
    () => console.log("salsa and zouk Event Template saved"),
    (err) => console.log(err)
  );

  bachataClosedEventTemplate.save().then(
    () => console.log("bachata Closed Event Template saved"),
    (err) => console.log(err)
  );

  bachataAndSalsaOpenEventTemplate.save().then(
    () => console.log("bachata and salsa Open Event Template saved"),
    (err) => console.log(err)
  );
}

function saveTeamMembers() {
  teamMember1.save().then(
    () => console.log("team member 1 saved"),
    (err) => console.log(err)
  );

  teamMember2.save().then(
    () => console.log("team member 2 saved"),
    (err) => console.log(err)
  );

  teamMember3.save().then(
    () => console.log("team member 3 saved"),
    (err) => console.log(err)
  );

  teamMember4.save().then(
    () => console.log("team member 4 saved"),
    (err) => console.log(err)
  );

  teamMember5.save().then(
    () => console.log("team member 5 saved"),
    (err) => console.log(err)
  );
}

module.exports = { saveEventTemplates, saveTeamMembers };
