var express = require("express"),
    Pokemon = require("../models/pokemon"),
    Comment = require("../models/comments"),
    middleware = require("../middleware"),
    router  = express.Router({mergeParams: true});

//New Comment Route
router.get("/new", middleware.isLoggedIn, function(req,res){
    Pokemon.findById(req.params.id, function(err, foundPokemon){
        if(err)
            console.log(err);
        else{
            res.render("comments/new", {pokemon: foundPokemon});
        }
    });
 });

 //Create Comment Route
 router.post("/", middleware.isLoggedIn, function(req, res){
    Pokemon.findById(req.params.id, function(err, foundPokemon){
        if(err){
            console.log(err);
            res.redirect("/index");
        }
        else{
            Comment.create(req.body.comment, function(err, newComment){
                if(err){
                    req.flash("error", "Something went wrong");
                    console.log(err);
                }
                else{
                    newComment.author.id = req.user._id;
                    newComment.author.username = req.user.username;
                    newComment.save();
                    foundPokemon.comments.push(newComment);
                    foundPokemon.save();
                    req.flash("Successfully added comment");
                    res.redirect("/index/"+foundPokemon._id);
                }
            })
        }
    })
 })

 //Edit Route
 router.get("/:comment_id/edit", middleware.checkCommentOwner, function(req, res){
    Comment.findById(req.params.comment_id, function(err, foundComment){
        if(err)
            res.redirect("back");
        else{
            res.render("comments/edit", {pokemon_id: req.params.id, comment: foundComment});
        }
    })
});

 //Update Route
 router.put("/:comment_id", middleware.checkCommentOwner, function(req, res){
     Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
         if(err)
            res.redirect("back");
         else{
             req.flash("success", "Updated Comment");
             res.redirect("/index/"+req.params.id);
         }
     });
 });

 //Destroy Route
 router.delete("/:comment_id", middleware.checkCommentOwner, function(req, res){
     Comment.findByIdAndRemove(req.params.comment_id, function(err){
         if(err)
            res.redirect("back");
         else{
            req.flash("success", "Comment Deleted"); 
            res.redirect("/index/"+req.params.id);
         }
            
     })
 })

 module.exports = router;