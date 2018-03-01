// all the middleware goes here
var middlewareObj = {};
var Campground = require("../models/campground");
var Comment = require("../models/comment");

middlewareObj.checkCampgroundOwnership = function(req, res, next) {
    if(req.isAuthenticated()){
        Campground.findById(req.params.id, function(err, foundCampground){
            if(err){
                res.redirect("back");
            } else {
                //foundCampground.author.id <-- mongoose object
                //req.user._id <-- sring
                
                 //does user own campground
                 //mongoose method to compare .equals()
                 if(foundCampground.author.id.equals(req.user._id)){
                    next();
                 } else {
                     res.redirect("back");
                 }
            }
        });
    } else {
        res.redirect("back");
    }
};

 middlewareObj.checkCommentOwnership = function(req, res, next) {
    if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id, function(err, foundComment){
            if(err){
                res.redirect("back");
            } else {
                //is user the owner of comment
                 if(foundComment.author.id.equals(req.user._id)){
                    next();
                 } else {
                     res.redirect("back");
                 }
            }
        });
    } else {
        res.redirect("back");
    }
};

middlewareObj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
};


module.exports = middlewareObj;