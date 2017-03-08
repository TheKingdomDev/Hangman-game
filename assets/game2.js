//Retro Arcade Hangman Game

var gameInterface = (function() {

	var chooseWord = function(games) {
		var randomWord = Math.floor(Math.random() * games.length);
		return words[randomWord];
	};

	var isLetter = function(str) {
		return str.length === 1 && str.match(/[a-z]/i).length>0;
	};

	var initializeGame = function() {
		var lives = 15;
		var games = ["galaga", "asteroids", "donkeykong", "streetfighter", "centipede", "joust", "frogger", "defender", "paperboy", "gauntlet", "contra", "pacman", "spaceinvaders", "missilecommand", "zaxxon", "doubledragon"];
		var word = chooseWord(games);
		var game_obj = game.Game(lives, word, guesses);
		var view = screen.Screen(game_obj);
		drawScreen(view);
		$(document).keypress(function(e) {
			handleInput(e);
		});
		var handleInput = function(e) {
			if(!isLetter(e.key) || (game_obj.guesses.has(e.key))){
				return;
			}
			if (game_obj.is_dead) {
				return;
			}
			if (game_obj.has_won) {
				return;
			}
			game_obj = game_obj.addGuess(e.key);
			view = screen.Screen(game_obj);
			drawScreen(view);
		}
	}
	return { initializeGame : initializeGame};

})();

var game = (function(){

    var intersection = function(setA, setB){
	var el_in_b = (x => setB.has(x));
	return new Set([...setA].filter(el_in_b));
    }
    
    var difference = function(setA, setB){
	var el_not_in_b = (x => !setB.has(x));
	return new Set([...setA].filter(el_not_in_b));
    }
    var Game = function(lives, word, guesses){	
	this.lives = lives;
	this.word = word;
	this.guesses = guesses;
	this.word_letters = new Set(this.word);
	this.correct_guesses = intersection(this.guesses, this.word_letters);
	this.incorrect_guesses = difference(this.guesses, this.word_letters);	
	this.is_dead = this.lives <= this.incorrect_guesses.size;
	this.has_won = this.correct_guesses.size == this.word_letters.size;
	
	this.addGuess = function(letter){
	    return Game(this.lives, this.word,
			this.guesses.add(letter));
	}
	return this;
    }
    return { Game: Game };

    var screen = (function(){

    var getWord = function(game){
	var getLetter= function(letter){
	    return (game.guesses.has(letter) ? letter : "_");
	}
	var display_letters = game.word.split('').map(getLetter);
	return display_letters.join(' ');
    }
    
    var getMsg = function(game){
	var msg = '';
	if (game.has_won){
	    msg = 'Congrats! You won!'
	}else if (game.is_dead){
	    msg = 'Oh no, you\'re dead!';
	}else{
	    msg = 'Ok, press a key!';
	}
	return msg;
    }

    var Screen = function(game){	
	this.msg = getMsg(game);
	this.word = getWord(game);
	this.gallows = gallows[game.incorrect_guesses.size];
	this.wrong_guesses = [...game.incorrect_guesses].join(' ');

	return this;
    }    
    return { Screen : Screen };
})()

})();

  $(document).ready(function(){        
	gameInterface.init()
    });