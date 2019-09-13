var mongoose = require("mongoose");

var pokedexSchema = new mongoose.Schema({
    name: String,
    image: String,
    type: String,
    description: String,
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    },
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment"
    }]
});

module.exports = mongoose.model("Pokemon", pokedexSchema);
