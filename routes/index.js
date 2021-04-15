///////////////////////////////
// Import Router
////////////////////////////////
const express = require("express")
const router = express.Router()
const indexCtrl = require("../controllers/index")

///////////////////////////////
// Router Specific Middleware
////////////////////////////////

///////////////////////////////
// Router Routes
////////////////////////////////

// AUTH related routes

//Signup routes
router.get("/auth/signup", (req, res) => {
    res.send("signup get")
})

router.post("/auth/signup", (req, res) => {
    res.send("signup post")
})

//Login routes
router.get("/auth/login", (req, res) => {
    res.send("login get")
})

router.post("/auth/login", (req, res) => {
    res.send("login post")
})

// Logout route
router.get("/auth/logout", (req, res) => {
    res.send("logout")
})

/// NORMAL routes

router.get("/", (req, res) => {
    res.render("index")
})

///////////////////////////////
// Export Router
////////////////////////////////
module.exports = router