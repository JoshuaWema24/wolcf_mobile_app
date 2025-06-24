'use server strict';
const mongoose = require('mongoose');
const Announcement = require('../models/announcement.model');
const express = require('express');

//create announcement
const createAnnouncement = async (req, res) => {
  try {
    const { title, content } = req.body;
    const announcement = new Announcement({ title, content });
    await announcement.save();
    res.status(201).json({ message: 'Announcement created successfully', announcement });
  } catch (error) {
    res.status(400).json({ message: 'Error creating announcement', error });
  }
};

//update announcement
const updateAnnouncement = async (req, res) => {
  try {
    const { title } = req.params;
    const { content } = req.body;
    const announcement = await Announcement.findOneAndUpdate({ title }, { content }, { new: true });
    if (!announcement) {
      return res.status(404).json({ message: 'Announcement not found' });
    }
    res.status(200).json({ message: 'Announcement updated successfully', announcement });
  } catch (error) {
    res.status(400).json({ message: 'Error updating announcement', error });
  }
};
 
//delete announcement
const deleteAnnouncement = async (req, res) => {
  try {
    const { title } = req.params;
    const announcement = await Announcement.findOneAndDelete({ title });
    if (!announcement) {
      return res.status(404).json({ message: 'Announcement not found' });
    }
    res.status(200).json({ message: 'Announcement deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: 'Error deleting announcement', error });
  }
};

//get one announcement
const getAnnouncement = async (req, res) => {
  try {
    const { title } = req.params;
    const announcement = await Announcement.findOne({ title });
    res.status(200).json({ message: 'Announcement retrieved successfully', announcement });
  } catch (error) {
    res.status(400).json({ message: 'Error retrieving announcement', error });
  }
};

//get all announcements
const getAllAnnouncements = async (req, res) => {
  try {
    const announcements = await Announcement.find();
    res.status(200).json({ message: 'Announcements retrieved successfully', announcements });
  } catch (error) {
    res.status(400).json({ message: 'Error retrieving announcements', error });
  }
};
 module.exports = {
  createAnnouncement,
  updateAnnouncement,
  deleteAnnouncement,
  getAnnouncement,
  getAllAnnouncements
};