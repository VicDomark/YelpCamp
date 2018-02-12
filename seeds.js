var mongoose = require("mongoose"),
    Campground = require("./models/campground"),
    Comment = require("./models/comment")
    
var data = [
    {
        name: "Cloud's Rest",
        image: "https://www.w3schools.com/howto/img_fjords.jpg",
        description: "bla bla bla"
    },
    {
        name: "LalaLand",
        image: "https://cloud.netlifyusercontent.com/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/68dd54ca-60cf-4ef7-898b-26d7cbe48ec7/10-dithering-opt.jpg",
        description: "bla bla bla"
    },
    {
        name: "Golden Bridge",
        image: "http://lokeshdhakar.com/projects/lightbox2/images/image-3.jpg",
        description: "bla bla bla"
    },
    
];
    
function seedDB(){
    //Remove all campgrounds
    Campground.remove({}, function(err){
        if(err){
            console.log(err);
        } else {
        console.log("removed campgrounds"); 
        //add a few campgrounds
        data.forEach(function(seed){
            Campground.create(seed, function(err, campground){
                if(err){
                    console.log(err);
                } else {
                    console.log("added a campground");
                    //create a comment for each campground
                    Comment.create(
                        {
                            text: "This place is great, but I wish there was internet",
                            author: "Homer"
                        }, function(err, comment){
                            if(err){
                                console.log(err);
                            } else{
                            campground.comments.push(comment);
                            campground.save();
                            console.log("created new comment")
                        }
                    })
                }
            });
        });
        }
    });
}
   
    
    //add a few comments

module.exports = seedDB;