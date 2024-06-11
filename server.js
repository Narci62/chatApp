const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/chatapp', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

const {
    User,
    Chat,
    Member,
    Message
  } = require("./models");

const server = http.createServer(app);
const io = socketIo(server);

// Socket.IO Connection Handler
io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  io.emit('user_connected', { userId: socket.id });

  // Event: Join Chat
  socket.on('join-chat', async (data) => {
    const { chatId, userId_admin, userId_added, service, target } = data;
    try{

        const admin = await User.findById(userId_admin);
        const user = await User.findById(userId_added);
        const chat = await Chat.findById(chatId);

        if(!admin || !user){
            console.error('User not found');
            return;
        }
        if(!chat){
            console.error('Chat not found');
            return;
        }

        const unique = {
            chat_id : chatId,
            user: userId_added
        };

        const picture = {
            service,
            target
        }

        const chatmember = {
            unique_id : unique,
            photo: picture,
            added_by: admin._id,
            name : chat,
            chat_id : chatId
        }

        Member.push(chatmember);
        await Member.save();

        socket.join(chatId);
        console.log(`User ${userId_added} joined chat ${chatId}`);
        console.log(`${userId_added} adding by ${userId_admin}`);
    }catch(error){
        console.error(error.message)
    }
  });

  // Event: Send Message
  socket.on('send-message', async (data) => {
    const { chatId, content, sender, receiver, contentType } = data;

    // Save message to MongoDB
    try {
      const chat = await Chat.findById(chatId);

      if (!chat) {
        console.error('Chat not found');
        return;
      }

      const msg = {
        content,
        contentType
      }

      const messages = {
        chat_id:chatId,
        message:msg,
        sender,
        status: 'Sent'
      };

      Message.push(messages);
      await Message.save();

      // Emit the message to all users in the chat room
      io.to(chatId).emit('new_message', messages);

      console.log('Message sent and saved to MongoDB:', messages);
    } catch (error) {
      console.error('Error saving message:', error.message);
    }
  });

  // Event: Disconnect
  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
    // Event: User Ended Connection
    io.emit('user_ended_connection', { userId: socket.id });
  });

});

const port = process.env.SERVER_PORT || 3000;
server.listen(port, () => {
  console.log(`Listening on port: ${port}`);
}); 

//module.exports = { io };