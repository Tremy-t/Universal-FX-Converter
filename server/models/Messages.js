const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  fullName: {
    type: String, 
    required: [true, "Full name is required"], 
  },
  email: {
    type: String, 
    required: [true, "Email is required"], 
  },
  message: {
    type: String, 
    required: [true, "Message is required"], 
  },
});

const Contact = mongoose.model('messages', contactSchema);

module.exports = Contact