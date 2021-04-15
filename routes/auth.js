///////////////////////////////
// Import Router
////////////////////////////////
const express = require("express")
const router = express.Router()
const indexCtrl = require("../controllers/blogs")

///////////////////////////////
//  Routes
////////////////////////////////

// AUTH related routes

//Signup routes
router.get("/signup", (req, res) => {
    res.send("signup get")
})

router.post("/signup", (req, res) => {
    res.send("signup post")
})

//Login routes
router.get("/login", (req, res) => {
    res.send("login get")
})

router.post("/login", (req, res) => {
    res.send("login post")
})

// Logout route
router.get("/logout", (req, res) => {
    res.send("logout")
})

///////////////////////////////
// Export Router
////////////////////////////////
module.exports = router