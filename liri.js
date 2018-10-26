
//Required files and modules
require("dotenv").config();
var keys = require('./keys.js');
var Spotify = require('node-spotify-api');
var request = require('request');
var fs = require("fs");
var moment = require('moment');
moment().format();

//Global vars
var tomatometer;
var imdbRating;

//this holds the commands like "movie-this", or "spotify-this-song"
var userCommand = process.argv[2];

//this holds the actual thing that we are going to request, like "dumbo" or "The Exorcist"
var userEntry = process.argv[3];

//this converts a multiple word song into the same position
for (var i = 4; i < process.argv.length; i++) {
    userEntry += ' ' + process.argv[i];
}

//This goes for the keys at keys.js and then keys.js goes for the keys at .env, but only for spotify.
var spotify = new Spotify(keys.spotify);

//Possible commands and LIRI triggers
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

//When userCommand = concert-this
var getConcert = function (concertName){
    
    if (userEntry === undefined) {
        console.log("-----An error occurred, please choose another band-----");
        return;
    } else {
        concertName = userEntry
    };

    console.log("Look for concert: " + concertName + " on the database");

    var queryUrl = "https://rest.bandsintown.com/artists/" + concertName + "/events?app_id=codingbootcamp";

    request(queryUrl, function (error, response, body){

        if (!error && response.statusCode === 200) {

            var data = JSON.parse(body);

            console.log("Results of upcoming concerts for " + concertName.toUpperCase());

            for (var i = 0; i < data.length; i++) {

                var date = data[i].datetime;
                date = moment(date).format("MM/DD/YYYY");

                console.log("\nDate: " + date)

                console.log("Venue: " + data[i].venue.name);
                
                if (data[i].venue.region == "") {
                    console.log("Location: " + data[i].venue.city + ", " + data[i].venue.country);

                } else {
                    console.log("Location: " + data[i].venue.city + ", " + data[i].venue.region + ", " + data[i].venue.country);
                };
            }
            console.log("---------------- :v -------------------");
        }
    })
};

//When userCommand = spotify-this-song
var getSpotify = function (songName) {

    if (userEntry === undefined) {
        songName = "The Sign Ace of Base";
    } else {
        songName = userEntry
    };

    console.log("Looking for song: " + songName + " in the database");

    spotify.search(
        {
            type: "track",
            query: songName
        },
        function (err, data) {
            if (err) {
                console.log("Error occurred: " + err);
                return;
            }
            var songs = data.tracks.items;

            for (let i = 0; i < songs.length; i++) {
                console.log(i+1);
                console.log("Artist: " + songs[i].artists[0].name);
                console.log("Song: " + songs[i].name);
                console.log("Album: " + songs[i].album.name);
                console.log("Preview: " + songs[i].preview_url);
                console.log("--------------- :v --------------------");
            }
        }
    );
};

//When userCommand = movie-this
var getMovie = function (movieName){

    if (userEntry === undefined) {
        movieName = "Mr. Robot";
    } else {
        movieName = userEntry
    };

    console.log("Looking for movie: " + movieName + "in the database");

    var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&tomatoes=true&apikey=trilogy";

    request(queryUrl, function (error, response, body) {

        if (!error && response.statusCode === 200) {

            var data = JSON.parse(body);

            for (i = 0; i < data.Ratings.length; i++) {
                if (data.Ratings[i].Source === "Rotten Tomatoes") {
                    tomatometer = data.Ratings[i].Value;
                }
                if (data.Ratings[i].Source === "Internet Movie Database") {
                    imdbRating = data.Ratings[i].Value;
                }
            }

            console.log("Title: " + data.Title);
            console.log("Release Year: " + data.Year);
            console.log("IMdB Rating: " + imdbRating);
            console.log("Tomatometer: " + tomatometer);
            console.log("Country: " + data.Country);
            console.log("Language: " + data.Language);
            console.log("Plot: " + data.Plot);
            console.log("Actors: " + data.Actors);
            console.log("------------------ :v -----------------");

        } else {
            console.log("An error has occurred :(\n")
        }
    })
};

var doIt = function(){
    fs.readFile("random.txt", "utf8", function(err, data) {
        if (err) {
          return console.log(err);
        }

        doItEntry = data.split(",")

        userCommand = doItEntry[0];
        userEntry = doItEntry[1];

        startLIRI();
    });
};

startLIRI();