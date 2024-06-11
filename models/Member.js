const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const contentType = ['text', 'image', 'video', 'audio'];

const UniqueSchema = new Schema({
  chat_id: {
    type: Schema.Types.ObjectId,
    ref:'Chat',
    required: true,
  },
  user:{
    type:Schema.Types.ObjectId,
    ref:'User',
    required:true
  }
});

const PictureSchema = new Schema({
    service:{
        type: String,
        required:true
    },
    target:{
        type:String,
        required:true
    }
});

const MemberSchema = new Schema({
  unique_id:[UniqueSchema],
  photo:[PictureSchema],
  name:{
    type:Schema.Types.ObjectId,
    ref:'Chat',
    required:true
  },
  is_chat_admin:{
    type:Boolean,
    default:true
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
  Chat: mongoose.model('Member', MemberSchema)
};