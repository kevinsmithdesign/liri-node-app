//Required global variables.
var request = require('request');
var fs = require('fs');
var spotify = require('spotify');
var TwitterK = require('./keys.js');
var Twitter = require('twitter');
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
//Outputs the data to a log.txt file.
function logInput(logText) {
  fs.appendFile("./log.txt", logText, (err) => {
     if (err) throw err;
    
  }); 
}


