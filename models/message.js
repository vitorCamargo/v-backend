const mongoose = require('mongoose');
const uniquevalidator = require('mongoose-unique-validator');

const { Schema } = mongoose;

const MessageSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  subject: { type: String, required: true },
  message: { type: String, required: true }
}, { timestamps: true });

MessageSchema.plugin(uniquevalidator);

const Message = mongoose.model('Message', MessageSchema, 'Messages');

module.exports = Message;

module.exports.getAllMessages = (callback) => {
  Message.find(callback);
};

module.exports.getMessageById = (id, callback) => {
  Message.findOne({ _id: id }, callback);
};

module.exports.addMessage = (message, callback) => {
  Message.create(message, callback);
};

module.exports.updateMessage = (id, updatedMessage, callback) => {
  Message.getMessageById(id, (err, message) => {
    if (err) callback(err, null);

    message.name = updatedMessage.name ? updatedMessage.name : message.name;
    message.email = updatedMessage.email ? updatedMessage.email : message.email;
    message.subject = updatedMessage.subject ? updatedMessage.subject : message.subject;
    message.message = updatedMessage.message ? updatedMessage.message : message.message;

    message.save(callback);
  });
};

module.exports.deleteMessage = (id, callback) => {
  Message.deleteOne({ _id: id }, callback);
};