const mongoose = require('mongoose');
const devotionals = require('../models/devotionals.model.js');
const express = require('express');

// Create a new devotional
exports.createDevotional = async (req, res) => {
    try {
        const { title, content } = req.body;
        if (!title) {
            return res.status(400).json({ message: 'Title are required' });
        }
        if (!content) {
            return res.status(400).json({ message: 'Content is required' });
        }
        const newDevotional = new devotionals({
            title,
            content,
        });
        const savedDevotional = await newDevotional.save();
        res.status(201).json({ message: 'Devotional created successfully', devotional: savedDevotional });
    } catch (error) {
        res.status(500).json({ message: 'Error creating devotional', error });
    }
};

// delete a devotional
exports.deleteDevotional = async (req, res) => {
    try {
        const { devotionalId } = req.params;
        const deletedDevotional = await devotionals.findByIdAndDelete(devotionalId);
        if (!deletedDevotional) {
            return res.status(404).json({ message: 'Devotional not found' });
        }
        res.status(200).json({ message: 'Devotional deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting devotional', error });
    }
};
 
// get a devotional
exports.getDevotional = async (req, res) => {
    try {
        const { devotionalId } = req.params;
        const devotional = await devotionals.findById(devotionalId);
        if (!devotional) {
            return res.status(404).json({ message: 'Devotional not found' });
        }
        res.status(200).json(devotional);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching devotional', error });
    }
};

// get all devotionals
exports.getAllDevotionals = async (req, res) => {
    try {
        const devotionalsList = await devotionals.find();
        res.status(200).json(devotionalsList);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching devotionals', error });
    }
}; 