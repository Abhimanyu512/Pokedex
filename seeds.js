 var mongoose = require("mongoose"),
 Comment = require("./models/comments.js"),
 Pokemon = require("./models/pokemon.js");
 
 var data = [
     {
        name: "Squirtle",
        image: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/007.png",
        type: "Water",
        description: "Squirtle (Japanese: ゼニガメ Zenigame) is a Water-type Pokémon introduced in Generation I.It evolves into Wartortle starting at level 16, which evolves into Blastoise starting at level 36."
     },

     {
        name: "Charmander",
        image: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/004.png",
        type: "Fire",
        description: "Charmander (Japanese: ヒトカゲ Hitokage) is a Fire-type Pokémon introduced in Generation I.It evolves into Charmeleon starting at level 16, which evolves into Charizard starting at level 36."
     },

     {
        name: "Bulbasaur",
        image: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/001.png",
        type: "Grass/Poison",
        description: "Bulbasaur (Japanese: フシギダネ Fushigidane) is a dual-type Grass/Poison Pokémon introduced in Generation I.It evolves into Ivysaur starting at level 16, which evolves into Venusaur starting at level 32."
     }
 ];

 function seedDB() {
    Pokemon.remove({}, function(err){
        if(err)
           console.log(err);
        console.log("Removed Pokemon");
        data.forEach(function(seed){
            Pokemon.create(seed, function(err, pokemon){
                if(err)
                    console.log(err);
                else{
                    console.log("Added a campground");
                    Comment.create({
                        text: "Best Pokemon Ever",
                        author: "Red"
                    }, function(err, comment){
                        if(err)
                            console.log(err);
                        else{
                            pokemon.comments.push(comment);
                            pokemon.save();
                            console.log("Created a new comment");
                        }        
                        
                    });
                }                    
            })
        });
    });    
 };

 module.exports = seedDB;
 

