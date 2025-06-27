const cors = require("cors");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const User = require("../models/user.model");

//create user
exports.createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = new User({ name, email, password });
    await user.save();
    res.status(201).json({ message: "User created successfully", user });
  } catch (error) {
    res.status(400).json({ message: "Error creating user", error });
  }
};

//update user
exports.updateUser = async (req, res) => {
  try {
    const { name } = req.params;
    const { email, password } = req.body;
    const user = await User.findOneAndUpdate(
      { name },
      { email, password },
      { new: true }
    );
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User updated successfully", user });
    revalidateUserCache(user.name);
  } catch (error) {
    res.status(400).json({ message: "Error updating user", error });
  }
};

//delete user
exports.deleteUser = async (req, res) => {
  try {
    const { name } = req.params;
    const user = await User.findOneAndDelete({ name });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User deleted successfully" });
    revalidateUserCache(user.name);
  } catch (error) {
    res.status(400).json({ message: "Error deleting user", error });
  }
};

//get one user
exports.getUser = async (req, res) => {
  try {
    const { name } = req.params;
    const user = await User.findOne({ name });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User retrieved successfully", user });
  } catch (error) {
    res.status(400).json({ message: "Error retrieving user", error });
  }
};
// get all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({ message: "Users retrieved successfully", users });
  } catch (error) {
    res.status(400).json({ message: "Error retrieving users", error });
  }
};
