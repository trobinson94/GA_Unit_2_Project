///////////////////////////////
// Import Router
////////////////////////////////
const { render } = require("ejs")
const express = require("express")
const router = express.Router()
const bcrypt = require("bcryptjs")
const User = require("../models/blog")

///////////////////////////////
// Custom Middleware Functions
////////////////////////////////

// Middleware to check if userId is in sessions and create req.user
const addUserToRequest = async (req, res, next) => {
    // check if user is logged in
    if (req.session.userId) {
        req.user = await User.findById(req.session.userId)
        next()
    } else {
        next()
    }
}

// checks if req.user exists, if not, redirect to login
const isAuthorized = (req, res, next) => {
    if (req.user) {
        next()
    } else {
        res.redirect("/auth/login")
    }
}


///////////////////////////////
// Router Specific Middleware
////////////////////////////////

///////////////////////////////
// Router Routes
////////////////////////////////

// Index
router.get("/", (req, res) => {
    res.render("homeIn")
})

// AUTH related routes

//Signup routes
router.get("/auth/signup", (req, res) => {
    res.render("auth/signup")
})

router.post("/auth/signup", async (req, res) => {
    try {
        // generate salt for hashing
        const salt = await bcrypt.genSalt(10)
        // has the password
        req.body.password = await bcrypt.hash(req.body.password, salt)
        console.log(req.body)
        // Create the user
        await User.create(req.body)
        // Redirect to login page 
        res.redirect("/auth/login")
    } catch (error) {
        res.json(error)
    }
})

//Login routes
router.get("/auth/login", (req, res) => {
    res.render("auth/login")
})

router.post("/auth/login", async (req, res) => {
    try {
        // check if user exists
        const user = await User.findOne({ username: req.body.username })
        if (user) {
            // check if passwords match
            console.count()
            const result = await bcrypt.compare(req.body.password, user.password)
            if (result) {
                // creat user session property
                console.count() 
                req.session.userId = user._id
                // redirect to /homeIn
                console.count() 
                res.redirect("homeIn")
            } else {
                // send error if password doesnt match
                console.count() 
                res.json({ error: "Passwords do not match. Please try again"})
            }
        } else {
            // send error if user does not exist
            console.count() 
            res.json({ error: "User does not exist. Please try again"})
        }
    } catch (error) {
        res.json(error)
    }
})

// Logout route
router.get("/auth/logout", (req, res) => {
    // remove the userId property from the session
    req.session.userId = null
    // redirect back to main page
    res.redirect("homeOut")
})

////////////////////////////
// Blog Routes
///////////////////////////

// New
router.get("/new", (req, res) => {
    res.render("blogs/new")
})

// Delete
router.delete("/:id", (req, res) => {
    res.render("index")
})

// Update
router.put("/blogs/:id", (req, res) => {
    res.render("index")
})

// Create
router.post("/", async (req, res) => {
    // create neew item
    await Blog.create(req.body)
    // res.render("create")
    res.send(req.body)
})

// Show
router.get("/", (req, res) => {
    res.render("index")
})

///////////////////////////////
// Export Router
////////////////////////////////
module.exports = router