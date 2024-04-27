const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { Schema } = mongoose;

const resetTokenSchema = new Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required:true
  },
  token: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    expires: 300,
    default: Date.now()
  }
});





module.exports = mongoose.model("ResetToken", resetTokenSchema);
