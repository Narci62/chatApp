const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const contentType = ['text', 'image', 'video', 'audio'];

const ChatSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  created_by:{
    type:Schema.Types.ObjectId,
    ref:'Member',
    required:true
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
    type: String,
    default:Date.now
  },
  record_id:{
    type: String,
    default:Date.now
  }
});

module.exports = {
  Chat: mongoose.model('Chat', ChatSchema)
};