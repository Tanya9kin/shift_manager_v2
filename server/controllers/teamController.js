const { TeamMember } = require("../models/teamMember");

exports.getTeamMember = async (req, res) => {
  try {
    console.log("getting team member by id");
    const id = req.params.id;
    const teamMember = await TeamMember.findById(id);
    res.status(200).send(teamMember);
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.getAllTeamMembers = async (req, res) => {
  try {
    console.log("getting all team members");
    const teamMembers = await TeamMember.find({});
    console.log("teamMembers: ", teamMembers);
    if (teamMembers) {
      res.status(200).send(await teamMembers.toArray());
    }
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.createTeamMember = async (req, res) => {
  try {
    console.log("creating team member");
    const teamMember = new TeamMember(req.body);
    const result = await teamMember.save();
    res.status(200).send(result);
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.getTeamMembersByRole = async (req, res) => {
  try {
    const category = req.params.category;
    const style = req.params.style;
    console.log(`getting team members for role: ${category} ${style}`);
    const result = await TeamMember.find({
      roles: { $elemMatch: { category: category, style: style } },
    });
    console.log(result);

    res.status(200).send(result);
  } catch (err) {
    res.status(500).send(err);
  }
};

//There should be middleware to check if the data in req.body is valid
exports.updateTeamMember = async (req, res) => {
  try {
    console.log("updating team member");
    const teamMember = await TeamMember.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).send(teamMember);
  } catch (err) {
    res.status(500).send(err);
  }
};
