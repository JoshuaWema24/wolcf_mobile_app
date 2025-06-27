const express = require("express");
const mongoose = require("mongoose");

const PrayerRequest = require("../models/prayer.model");

// Create a new prayer request
exports.createPrayerRequest = async (req, res) => {
  try {
    const { memberName, request, isAnonymous } = req.body;
    const prayerRequest = new PrayerRequest({
      memberName,
      request,
      isAnonymous,
    });
    await prayerRequest.save();
    res
      .status(201)
      .json({ message: "Prayer request created successfully", prayerRequest });
  } catch (error) {
    res.status(400).json({ message: "Error creating prayer request", error });
  }
};

// Update a prayer request
exports.updatePrayerRequest = async (req, res) => {
  try {
    const { memberName, request, isAnonymous } = req.body;
    const prayerRequest = await PrayerRequest.findOneAndUpdate(
      { memberName },
      { memberName, request, isAnonymous },
      { new: true }
    );
    if (!prayerRequest) {
      return res.status(404).json({ message: "Prayer request not found" });
    }
    res.json({ message: "Prayer request updated successfully", prayerRequest });
  } catch (error) {
    res.status(400).json({ message: "Error updating prayer request", error });
  }
};

// Delete a prayer request
exports.deletePrayerRequest = async (req, res) => {
  try {
    const { memberName } = req.params;
    const prayerRequest = await PrayerRequest.findOneAndDelete({ memberName });
    if (!prayerRequest) {
      return res.status(404).json({ message: "Prayer request not found" });
    }
    res.json({ message: "Prayer request deleted successfully", prayerRequest });
  } catch (error) {
    res.status(400).json({ message: "Error deleting prayer request", error });
  }
};

// Get a prayer request by member name
exports.getPrayerRequest = async (req, res) => {
  try {
    const { memberName } = req.params;
    const prayerRequest = await PrayerRequest.findOne({ memberName });
    if (!prayerRequest) {
      return res.status(404).json({ message: "Prayer request not found" });
    }
    res.json({ prayerRequest });
  } catch (error) {
    res.status(400).json({ message: "Error fetching prayer request", error });
  }
};

// Get all prayer requests
exports.getAllPrayerRequests = async (req, res) => {
  try {
    const prayerRequests = await PrayerRequest.find();
    res.json({ prayerRequests });
  } catch (error) {
    res.status(400).json({ message: "Error fetching prayer requests", error });
  }
};
