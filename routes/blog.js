///////////////////////////////
// Import Router
////////////////////////////////
const { render } = require("ejs")
const express = require("express")
const router = express.Router()
const BlogsCtrl = require("../controllers/blogs")

///////////////////////////////
// Router Specific Middleware
////////////////////////////////

///////////////////////////////
// Router Routes
////////////////////////////////

// Index
router.get("/", BlogsCtrl.home)

// New
router.get("/new", (req, res) => {
    res.render("blogs/new")
})

// Delete
router.delete("/blogs/:id", (req, res) => {
    res.render("index")
})

// Update
router.put("/blogs/:id", (req, res) => {
    res.render("index")
})

// Create
router.post("/", BlogsCtrl.create)

// Show
router.get("/", (req, res) => {
    res.render("index")
})

///////////////////////////////
// Export Router
////////////////////////////////
module.exports = router