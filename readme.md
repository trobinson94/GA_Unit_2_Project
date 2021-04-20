# BlogSpec

## Blogging App

- BlogSec is an app created to function as a blogging website, similar to BlogSpot. Users can create new posts, edit, and delete posts they no longer need. Users can create new profiles, login and view their own personal blogs posts. 

## Technologies Used

- Express / EJS / Node.js

- MongoDB / Mongoose 

- Hosted on Heroku

## How to use app

- -clone with command `npx degit githubusername/githubreponame#branchname projectName`

- cd into new project folder

- run `npm install` to install dependencies

- create .env

- include your MONGODB_URL with a working Mongo URL

- run http://localhost:3000/ in your browser

- enjoy!

- Blocsec can also be viewed [here](https://blogspec.herokuapp.com/)

## Roadblocks along the way

- sucessfully creating routes to two different home pages depending on if a user is logged in or not

- accessing the blog posts within each user object in order to display them on the page