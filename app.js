var express    = require("express"),
    app        = express(),
    bodyParser = require("body-parser"),
    mongoose   = require("mongoose"),
    Campground = require("./models/campground"),
    seedDB      = require("./seeds");
    

    
    
    
    //CREATE DATABASE yelp_camp
seedDB();
mongoose.connect("mongodb://localhost/yelp_camp");
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));





    //ROUTES SET UP
    //INDEX - show all campgrounds
app.get("/", function(req, res){
   res.render("landing");
});

app.get("/campgrounds", function(req, res){
    //GET CAMPGROUNS FROM DB
    Campground.find({}, function(err, allCampgrounds){
      if(err){
          console.log(err);
      }  else {
         res.render("index", {campgrounds: allCampgrounds});
      }
    });
    
});


   //CREATE - add new campgrounds to DB
app.post("/campgrounds", function(req, res){
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
app.get("/campgrounds/new", function(req, res){
    res.render("new");
});
    //show more info about campground
app.get("/campgrounds/:id", function(req, res){
    //Find the campground with provided ID
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if(err){
            console.log(err);
        } else {
            console.log(foundCampground);
    //render show template with that campground
            res.render("show", {campground: foundCampground});
        }
    });
    
});

    //START THE SERVER

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("The YelpCamp server has started!");
});