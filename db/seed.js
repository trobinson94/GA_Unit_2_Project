//Import The Database Connection
const mongoose = require("./connection");

///////////////////////////////////////////
// IMPORT YOUR MODELS BELOW
///////////////////////////////////////////

const Blog = require("../models/blog")

///////////////////////////////////////////
// DO YOUR DATABASE OPERATIONS IN BELOW FUNCTION
///////////////////////////////////////////

const seed = async () => {
  // Drop the Database before seeding
  mongoose.connection.db.dropDatabase();

  //*********Code Goes Here
    const blogs = await Blog.create([
      {title: "My first post", body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent sagittis turpis et elit luctus, ut bibendum odio ullamcorper. Vestibulum vehicula pretium tempor. Sed rhoncus rutrum libero quis tincidunt. Nam non lectus nisi. Mauris magna eros, dignissim ut nisi non, tempus dapibus tortor. Sed in diam in sapien malesuada iaculis vitae ac ligula. Nullam lacinia non arcu quis facilisis."},
      {title: "Post 2", body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent sagittis turpis et elit luctus, ut bibendum odio ullamcorper. Vestibulum vehicula pretium tempor. Sed rhoncus rutrum libero quis tincidunt. Nam non lectus nisi. Mauris magna eros, dignissim ut nisi non, tempus dapibus tortor. Sed in diam in sapien malesuada iaculis vitae ac ligula. Nullam lacinia non arcu quis facilisis."},
      {title: "Post 3", body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent sagittis turpis et elit luctus, ut bibendum odio ullamcorper. Vestibulum vehicula pretium tempor. Sed rhoncus rutrum libero quis tincidunt. Nam non lectus nisi. Mauris magna eros, dignissim ut nisi non, tempus dapibus tortor. Sed in diam in sapien malesuada iaculis vitae ac ligula. Nullam lacinia non arcu quis facilisis."}
    ])

  //***************************** */

  mongoose.disconnect();
};

// Wait for the DB Connection to be Established
mongoose.connection.on("open", () => {
  // Run Seed Function
  seed();
});
