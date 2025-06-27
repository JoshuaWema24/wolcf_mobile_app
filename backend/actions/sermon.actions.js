const mongoose = require("mongoose");
const express = require("express");
const Sermon = require("../models/sermon.model");

// Create a new sermon
exports.createSermon = async (req, res) => {
  try {
    const { title, preacher, date, mediaUrl, description } = req.body;
    const sermon = new Sermon({ title, preacher, date, mediaUrl, description });
    await sermon.save();
    res.status(201).json({ message: "Sermon created successfully", sermon });
  } catch (error) {
    res.status(400).json({ message: "Error creating sermon", error });
  }
};

// Update a sermon
exports.updateSermon = async (req, res) => {
  try {
    const { title } = req.params;
    const { preacher, date, mediaUrl, description } = req.body;
    const sermon = await Sermon.findOneAndUpdate(
      { title },
      { title, preacher, date, mediaUrl, description },
      { new: true }
    );
    if (!sermon) {
      return res.status(404).json({ message: "Sermon not found" });
    }
    res.json({ message: "Sermon updated successfully", sermon });
  } catch (error) {
    res.status(400).json({ message: "Error updating sermon", error });
  }
};

// Delete a sermon
exports.deleteSermon = async (req, res) => {
  try {
    const { title } = req.params;
    const sermon = await Sermon.findOneAndDelete({ title });
    if (!sermon) {
      return res.status(404).json({ message: "Sermon not found" });
    }
    res.json({ message: "Sermon deleted successfully", sermon });
  } catch (error) {
    res.status(400).json({ message: "Error deleting sermon", error });
  }
};

// Get a sermon by title
exports.getSermon = async (req, res) => {
  try {
    const { title } = req.params;
    const sermon = await Sermon.findOne({ title });
    if (!sermon) {
      return res.status(404).json({ message: "Sermon not found" });
    }
    res.json({ sermon });
  } catch (error) {
    res.status(400).json({ message: "Error fetching sermon", error });
  }
};

// Get all sermons
exports.getAllSermons = async (req, res) => {
  try {
    const sermons = await Sermon.find();
    res.json({ sermons });
  } catch (error) {
    res.status(400).json({ message: "Error fetching sermons", error });
  }
};
