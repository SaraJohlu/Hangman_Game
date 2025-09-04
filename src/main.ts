import './style.css'

// Creating the different states in the game using enum.
enum gameState {
  Playing,
  Won,
  Lost,
}

// using Literal types for all the letters that can be used in the game.
type Letter =
  | "a" | "b" | "c" | "d" | "e" | "f" | "g"
  | "h" | "i" | "j" | "k" | "l" | "m" | "n"
  | "o" | "p" | "q" | "r" | "s" | "t" | "u"
  | "v" | "w" | "x" | "y" | "z";

// Interface for the game 

interface hangman_game {
  word: String,
  guessed_letters: Letter[],
  max_fails: number,
  state: gameState
};

// Function to start the game, takes a word as an argument and returns an object of type hangman_game.
function start_hangman(word: string): hangman_game {
  return {
    word: word.toLowerCase(),
    guessed_letters: [],
    max_fails: 6,
    state: gameState.Playing
  }
};

function guess_letter(game: hangman_game, letter: Letter): hangman_game {
  if (game.state !== gameState.Playing) return game; // If the gamestate is not playing return game as it is, "game is over".

  if (!game.guessed_letters.includes(letter)) {
    game.guessed_letters.push(letter); // If the letter has not been guessed, the program adds the letter into the guessed_letters array.
  }

  const fail = game.guessed_letters.filter(l => !game.word.includes(l)).length; // Count the number of failed guesses. 
  /*If the guessed letter is not in the word it will increment the fail count by filter through the array for the set word*/


  /* This if state checks if the player has either won or lost by comparing the number guesses to fail guesses. So if fail is
  equal or bigger than the max_fails it will turn the game state to Lost. */
  if (fail >= game.max_fails) {
    game.state = gameState.Lost;
  }

  /*What split does is to split the guessed word into an array for letters to see if the function will return it true or false.
  every in this case is an array method that checks if every element (letters) passes the the test of the implementation in the function
  l as Letter is telling Typescript that the  l is a Letter type. */

  else if (game.word.split("").every(l => game.guessed_letters.includes(l as Letter))) {
    game.state = gameState.Won;
  }
  return game;
};


/* This function will show the current state of the game. 

const game = start_hangman("Vinylplatta") --> This sets the winning word to Vinylplatta.;
*/

function display_current_game (game: hangman_game): string {
  const display_word = game.word.split(" ").map(l => (game.guessed_letters.includes(l as Letter)) ? l: " ").join("");
  return ` Word: ${display_word}
  guess_letter: ${game.guessed_letters.join(", ")}
  Status: ${game.state}` 
};


console.log(`${start_hangman}`)