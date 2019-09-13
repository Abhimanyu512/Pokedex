var express    = require("express"),
    Pokemon    = require("../models/pokemon"),
    Comment    = require("../models/comments"),
    middleware = require("../middleware"),
    router     = express.Router();

//Index Route
router.get("/", function (req, res) {     
    Pokemon.find({}, function(err,allPokemon){
        if(err)
           console.log(err);
        else
           res.render("pokemon/index", {pokemon: allPokemon});   
    });
});

//Create Route
router.post("/", middleware.isLoggedIn, function(req,res){
   var name = req.body.name;
   var image = req.body.image;
   var type = req.body.type;
   var desc = req.body.desc;
   var author = {
       id: req.user._id,
       username: req.user.username
   };
   var newPokemon = {
       name: name,
       image: image,
       type: type,
       description: desc,
       author: author
   };
   Pokemon.create(newPokemon,function(err,newPokemon){
       if(err)
           console.log(err);
       else
           res.redirect("/index");
       });
});

//New Route
router.get("/new", middleware.isLoggedIn, function(req,res){
   res.render("pokemon/new");
});

//Show Route
router.get("/:id",function(req,res){
    Pokemon.findById(req.params.id).populate("comments").exec(function(err, foundPokemon){
       if(err)
           console.log(err);
       else
       {
           res.render("pokemon/show", {pokemon: foundPokemon});
       }    
    });
});

 //Edit Route
    router.get("/:id/edit", middleware.checkUser, function(req, res){
        Pokemon.findById(req.params.id, function(err, foundPokemon){
            res.render("pokemon/edit", {pokemon: foundPokemon});
        });
    });

 //Update Route
    router.put("/:id", middleware.checkUser, function(req, res){
        Pokemon.findByIdAndUpdate(req.params.id, req.body.pokemon, function(err, updatedPokemon){
            if(err){
                console.log("err");
            }
            else{
                req.flash("success", "Updated Pokemon");
                res.redirect("/index/"+req.params.id);
            }
        })
    })

 //Destroy Route
    router.delete("/:id", function(req, res){
        Pokemon.findByIdAndRemove(req.params.id, middleware.checkUser, function(err){
            if(err){
                console.log(err);
                res.redirect("/index");
            }
            else{
                req.flash("Deleted Pokemon");
                res.redirect("/index");
            }
        });
    });

 //Middleware
 function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
       return next();
    }
    res.redirect("/login");   
}

module.exports = router;