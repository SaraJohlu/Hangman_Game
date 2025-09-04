import './style.css'

// Creating the different states in the game using enum.
enum gameState {
  playing = "PLAYING",
  won = "WON",
  lost = "LOST", 
};

// using Literal types for all the letters that can be used in the game.
type Letter = {
  a: "A", b:"B", c:"C", d:"D", e:"E", 
  f:"F", g:"G", h:"H", i:"I", j:"J", 
  k:"K", l:"L", m:"M", n:"N", o:"O", 
  p:"P", q:"Q", r:"R", s:"S", t:"T", 
  u:"U", v:"V", w:"W", x:"X", y:"Y", 
  z:"Z"
};

// Interface for the game 

interface hangman_game {
  word: String,
  guessed_letters: Letter[],
  max_fails: number,
  state: gameState
};

// Function to start the game, takes a word as an argument and returns an object of type hangman_game.
function start_hangman (word: string): hangman_game {
  return {
    word: word.toLowerCase(),
    guessed_letters: [],
    max_fails: 6,
    state: gameState.playing
  }
};

function guess_letter(game: hangman_game, letter: Letter): hangman_game{
  if (game.state !== gameState.playing) return game; // If the gamestate is not playing return game as it is, "game is over".

  if(!game.guessed_letters.includes(letter)) {
    game.guessed_letters.push(letter); // If the letter has not been guessed, the program adds the letter into the guessed_letters array.
  }

  const fail = game.guessed_letters.filter(l => !game.word.includes(l)).length; // Count the number of failed guesses. 
  /*If the guessed letter is not in the word it will increment the fail count by filter through the array for the set word*/

  if(fail >= game.max_fails) {
    game.state = gameState.lost;  
  }
  else if (game.word.split("").every(l => game.guessed_letters.includes(l))){
    game.state = gameState.won;
  }
  return game;


}

