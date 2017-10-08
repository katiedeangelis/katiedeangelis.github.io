// Alien movie array
var movieList = [
    "Alien",
    "Avatar",
    "Predator",
    "District 9",
    "Dune",
    "ET",
    "Fifth Element",
    "Galaxy Quest",
    "Independence Day",
    "Close Encounter of the Third Kind",
    "Interstellar",
    "Prometheus",
    "Mars Attacks",
    "Men in Black",
    "Starship Troopers",
    "Pacific Rim",
    "Spaceballs",
    "Predator",
    "Contact",
    "War of the Worlds",
    "The Day the Earth Stood Still",
    "Star Wars",
    "The Abyss",
    "Cloverfield",
    "The Hitchhikers Guide to the Galaxy",
    "The Thing",
    "Total Recall",
    "Wall E",
    "Cocoon",
    "Invasion of the Body Snatchers",
    "Flight of the Navigator",
    "John Carter",
    "Coneheads",
    "Lilo & Stitch"

]

//Randomly choose an alien movie
var movieChosen;



//Copy the movie chosen array into the movie unsolved array
var movieUnsolved;

//Create a letter grave yard array where incorrect guesses will be pushed
var letterGraveYard;

//Define that the user gets 10 incorrect guesses
var guessesLeft;

//Keeps track of wins
var wins = 0;

function resetHangman() {
    movieChosen = movieList[Math.floor(Math.random() * movieList.length)];
    //Take the randomly chosen movie string and split it into an array
    movieChosen = movieChosen.split("");
    movieUnsolved = movieChosen.slice();
    letterGraveYard = [];
    guessesLeft = 10;
    document.querySelector(".guesses-left").innerHTML = guessesLeft;
    document.querySelector(".letter-graveyard").innerHTML = letterGraveYard;

    //Loop through the movie unsolved array and if the character is not a space replace it with an underscore
    for (var j = 0; j < movieUnsolved.length; j++) {
        if (movieUnsolved[j] != " ") {
            movieUnsolved[j] = "_";
            //if the character is a space assign it the following HTML (defined in hangman.css)
        } else {
            movieUnsolved[j] = "<span class='title-spaces'></span>";
        }
    }
    document.querySelector(".movie").innerHTML = movieUnsolved.join(" ");
}

//As soon as the page loads show the unsolved movie that was randomly selected
window.addEventListener("load", resetHangman);

window.addEventListener("load", function (event) {
    resetHangman();
});

//As soon as the window opens listen for a keyup event
window.addEventListener("keyup", keyChosen);

//Assign the key the user pressed to the variable keyPressed and interpret it as lower case
function keyChosen(e) {
    var keyPressed = e.key;
    keyPressed = keyPressed.toLowerCase();

    // If the key pressed is not in the letter graveyard add it
    if (letterGraveYard.indexOf(keyPressed) === -1) {
        letterGraveYard.push(keyPressed);
        document.querySelector(".letter-graveyard").innerHTML = letterGraveYard.join(", ");

        //If the key pressed isn't in the graveyard and the guesses left is greater than zero run the loop
        if (guessesLeft > 0) {

            //Flag for guesses left logic
            var correctLetter = false;

            //Convert movie chosen characters to lower case for comparison
            for (var j = 0; j < movieChosen.length; j++) {
                var currentChar = movieChosen[j];
                currentChar = currentChar.toLowerCase();

                //If key pressed is in the move chosen replace the underscore with that letter
                if (keyPressed == currentChar) {
                    movieUnsolved[j] = movieChosen[j];
                    correctLetter = true;
                    document.querySelector(".movie").innerHTML = movieUnsolved.join(" ");

                    //If there are no underscores left on the screen the movie has been guessed & the user wins
                    if (movieUnsolved.indexOf("_") === -1) {
                        document.querySelector(".movie").innerHTML = movieUnsolved.join(" ");
                        setTimeout(function() {
                            var playAgain = confirm("You win! Press OK to play again or cancel to quit.");
                            if (playAgain == true) {
                                hangmanWin();
                            }
                        }, 1000)
                        
                    }
                }
            }

            //If key pressed is not in the movie title deduct a guess from the guesses left
            if (correctLetter === false) {
                guessesLeft -= 1;
                document.querySelector(".guesses-left").innerHTML = guessesLeft;

                //If the guesses left is less than or equal to zero the movie has not been guessed & the user losses
                if (guessesLeft <= 0) {
                    var playAgain = confirm("You loose! Press OK to play again or cancel to quit.");
                    if (playAgain == true) {
                        hangmanWin();
                    } else {
                        window.removeEventListener("keyup", keyChosen);
                    }
                }
            }
        }

        document.querySelector(".movie").innerHTML = movieUnsolved.join(" ");

        //If the key pressed is already in the letter graveyard alert the user they already guessed it
    } else {
        alert("You already guessed that!");
        return false;
    }
}

function hangmanWin() {
    wins += 1;
    document.querySelector(".hangman-wins").innerHTML = wins;
    resetHangman();
}