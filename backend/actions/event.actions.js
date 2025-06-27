const mongoose = require("mongoose");
const Event = require("../models/event.model.js");
const express = require("express");

exports.createEvent = async (req, res) => {
  try {
    const { title, organizer, description, date, location } = req.body;
    const newEvent = new Event({
      title,
      organizer,
      description,
      date,
      location,
    });
    await newEvent.save();
    res
      .status(201)
      .json({ message: "Event created successfully", event: newEvent });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating event", error: error.message });
  }
};

exports.updateEvent = async (req, res) => {
  try {
    const { title, organizer, description, date, location } = req.body;
    const updatedEvent = await Event.findOneAndUpdate(
      { title: req.params.title },
      { organizer, description, date, location },
      { new: true }
    );
    if (!updatedEvent) {
      return res.status(404).json({ message: "Event not found" });
    }
    res.json({ message: "Event updated successfully", event: updatedEvent });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating event", error: error.message });
  }
};

exports.deleteEvent = async (req, res) => {
  try {
    const deletedEvent = await Event.findOneAndDelete({
      title: req.params.title,
    });
    if (!deletedEvent) {
      return res.status(404).json({ message: "Event not found" });
    }
    res.json({ message: "Event deleted successfully", event: deletedEvent });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting event", error: error.message });
  }
};

exports.getEvent = async (req, res) => {
  try {
    const event = await Event.findOne({ title: req.params.title });
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }
    res.json({ event });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching event", error: error.message });
  }
};

exports.getAllEvents = async (req, res) => {
  try {
    const events = await Event.find();
    res.json({ events });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching events", error: error.message });
  }
};
