const mongoose = require("mongoose");
const { v4: uuidv4 } = require('uuid');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true,
    validate(val) {
      if (val.length < 3) throw new Error("Username too short");
    },
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique : true, 
    dropDups: true,
    validate(val) {
      if (!val.includes("@") || !val.includes(".") || val.length < 5) throw new Error("Email incorrect");
    },
  },
  password: {
    type: String,
    required: true,
    trim: true,
    validate(val) {
      if (val.length < 6) throw new Error("Password too short");
    },
  },
  session_id:{
    type: String,
    unique : true, 
    dropDups: true,
    default: uuidv4
  },
  money:{
    type: Number,
    default: 0
  },
  allowance: {
    type: Number,
    default: 0
  },
  interest: {
    type: Number,
    default: 0.03
  },
  startDate: {
    type: Number,
    default: (new Date()).now()
  }
});

module.exports = mongoose.model("User", UserSchema);

