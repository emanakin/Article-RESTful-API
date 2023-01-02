# Article-RESTful-API

This is a Node.js server using the Express.js framework and Mongoose ODM to connect to a MongoDB database. It listens for HTTP requests on port 3000 and defines the following routes for interacting with the database:

/articles
GET
Returns a list of all articles in the database.

POST
Creates a new article with the title and content specified in the request body.

DELETE
Deletes all articles from the database.

/articles/:articleTitle
GET
Returns the article with the specified title.

PUT
Updates the article with the specified title with new title and content specified in the request body.

PATCH
Updates the article with the specified title with new fields specified in the request body.

DELETE
Deletes the article with the specified title.

Requirements
Node.js
Express.js
MongoDB
Mongoose
Usage
Clone this repository and navigate to the directory.
Run npm install to install the required dependencies.
Start the MongoDB server.
Run node app.js to start the server.
Use the routes described above to interact with the server and the database.
