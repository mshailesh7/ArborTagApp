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
    expires: 120,
    default: Date.now()
  }
});

resetTokenSchema.pre("save", async function (next) {
  if (this.isModified("token")) {
    const hash = await bcrypt.hash(this.token, 8);
    this.token = hash;
  }
  next();
});

resetTokenSchema.methods.compareToken = async function (token) {
  try {
    const result = await bcrypt.compare(token, this.token);
    return result;
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = mongoose.model("ResetToken", resetTokenSchema);
