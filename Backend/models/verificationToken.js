const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { Schema } = mongoose;

const verificationTokenSchema = new Schema({
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
    expires: 3600,
    default: Date.now()
  }
});

verificationTokenSchema.pre("save", async function (next) {
  if (this.isModified("token")) {
    const hash = await bcrypt.hash(this.token, 8);
    this.token = hash;
  }
  next();
});

verificationTokenSchema.methods.compareToken = async function (token) {
  try {
    const result = await bcrypt.compare(token, this.token);
    return result;
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = mongoose.model("VerificationToken", verificationTokenSchema);
