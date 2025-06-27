const blogmodel = require("../models/blog.model");
const mongoose = require("mongoose");

// Create blog
exports.createBlog = async (req, res) => {
  try {
    const { title, content } = req.body;
    const blog = new blogmodel({ title, content });
    await blog.save();
    res.status(201).json({ message: "Blog created successfully", blog });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error creating blog", error: error.message });
  }
};

// Update blog by ID
exports.updateBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;

    const blog = await blogmodel.findByIdAndUpdate(
      id,
      { title, content },
      { new: true }
    );

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    res.status(200).json({ message: "Blog updated successfully", blog });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error updating blog", error: error.message });
  }
};

// Delete blog by ID
exports.deleteBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await blogmodel.findByIdAndDelete(id);

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    res.status(200).json({ message: "Blog deleted successfully" });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error deleting blog", error: error.message });
  }
};

// Get one blog by ID
exports.getBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await blogmodel.findById(id);

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    res.status(200).json({ message: "Blog retrieved successfully", blog });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error retrieving blog", error: error.message });
  }
};

// Get all blogs
exports.getAllBlogs = async (req, res) => {
  try {
    const blogs = await blogmodel.find();
    res.status(200).json({ message: "Blogs retrieved successfully", blogs });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error retrieving blogs", error: error.message });
  }
};

// Middleware to validate blog input
exports.validateBlogInput = (req, res, next) => {
  const { title, content } = req.body;
  if (!title || typeof title !== "string" || !title.trim()) {
    return res
      .status(400)
      .json({ message: "Title is required and must be a non-empty string" });
  }
  if (!content || typeof content !== "string" || !content.trim()) {
    return res
      .status(400)
      .json({ message: "Content is required and must be a non-empty string" });
  }
  next();
};
