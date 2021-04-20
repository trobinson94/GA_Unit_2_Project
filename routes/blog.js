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

router.use(addUserToRequest)

///////////////////////////////
// Router Routes
////////////////////////////////

// Index

// If No user logged in
router.get("/", (req, res) => {
    res.render("homeOut")
})

// If User is logged in
router.get("/home", isAuthorized, async (req, res) => {
    // get updated user
    const user = await User.findOne({ username: req.user.username })
    // render template passing it list of goals
    res.render("homeIn", {
        blogs: user.blogs,
    })
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
            const result = await bcrypt.compare(req.body.password, user.password)
            if (result) {
                // creat user session property
                req.session.userId = user._id
                // redirect to /homeIn 
                res.redirect("/blogs/home")
            } else {
                // send error if password doesnt match
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

// View all blog posts
router.get("/index" , isAuthorized, async (req,res) => {
    const user = await User.findOne({ username: req.user.username })
    res.render("blogs/index", {
        blogs: user.blogs,
    })

})

// New
router.get("/new", isAuthorized, (req, res) => {
    res.render("blogs/new")
})

// Delete
router.delete("/:id", isAuthorized, async (req, res) => {
    const user = await User.findOne({ username: req.user.username })
    const id = req.params.id
    const index = req.user.blogs.findIndex((blog) => `${blog._id}` === id)
    req.user.blogs.splice(index, 1)
    req.user.save()
    res.redirect("/blogs/index")
})

// Update
router.put("/:id", isAuthorized, async (req, res) => {
    const user = await User.findOne({ username: req.user.username })
    const id = req.params.id
    const index = req.user.blogs.findIndex((blog) => `${blog._id}` === id)
    req.user.blogs[index].title = req.body.title
    req.user.blogs[index].body = req.body.body
    req.user.save()
    res.redirect(`/blogs/${id}`)
})

// Create
router.post("/", isAuthorized,  async (req, res) => {
    // fetch up to date user
    const user = await User.findOne({ username: req.user.username })
    // push new blog and save
    user.blogs.push(req.body)
    await user.save()
    //redirect back to home page
    res.redirect("blogs/home")
})

// Edit
router.get("/:id/edit", isAuthorized, async (req, res) => {
    const user = await User.findOne({ username: req.user.username })
    const id = req.params.id
    const index = req.user.blogs.findIndex((blog) => `${blog._id}` === id)
    const blog = req.user.blogs[index]
    console.log(blog)
    res.render("blogs/edit", {
        blog
    })
})

// Show (HomeIn)
router.get("/:id", isAuthorized, async (req, res) => {
    const user = await User.findOne({ username: req.user.username })
    const id = req.params.id
    const index = req.user.blogs.findIndex((blog) => `${blog._id}` === id)
    const blog = req.user.blogs[index]
    console.log(blog)
    res.render("blogs/show", {
        blog
    })
})

///////////////////////////////
// Export Router
////////////////////////////////
module.exports = router