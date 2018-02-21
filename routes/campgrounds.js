var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");
    
    
    // MAIN ROUTES
    
    
    //INDEX - show all campgrounds

router.get("/", function(req, res){
    //GET CAMPGROUNDS FROM DB
    Campground.find({}, function(err, allCampgrounds){
      if(err){
          console.log(err);
      }  else {
         res.render("campgrounds/index", {campgrounds: allCampgrounds});
      }
    });
    
});


   //CREATE - add new campgrounds to DB
router.post("/", function(req, res){
    //GET DATA FROM FORM
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    //CREATE CAMPGROUND OBJECT
    var newCampground = {name:name, image: image, description: desc};
    //CREATE A NEW CAAMPGROUND AND SAVE TO DB
    Campground.create(newCampground, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
    //REDIRECT BACK TO CAMPGROUNDS PAGE
            res.redirect("/campgrounds");
        }
    });
});


    //NEW - show form to create a new campground
router.get("/new", function(req, res){
    res.render("campgrounds/new");
});
    //show more info about campground
router.get("/:id", function(req, res){
    //Find the campground with provided ID
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if(err){
            console.log(err);
        } else {
    //render show template with that campground
            res.render("campgrounds/show", {campground: foundCampground});
        }
    });
    
});

module.exports = router;
