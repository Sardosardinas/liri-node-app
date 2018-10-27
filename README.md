# liri-node-app
Liri with node.js

First of all, this seems like a very very hard project, it aint, you just have to make the folders work. So what you are going to see in the liri.js is this two lines for spotify:

var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);

What these two variables do are calling the npm node and getting the spotify keys and secret. In keys.js what appears is this:

exports.spotify = {
  id: process.env.SPOTIFY_ID,
  secret: process.env.SPOTIFY_SECRET
};

console.log(exports.spotify);

In this case you are not going to see the keys that you can get in your spotify for developers dashboards and that is because if you put it in the key.js file is not going to work because is just going to recognize the first letter or number unless you make a string are you are not supposed to do so.

Just make an env, that has 
SPOTIFY_ID= equals-your-id
SPOTIFY_SECRET= equals-your-secret

No quotes no anything, so liri.js is going to look into keys.js and keys.js is going to check on env (and gitignore is going to keep it safe).

After that dowload the following npms 

var Spotify = require('node-spotify-api');
var request = require('request');
var fs = require("fs");
var moment = require('moment');

you can look for them on google and hold them in variables. What that is going to let you do is:

spotify-this-song
movie-this
concert-this
do-what-it-says

and this is how the first part of your code should work:

var startLIRI = function(){
    if (userCommand === "concert-this"){
        getConcert()
    } else if (userCommand === "spotify-this-song"){
        getSpotify();
    } else if (userCommand === "movie-this"){
        getMovie();
    } else if (userCommand === "do-what-it-says"){
        doIt();
    } else {
        console.log("Acceptable commands:-- concert-this-- spotify-this-song-- movie-this-- do-what-it-says--")
    }
};



call this function after so its the only function loaded into the program and you can check the code in my liri for doing awesome things

Like calling for a song and getting more than one result
![Image of spotify node working](https://github.com/Sardosardinas/liri-node-app/blob/master/images/spotify-this-song.PNG)

Or movies!
![Image of movie-this](https://github.com/Sardosardinas/liri-node-app/blob/master/images/movie-this.PNG)

Look for concert dates:
![Image of concert-this](https://github.com/Sardosardinas/liri-node-app/blob/master/images/concert-this.PNG)

and do random things (using random.txt)
![Image of do-what-it-says](https://github.com/Sardosardinas/liri-node-app/blob/master/images/movie-this.PNG)


So please jump on it and check it out!
