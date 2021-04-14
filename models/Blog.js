// Import Schema and Model
const { Schema, model } = require("../db/connection")

// The User Schema
const UserSchema = new Schema (
    {
        username: { type: String, unique: true, required: true },
        password: { type: String}
    }
)

// The Blog Schema

// The User Model

// Export the User Model