// Hangman Game - Classic Video Games 


//Variables

//Create an object to hold different messages to display to the player when a condition is met
var messages = {
	win: "You Win! Good Job!",
	lose: "Game Over",
	guessed: "You already tried that letter, try another!",
	valid: "Please press a letter on the keyboard from A-Z"
};

var wordToGuess = "";
//This variable holds each letter in the word
var lettersInChosenWord = [];
//Variable to hold the number of blanks in the word
var numBlanks = 0;
//Variable to hold the blanks and successful guesses
var wordBlanks = [];
//Holds wrong guesses
var wrongGuess = [];
//Counters
var guessesLeft = 12;
var winsCounter = 0;
var lossCounter = 0;
var blanksAndSuccess = 0;


// Functions

var chooseWord = function() {
	var games = ["galaga", "asteroids", "donkeykong", "streetfighter", "centipede", "joust", "frogger", "defender", "paperboy", "gauntlet", "contra", "pacman", "spaceinvaders", "missilecommand", "zaxxon", "doubledragon"];
	return games[Math.floor(Math.random() * games.length)];
}


//Create functions for game start
function startGame() {
	wordToGuess = chooseWord();
	letterUsed = wordToGuess.split("");
	numBlanks = letterUsed.length;
	document.getElementById("wrongGuesses").innerHTML = "";
	//Reset values back to start
	rightGuess = 0;
	guessesLeft = 12;
	wrongGuess = [];
	blanksAndSuccess = [];

	//Create the blanks for the letters
	for(var i = 0; i < wordToGuess.length; i++) {
		blanksAndSuccess.push("_");
	}

		//Changes to HTML
		document.getElementById("wordToGuess").innerHTML = blanksAndSuccess.join("_");
		document.getElementById("numGuesses").innerHTML = String(guessesLeft);
		document.getElementById("wins").innerHTML = String(winsCounter);
		document.getElementById("losses").innerHTML = String(lossCounter);
		document.getElementById("wrongGuesses").innerHTML ="";

		//Debugging
		console.log(chooseWord);
		console.log(letterUsed);
		console.log(numBlanks);
		console.log(wordBlanks);

}

//function to see if the player has pressed a correct letter or not
// function compare(userKey) {
// 	if (wordToGuess.indexOf(userKey) > -1) {
// 		for(var i = 0; i < wordToGuess.length; i++) {
// 			if(wordToGuess[i] === userKey) {
// 				rightGuess.push(userText);
// 				document.getElementById("wordToGuess").innerHTML = wordBlanks.join("");
// 			}
// 		}
// 	} 
// 	else {
// 		wrongLetters.push(userKey);
// 		guessesLeft--;
// 		document.getElementById("numGuesses").innerHTML = guessesLeft;
// 		document.getElementById("wrongGuesses").innerHTML = wrongLetters;
// 			//debug
// 			console.log(wrongLetters);
// 			console.log(guessesLeft);
// 	}
// }

function checkLetter(letter){
    /*
    function checks the argument letter with the choosenword if letter is present then the char will be
    revealed in the array. Otherwise the numGuess will decrease by one.
     */

    var letterInWord = false;
    for(var i = 0; i < numBlanks; i++){
        if(wordToGuess[i] === letter){
            letterInWord = true;
        }
    }
    if(letterInWord){
        for( i = 0; i < numBlanks; i++){
            if(wordToGuess[i] === letter){
                blanksAndSuccess[i] = letter;
            }
        }
    }
    else {
        if(wrongGuess.length == 0) {
            wrongGuess.push(letter);
            guessesLeft--;
        }else if(wrongGuess.indexOf(letter) < 0){
            wrongGuess.push(letter);
            guessesLeft--;
        }
        else{
            alert(letter + " has been used.")
            document.getElementById("wrongGuesses").innerHTML = String(letter + ' has been used.');
        }
    }
}

	


// //If the player wins do something
// function winLose() {
// 	if(rightGuess === numBlanks) {
// 		wins++;
// 		document.getElementById("wins").innerHTML = wins;
// 		alert(messages.win);
// 		reset();
// 	} else if(guessesLeft === 0) {
// 		losses++;
// 		alert(messages.lose)
// 		document.getElementById("losses").innerHTML = losses;
// 		reset();
// 	}
// }

function roundComplete(){
    /*
    function roundComplete verifies the game is over by either win or loss
     */
    document.getElementById("wordToGuess").innerHTML = blanksAndSuccess.join(' ');
    document.getElementById("numGuesses").innerHTML = guessesLeft;
    document.getElementById("wrongGuesses").innerHTML = wrongGuess.join(' ');
    console.log("Here in this function");
    console.log(letterUsed);

    if(letterUsed.join("") === blanksAndSuccess.join("")){
        console.log("You won!");
        winsCounter++;
        document.getElementById("wins").innerHTML = winsCounter;
        alert('You win the word is ' + lettersInChosenWord.join(""));
        startGame();

    }
    else if(guessesLeft == 0){
        lossCounter++;
        document.getElementById("losses").innerHTML = String(lossCounter);
        alert('You lose, the word was:  '+ wordToGuess);
        startGame();
    }
}


//Reset the game on win or lose

function reset() {
	document.querySelector(".the-button.plastic").onclick = function() {
   	window.startGame();
   }
}

startGame();
reset();




// document.onkeyup = function(event) {
// 	console.log("Onkey up event fired!");
// 	userText.innerHTML = event.key.toUpperCase();
// 	compare(event.key);
// };

document.onkeyup = function (event) {
    var guessLetter = String.fromCharCode(event.keyCode).toLowerCase();
    checkLetter(guessLetter);
    roundComplete();
};
