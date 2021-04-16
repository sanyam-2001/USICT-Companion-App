const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: { type: String },
    email: { type: String },
    password: { type: String },
    enrollmentNumber: { type: String, unique: true },
    branch: { type: String },
    year: { type: Number },
    currentSem: { type: Number }
});

const userModel = mongoose.model('userModel', userSchema);

module.exports = userModel;