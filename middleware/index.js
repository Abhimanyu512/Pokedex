var Pokemon = require("../models/pokemon");
var Comment = require("../models/comments");
var middlewareObj = {}

middlewareObj.checkUser = function (req, res, next) {
    if (req.isAuthenticated()) {
        Pokemon.findById(req.params.id, function (err, foundPokemon) {
            if (err)
                console.log(err);
            else {
                if (foundPokemon.author.id.equals(req.user._id))
                    next();
                else {
                    res.redirect("back");
                }
            }
        });
    } else {
        req.flash("error", "You dont have permission to do that");
        res.redirect("back");
    }
};

middlewareObj.checkCommentOwner = function (req, res, next) {
    if (req.isAuthenticated()) {
        Comment.findById(req.params.comment_id, function (err, foundComment) {
            if (err){
                req.flash("error", "Pokemon not found");
                console.log(err);
            }
            else {
                if (foundComment.author.id.equals(req.user._id))
                    next();
                else {
                    req.flash("error", "You dont have permission to do that");
                    res.redirect("back");
                } 
            }
        });
    } else {
        req.flash("error", "You need to be logged in to do that");
        res.redirect("back");
    }
}

middlewareObj.isLoggedIn = function (req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    req.flash("error", "You need to be logged in to do that");
    res.redirect("/login");
}

module.exports = middlewareObj;