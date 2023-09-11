const mongoose = require("mongoose");
const { roleSchema } = require("./role");

const teamMemberSchema = {
  first_name: String,
  last_name: String,
  phone: String,
  email: String,
  roles: [roleSchema],
  avatar_url: { type: String, default: "" },
  manager: { type: Boolean, default: false },
  created_at: { type: Date, default: Date.now },
};

const TeamMember = mongoose.model("Team Member", teamMemberSchema);

module.exports = { TeamMember };
