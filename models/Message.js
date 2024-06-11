const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const contentType = ['text', 'image', 'video', 'audio'];

const msgSchema = new Schema({
  content: {
    type: String,
    required: true,
  },
  contentType: {
    type: String,
    enum: contentType,
    default: 'text',
  }
});

const messageSchema = new Schema({
  chat_id:{
    type:Schema.Types.ObjectId,
    ref:'Chat',
    required:true
  },
  message: [msgSchema],
  sender: {
    type: Schema.Types.ObjectId,
    ref: 'Member',
    required: true,
  },
  status:{
    type:  String,
    required: true
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at:{
    type:Date,
    default:Date.now
  },
  id:{
    type: int,
    default:Date.now
  },
  record_id:{
    type: String,
    default:Date.now
  }
});


module.exports = {
  Chat: mongoose.model('Message', messageSchema)
};

