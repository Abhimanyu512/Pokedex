var express  = require("express"),
    passport = require("passport"),
    Pokemon  = require("../models/pokemon"),
    Comment  = require("../models/comments"),
    User     = require("../models/user"),
    router   = express.Router();

//Root Route
router.get("/", function (req, res) {
    res.render("landing");
});
 
 //Register Routes
 router.get("/register", function(req, res){
    res.render("register");
});

router.post("/register", function(req, res){
   var newUser = new User({username: req.body.username});
   User.register(newUser, req.body.password, function(err, user){
       if(err){
           req.flash("error", err.message);
           return res.render("register");
       } else {
          passport.authenticate("local")(req, res, function(){
            req.flash("success", "Welcome to the Pokedex " + user.username);
            res.redirect("/index");
          });
       }
   });
});

//Login Routes
router.get("/login", function(req, res){
   res.render("login");
});

router.post("/login", passport.authenticate("local", {
    successRedirect: "/index",
    failureRedirect: "/login" 
   }),function(req, res){
       console.log("Authentication was successful");
   });

//Logout Routes
router.get("/logout", function(req, res){
    req.logout();
    req.flash("success", "Logged You Out");
    res.redirect("/index");
})

module.exports = router;