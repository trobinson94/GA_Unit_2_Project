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

// Create: Create a new blog post
const create = async (req, res) => {
    res.render("create")
}

module.exports = {
    home,
    create,
}