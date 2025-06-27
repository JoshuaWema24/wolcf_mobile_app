const express = require('express');
const mongoose = require('mongoose');
const testimonySchema = require('../models/testimonies.models');

//create testimony
exports.createTestimony = async (req, res) => {
    try {
        const { username, content, mediaUrl } = req.body;
        if (!content) {
            return res.status(400).json({ message: 'Content is required' });
        }
        const newTestimony = new testimonySchema({
            username: mongoose.Types.ObjectId(username),
            content,
            mediaUrl,
        });
        const savedTestimony = await newTestimony.save();
        res.status(200).json({ 
            message: 'testimony created successfully'
        })
        revalidateTestimonyCache(savedTestimony._id.toString());
    } catch (error) {
        res.status(400).json({ message: 'error creating testimony', error });
    }
};

//delete testimony
exports.deleteTestimony = async (req, res) => {
    try {
        const { testimonyId } = req.params;
        const deletedTestimony = await testimonySchema.findByIdAndDelete(testimonyId);
        if (!deletedTestimony) {
            return res.status(404).json({ message: 'Testimony not found' });
        }
        res.status(200).json({ message: 'Testimony deleted successfully' });
        revalidateTestimonyCache(testimonyId);
    } catch (error) {
        res.status(400).json({ message: 'Error deleting testimony', error });
    }
};

//get one testimony
exports.getTestimony = async (req, res) => {
    try {
        const { testimonyId } = req.params;
        const testimony = await testimonySchema.findById(testimonyId);
        if (!testimony) {
            return res.status(404).json({ message: 'Testimony not found' });
        }
        res.status(200).json(testimony);
    } catch (error) {
        res.status(400).json({ message: 'Error fetching testimony', error });
    }
};

//get all testimonies
exports.getTestimonies = async (req, res) => {
    try {
        const testimonies = await testimonySchema.find();
        res.status(200).json(testimonies);
    } catch (error) {
        res.status(400).json({ message: 'Error fetching testimonies', error });
    }
};