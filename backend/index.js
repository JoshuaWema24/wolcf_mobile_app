const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

// MongoDB URI
const MONGO_URI = 'mongodb://localhost:27017/WOLCF_MOBILE_APP';

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// MongoDB Connection
mongoose.connect(MONGO_URI);
mongoose.connection.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});
mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB');
});

// blog routes
const blogactions = require('./actions/blog.actions.js');
app.post('/blogs', blogactions.createBlog);
app.put('/blogs/:title', blogactions.updateBlog);
app.delete('/blogs/:title', blogactions.deleteBlog);
app.get('/blogs/:title', blogactions.getBlog);
app.get('/blogs', blogactions.getAllBlogs);

// User routes
const useractions = require('./actions/user.actions.js');
app.post('/users', useractions.createUser);
app.put('/users/:name', useractions.updateUser);
app.delete('/users/:name', useractions.deleteUser);
app.get('/users/:name', useractions.getUser);
app.get('/users', useractions.getAllUsers);

// Announcement routes
const announcementactions = require('./actions/announcement.actions.js');
app.post('/announcements', announcementactions.createAnnouncement);
app.put('/announcements/:title', announcementactions.updateAnnouncement);
app.delete('/announcements/:title', announcementactions.deleteAnnouncement);
app.get('/announcements/:title', announcementactions.getAnnouncement);
app.get('/announcements', announcementactions.getAllAnnouncements);

// Event routes
const eventactions = require('./actions/event.actions.js');
app.post('/events', eventactions.createEvent);
app.put('/events/:title', eventactions.updateEvent);
app.delete('/events/:title', eventactions.deleteEvent);
app.get('/events/:title', eventactions.getEvent);
app.get('/events', eventactions.getAllEvents);

// Prayer routes
const prayeractions = require('./actions/prayer.actions.js');
app.post('/prayers', prayeractions.createPrayerRequest);
app.put('/prayers/:id', prayeractions.updatePrayerRequest);
app.delete('/prayers/:id', prayeractions.deletePrayerRequest);
app.get('/prayers/:id', prayeractions.getPrayerRequest);
app.get('/prayers', prayeractions.getAllPrayerRequests);

// Sermon routes
const sermonactions = require('./actions/sermon.actions.js');
app.post('/sermons', sermonactions.createSermon);
app.put('/sermons/:title', sermonactions.updateSermon);
app.delete('/sermons/:title', sermonactions.deleteSermon);
app.get('/sermons/:title', sermonactions.getSermon);
app.get('/sermons', sermonactions.getAllSermons);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
