//Required global variables.
var request = require('request');
var fs = require('fs');
var spotify = require('spotify');
var TwitterK = require('./keys.js');
var Twitter = require('twitter');
var client = new Twitter(TwitterK.twitterKeys);
var statement = process.argv[2];
var value = process.argv[3];
var Err = '';
var showOutput = '';

//Function that checks input reponse for twitter, spotify, movie, and random.txt.
function checkResults(argument) {
	//used a switch statement instead of tons of if/else statement. The switch statment switches between each command.
	switch(statement) {
  	  case 'my-tweets': //Tweets command 
    	  showTweets();
      	break;
      	case 'spotify-this-song': //Spotify command 
    		if (value == undefined) {
    			value = "That's Life, Frank";
    			Err = "Please choose a song, or Liri will default to That's life by Frank Sinatra" + "\r\n";
    			console.log(Err);
            	logInput(Err);
    			spotifyResults();	
    		} else {
		    	 spotifyResults();
	    	}
  	    break;
      	case 'movie-this': //Movie command
    		if (value == undefined) {
    			value = "The Town";
    			Err = "Please choose a movie, or Liri will default to The Town" + "\r\n";
    			console.log(Err);
            	logInput(Err);
		    		requestResults();
		    } else {
		    		requestResults();
		    }
    	break;
    	case 'do-what-it-says': // backstreet boy's or directions command.
      	doWhatItSays();
      	break;
    	default:
    	//If incorrect information is enter, then show commands that can be used to run app.
      	Err = "Please enter one of the choices below" +  "\r\n" + "\r\n" +       	
      	"these are the possible entries: " + "\r\n" +  
      	"node liri.js my-tweets" +  "\r\n" +
        "node liri.js spotify-this-song '<song name>' " +  "\r\n" +
        "node liri.js movie-this '<movie name>' " +  "\r\n" +
        "node liri.js do-what-it-says" + "\r\n" + "\r\n" ;       	
      	console.log(Err);
        logInput(Err);
}
}
// Shows Tweets in the command line.
function showTweets() {
  //var twitKeys = TwitterK.twitterKeys;
  //Twitter Keys and access Keys. 
  //var client = new Twitter(TwitterK.twitterKeys);

  var twitterId = 'mr_kevin_smith'
  var params = {screen_name: twitterId};
  client.get('statuses/user_timeline', params, function(error, tweets, response){
    if (!error) {
        //var tweetLength = 0;
        /* if (tweets.length < 20) {
            tweetLength = tweets.length
        } else {
            tweetLength = 20
        }*/
        //console.log(tweets[0].text);
        for (var i = 0; i < 3; i++) {
	        console.log(tweets[i].text);
        }
    } else {
    	console.log(error);
    }
 });
}
//Movie Results
function requestResults() {
	var title = value.replace(/\s+/g, "+"); 
	var reqIn = 'http://www.omdbapi.com/?t=' + title + '&y=&plot=short&r=json&tomatoes=true';
	request(reqIn, function (error, response, body) {
//Data that will be retrived from choosen movie.
  jsonBody = JSON.parse(body);
  showOutput = 'Title: ' + jsonBody.Title + "\r\n" +
           'Year: '  +  jsonBody.Year + "\r\n" + 
           'IMDB Rating: ' + jsonBody.imdbRating + "\r\n" +
           'Country: ' + jsonBody.Country + "\r\n" +
           'Language: ' + jsonBody.Language + "\r\n" +
           'Plot: ' + jsonBody.Plot + "\r\n" + 
           'Actors: ' + jsonBody.Actors + "\r\n" +
           'Rotten Tomatoes Rating: ' + jsonBody.tomatoRating + "\r\n" +
           'Rotten Tomatoes URL: ' +  jsonBody.tomatoURL + "\r\n" + "\r\n" ;

    	console.log(showOutput);
      	logInput(showOutput);
	});
}
//Spotify Results
function spotifyResults() {
	spotify.search({ type: 'track', query: value }, function(err, data) {
    if ( err ) {
        var errTxt = 'Error occurred' + err
        console.log(errTxt);
        logInput(errTxt);
        return;
    }
  //Data that will be retrived from spotify.
  var spotItem = data.tracks.items[0];
  showOutput = 'artist: ' + spotItem.artists[0].name + "\r\n" +
           'song name: '  +  spotItem.name + "\r\n" + 
           'preview link: ' + spotItem.href + "\r\n" +
           'album: ' + spotItem.album.name + "\r\n" +  "\r\n";
	console.log(showOutput); 
  	logInput(showOutput);
  });
}
//Function that reads the random.txt file.
function doWhatItSays() {
	fs.readFile('./random.txt', "utf8", function(err, data){
		data = data.split(',');
		statement = data[0];
		value = data[1];
		checkResults();
	});
}
//Outputs the data to a log.txt file.
function logInput(logText) {
  fs.appendFile("./log.txt", logText, (err) => {
     if (err) throw err;
    
  }); 
}
// Call results
checkResults();

