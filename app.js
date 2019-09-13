 //Requiring Modules 
 var express       = require("express"),
     app           = express(),
     bodyParser    = require("body-parser"),
     methodOverride= require("method-override"),
     mongoose      = require("mongoose"),
     flash         = require("connect-flash"), 
     passport      = require("passport"),
     LocalStrategy = require("passport-local"),
     User          = require("./models/user.js"),
     Pokemon       = require("./models/pokemon.js"),
     Comment       = require("./models/comments.js"),
     seedDB        = require("./seeds.js");

//Requiring Routes
var pokemonRoutes  = require("./routes/pokemon"),
    commentRoutes  = require("./routes/comments"),
    indexRoutes    = require("./routes/index");

 //Setting Up Server
 //seedDB(); //seeding the  database
 mongoose.connect("mongodb://localhost/pokedb");
 app.set("view engine", "ejs");
 app.use(bodyParser.urlencoded({extended: true}));
 app.use(express.static(__dirname + "/public"));
 app.use(methodOverride("_method"));
 app.use(flash());

 //Passport Config
 app.use(require("express-session")({
     secret: "Gaben makes me lose, doesnt give me rank",
     resave: false,
     saveUninitialized: false
 }));
 app.use(passport.initialize());
 app.use(passport.session());
 passport.use(new LocalStrategy(User.authenticate()));
 passport.serializeUser(User.serializeUser());
 passport.deserializeUser(User.deserializeUser());
 app.use(function(req, res, next){
     res.locals.currentUser = req.user;
     res.locals.error = req.flash("error");
     res.locals.success = req.flash("success");
     next();
 });

 //Route Config
 app.use(indexRoutes);
 app.use("/index", pokemonRoutes);
 app.use("/index/:id/comments", commentRoutes);

 //Starting the Server
 app.listen(3000, function () {
     console.log("The Server has started");
 });
