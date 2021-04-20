// Import Schema and Model
const { Schema, model } = require("../db/connection")

// The Blog Schema
const Blog = new Schema (
    {
        title: { type: String, required: true },
        body: { type: String, required: true }
    }, 
    { timestamps: true }
)

// The User Schema
const UserSchema = new Schema (
    {
        username: { type: String, unique: true, required: true },
        password: { type: String , required: true },
        blogs: [Blog],
    }
)

// The User Model

const User = model("User", UserSchema)

// Export the User Model
module.exports = User
