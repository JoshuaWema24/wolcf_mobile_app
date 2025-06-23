const express = require('express');
const mongoose = require('mongoose');
const blogmodel = require('./models/blog.model');
const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/Wolcf mobile app', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
mongoose.connection.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});
mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB');
});

// Define routes

import blogactions from './actions/blog.actions.js';
app.post('/blogs', blogactions.createBlog);
app.put('/blogs/:title', blogactions.updateBlog);
app.delete('/blogs/:title', blogactions.deleteBlog);
app.get('/blogs/:title', blogactions.getBlog);
app.get('/blogs', blogactions.getAllBlogs);

import useractions from './actions/user.actions.js';
app.post('/users', useractions.createUser);
app.put('/users/:name', useractions.updateUser);
app.delete('/users/:name', useractions.deleteUser);
app.get('/users/:name', useractions.getUser);
app.get('/users', useractions.getAllUsers);
 
import announcementactions from './actions/announcement.actions.js';
app.post('/announcements', announcementactions.createAnnouncement);
app.put('/announcements/:title', announcementactions.updateAnnouncement);
app.delete('/announcements/:title', announcementactions.deleteAnnouncement);
app.get('/announcements/:title', announcementactions.getAnnouncement);
app.get('/announcements', announcementactions.getAllAnnouncements);

//start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
