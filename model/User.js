const mongoose = require("mongoose");
const { v4: uuid } = require("uuid");

const userSchema = new mongoose.Schema({
    firstName: {type: String, require: true},
	lastName: {type: String, require: true},
	email: { type: String, require: true, lowercase: true, unique: true },
	hashedPassword: { type: String, require: true },
	id: { type: String, default: uuid },
});

const User = mongoose.model("user", userSchema);

module.exports = User;