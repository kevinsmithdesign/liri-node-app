# liri-node-app

In this assignment, I created a Language Interpretation and Recognition Interface(LIRI). LIRI is like an iPhone's SIRI. However, while SIRI is a Speech Interpretation, this app is a command line node app that takes in parameters and gives you back data. Rules: 

• LIRI will display your latest tweets. 

• LIRI also retrieves data from Spotify and the IMDB API's using requests.

• node liri.js my-tweets, will show your last 20 tweets and when they were created in your terminal/bash window.

• node liri.js spotify-this-song '<song name here>', will show the following info about the song in your terminal/bash window:
  
    • Artist(s)
    • The song's name
    • A preview link of the song from Spotify
    • The album that the song is from
    • If no song is provided then your program will default to: "Frank Sinatra", "That's Life".
    
node liri.js movie-this '<movie name here>', will output the following information to your terminal/bash window:

    • Title of the movie
    • Year the movie came out
    • IMDB Rating of the movie
    • County where the movie was produced. 
    • Language of the movie
    • Plot of the movie
    • Actors in the movie
    • Rotten Tomatoes Rating 
    • Rotten Tomatoes URL
    • If the user doesn't type a movie in, the program will output data for the movie "The Town"

node liri.js do-what-it-says, will take the text inside of random.txt and then use it to call one of LIRI's commands.

    • It runs spotify-this-song, "I want it that way".
