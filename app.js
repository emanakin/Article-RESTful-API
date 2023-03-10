//  requirements
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const ejs = require("ejs");

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static("public"));

// connection to MongoDB
mongoose.connect("mongodb://localhost:27017/wikiDB", {useNewUrlParser: true});

//  schema for the docuemnts
const articleSchema = {
    title: String,
    content: String
};

// documents
const Article = mongoose.model("Article", articleSchema);

app.route("/articles")
// the /articles route
.get(function(req, res){

    // find all articles
    Article.find(function(err, foundArticles){

        // in the case no of error
        if (!err){
            res.send(foundArticles);
        }
    });
})
// recieving post request from route /articles
.post(function(req, res){

    // creates article object based on post req
    const newArticle = new Article({
        title: req.body.title,
        content: req.body.content
    });

    // saves article and error detection
    newArticle.save(function(err){
        if (!err){
            res.send("Sucessfully added new article");
        } else {
            res.send(err);
        }
    });
})
// handels delete req
.delete(function(req, res){

    // error handeling
    Article.deleteMany(function(err){
        if (!err){
            res.send("Sucessfully deleted all articles");
        } else {
            res.send(err);
        }
    });
});

///////////////////////////////////////////////// REQUEST TARGETING A SPECIFIC ARTICLE //////////////////////////////////////// 

app.route("/articles/:articleTitle")
// the /articles/articletitle route
.get(function(req, res){

    // find all articles
    Article.findOne({title: req.params.articleTitle}, function(err, foundArticle){

        // in the case no of error
        if (foundArticle){
            res.send(foundArticle);
        } else {
            res.send("No articles matching");
        }
    });
})

// put request
.put(function(req, res){
    Article.update(
        {title: req.params.articleTitle},
        {title: req.body.title, content: req.body.content},
        {overwrite: true}, 
        function(err){
            if (!err) {
                res.send("sucessfully updated article");
            }
        }
        );
})

// patch request
.patch(function(req, res){
    Article.update(
        {title: req.params.articleTitle},
        {$set: req.body},
        function(err){
            if (!err) {
                res.send("sucessfully updated article");
            } else {
                res.send(err);
            }
        }
        );
})

// delete request
.delete(function(req, res){
    Article.deleteOne(
        {title: req.params.articleTitle},
        function(err){
            if (!err) {
                res.send("sucessfully deleted article");
            } else {
                res.send(err);
            }
        });
});

app.listen(3000, function(){
    console.log("Server started on port 3000");
});