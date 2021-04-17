/////////////////////////
// import models
/////////////////////////
const express = require("express")
const router = express.Router()
const Blog = require("../models/blog")

/////////////////////////
// controller functions
/////////////////////////

// Index: Home page
const home = async (req, res) => {
    res.render("homeIn")
}

// New blog post
const newBlog = async (req, res) => {
    res.render("views/blogs/new.ejs")
}

// Delete Blog


// Update Blog post


// Create: Create a new blog post
const create = async (req, res) => {
    // create neew item
    await Blog.create(req.body)
    // res.render("create")
    res.send(req.body)
}

// Show: Shows blog post

module.exports = {
    home,
    newBlog,
    create,
}