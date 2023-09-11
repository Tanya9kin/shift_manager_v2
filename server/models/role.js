const mongoose = require("mongoose");
const { styles } = require("./enums");

const roleSchema = {
  category: {
    type: String,
    enum: ["instructor", "dj", "bartender", "advertiser", "other"],
    required: true,
  },
  style: {
    type: String,
    enum: styles,
    required: false,
  },
};

const Role = mongoose.model("Role", roleSchema);

module.exports = { Role, roleSchema };
