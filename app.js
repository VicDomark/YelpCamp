var express = require("express");
var app = express();
var bodyParser = require("body-parser");

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));

var campgrounds = [
        {name: "Salmon Creek", image:"https://farm2.staticflickr.com/1363/1342367857_2fd12531e7.jpg"},
        {name: "Granite Hill", image:"https://farm3.staticflickr.com/2116/2164766085_0229ac3f08.jpg"},
        {name: "Mountain Goats Rest", image:"https://farm2.staticflickr.com/1274/4670974422_ec49d65ab2.jpg"},
        {name: "Salmon Creek", image:"https://farm2.staticflickr.com/1363/1342367857_2fd12531e7.jpg"},
        {name: "Granite Hill", image:"https://farm3.staticflickr.com/2116/2164766085_0229ac3f08.jpg"},
        {name: "Mountain Goats Rest", image:"https://farm2.staticflickr.com/1274/4670974422_ec49d65ab2.jpg"},
        {name: "Salmon Creek", image:"https://farm2.staticflickr.com/1363/1342367857_2fd12531e7.jpg"},
        {name: "Granite Hill", image:"https://farm3.staticflickr.com/2116/2164766085_0229ac3f08.jpg"},
        {name: "Mountain Goats Rest", image:"https://farm2.staticflickr.com/1274/4670974422_ec49d65ab2.jpg"}
    ];

app.get("/", function(req, res){
   res.render("landing");
});

app.get("/campgrounds", function(req, res){
    
    res.render("campgrounds", {campgrounds: campgrounds});
});

app.post("/campgrounds", function(req, res){
    var name = req.body.name;
    var image = req.body.image;
    var newCampground = {name:name, image: image};
    campgrounds.push(newCampground);
    res.redirect("/campgrounds");
});

app.get("/campgrounds/new", function(req, res){
    res.render("new");
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("The YelpCamp server has started!");
});
