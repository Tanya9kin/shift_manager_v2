const express = require("express");
const { TeamMember } = require("../models/teamMember");
const {
  getAllTeamMembers,
  getTeamMember,
  createTeamMember,
  updateTeamMember,
  getTeamMembersByRole,
} = require("../controllers/teamController");

const router = express.Router();

router.get("/", getAllTeamMembers);

router.get("/:category/:style", getTeamMembersByRole);

router.get("/:id", getTeamMember);

router.put("/:id/edit", updateTeamMember);

router.post("/new", createTeamMember);

module.exports = router;
