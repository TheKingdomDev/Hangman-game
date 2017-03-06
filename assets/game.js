// Hangman Game - Classic Video Games 


//Variables

var userText = document.getElementById("userText");


//Need an array to store a set of words for the player to guess
var games = ["GALAGA", "ASTEROIDS", "JOUST", "FROGGER", "DEFENDER", "PAPERBOY", "CENTIPEDE", "GAUNTLET", "CONTRA"];
//Need an array of the available letters for the player to guess and make sure they dont guess more then wonce
var alphabet = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];

//Create an array to hold the answer and iterate the number of blanks to display for each game
var answer = [];
//Create an object to hold different messages to display to the player when a condition is met
var messages = {
	win: "You Win! Good Job!",
	lose: "Game Over",
	guessed: "You already tried that letter, try another!",
	valid: "Please press a letter on the keyboard from A-Z"
};

//Must choose a word on start or reset
var chooseWord = games[Math.floor(Math.random() * games.length)];
//This variable holds the word
var guess = "";
//This variable holds each letter in the word
var letterUsed = [];
//Variable to hold the number of blanks in the word
var numBlanks = 0;
//Variable to hold the blanks and successful guesses
var wordBlanks = [];
//Holds wrong guesses
var wrongLetters = [];
//Counters
var guessesLeft = 15;
var wins = 0;
var losses = 0;
var rightGuess = 0;


// Functions

//Create functions for game start
function startGame() {
	chooseWord;
	letterUsed = chooseWord.split("");
	numBlanks = letterUsed.length;

	//Reset values back to start
	rightGuess = 0;
	guessesLeft = 15;
	wrongLetters = [];
	numBlanks = [];
	answer;

	//Create the blanks for the letters
	for(var i = 0; i < numBlanks; i++) {
		wordBlanks.push("_");
		document.getElementById("wordToGuess").innerHTML = wordBlanks;
	}

		//Changes to HTML
		document.getElementById("wordToGuess").innerHTML = wordBlanks.join("_");
		document.getElementById("numGuesses").innerHTML = guessesLeft;
		document.getElementById("wins").innerHTML = wins;
		document.getElementById("losses").innerHTML = losses;
		document.getElementById("wrongGuesses").innerHTML = wrongLetters;

		//Debugging
		console.log(chooseWord);
		console.log(letterUsed);
		console.log(numBlanks);
		console.log(wordBlanks);

}

//function to see if the player has pressed a correct letter or not
function compare(userKey) {
	if (chooseWord.indexof(userKey) > -1) {
		for(var i = 0; i < numBlanks; i++) {
			if(answer[i] === userKey) {
				wordBlanks[i] = userKey;
				document.getElementById("wordToGuess").innerHTML = wordBlanks.join("");
			}
		}
	}
	else {
		wrongLetters.push(userKey);
		guessesLeft--;
		document.getElementById("numGuesses").innerHTML = guessesLeft;
		document.getElementById(wrongGuesses).innerHTML = wrongLetters;
			//debug
			console.log(wrongLetters);
			console.logt(guessesLeft);
	}
}
	


//Need a counter for number of wins and for guesses remaining
	//Letters already guessed should not appear again when the player hits a key multiple times

//If the player wins do something
function winLose() {
	if(rightGuess === numBlanks) {
		wins++;
		document.getElementById("wins").innerHTML = wins;
		reset();
	} else if(guessesLeft === 0) {
		losses++;
		document.getElementById("losses").innerHTML = losses;
		reset();
	}
}
//If the player loses reset and try again -- use the reset button to do this

//Reset the game on win or lose

function reset() {
	//Choose a new random word from the games array
	chooseWord;
	//Need to split the letters
	letterUsed = chooseWord.split("");
	//Get the number of blanks
	numBlanks = letterUsed.length; 

	//Reset values back to start
	rightGuess = 0;
	guessesLeft = 15;
	wrongLetters = [];
	numBlanks = [];
	answer;

	startGame;
}

startGame();

document.onkeyup = function(event) {
	userText.textContent = event.key;
	compare();
};
