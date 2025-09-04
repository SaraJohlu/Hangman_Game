import './style.css'

// Creating the different states in the game using enum.
enum gameState {
  Playing = "PLAYING",
  Won = "WON",
  Lost = "LOST",
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

// ---------- ASCII-hänggubbe (steg 0–6) ----------
const HANGMAN_STEPS = [
`   +---+
   |   |
       |
       |
       |
       |
=========`,
`   +---+
   |   |
   O   |
       |
       |
       |
=========`,
`   +---+
   |   |
   O   |
   |   |
       |
       |
=========`,
`   +---+
   |   |
   O   |
  /|   |
       |
       |
=========`,
`   +---+
   |   |
   O   |
  /|\\  |
       |
       |
=========`,
`   +---+
   |   |
   O   |
  /|\\  |
  /    |
       |
=========`,
`   +---+
   |   |
   O   |
  /|\\  |
  / \\  |
       |
=========`,
];

// Start the game 


// Function to start the game, takes a word as an argument and returns an object of type hangman_game.

function start_hangman(word: string): hangman_game {
  return {
    word: word.toLowerCase(),
    guessed_letters: [],

    max_fails: HANGMAN_STEPS.length - 1, // link to hangman steps (last step = lost)
    state: gameState.Playing,
  };
}

// Normalize input to Letter | null
function toLetter(ch: string): Letter | null {
  const c = ch.toLowerCase();
  if (c.length === 1 && c >= "a" && c <= "z") return c as Letter;
  return null;
}

// Mask the word: show _ for letters not yet guessed
function masked_word(game: hangman_game): string {
  return game.word.split("")
    .map(ch => (ch >= "a" && ch <= "z")
      ? (game.guessed_letters.includes(ch as Letter) ? ch : "_")
      : ch
    )
    .join(" ");
}

// Count fails (all guessed letters that are not in the word)
function failCount(game: hangman_game): number {
  return game.guessed_letters.filter(l => !game.word.includes(l)).length;
}

function guess_letter(game: hangman_game, letterInput: string): hangman_game {
  if (game.state !== gameState.Playing) return game; // If the gamestate is not playing return game as it is, "game is over".

    const letter = toLetter(letterInput);
  if (!letter) return game;

  if (!game.guessed_letters.includes(letter)) {
    game.guessed_letters.push(letter); // If the letter has not been guessed, the program adds the letter into the guessed_letters array.
  }

  const fail = failCount(game); 
  // Count the number of failed guesses. 

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


/*Simple UI */
const app = document.querySelector<HTMLDivElement>("#app");
if (!app) throw new Error("Could not find #app");

let game = start_hangman("Programmering"); // change the starting word here

function render() {
  const fails = failCount(game);

  app!.innerHTML = `
  <div class="container">
    <div class="card ${
      game.state === gameState.Won ? "won" : 
      game.state === gameState.Lost ? "lost" : ""
    }">
      <h1>Hang man</h1>
      <p class="subtle">State: ${game.state}</p>

      <pre>${HANGMAN_STEPS[Math.min(fails, HANGMAN_STEPS.length - 1)]}</pre>
      <div class="meta">Fails: <strong>${fails}</strong> / ${game.max_fails}</div>

      <div class="word">${masked_word(game)}</div>
      <div class="meta">Guessed: ${game.guessed_letters.join(", ") || "–"}</div>

      <div class="controls">
        <input id="letter" maxlength="1" placeholder="Guess a letter" />
        <button id="guess">Guess</button>
        <button id="reset">New game</button>
      </div>
    </div>
  </div>
  `;

  document.querySelector<HTMLButtonElement>("#guess")!.onclick = () => {
    const inp = document.querySelector<HTMLInputElement>("#letter")!;
    guess_letter(game, inp.value);
    inp.value = "";
    render();
  };

  document.querySelector<HTMLButtonElement>("#reset")!.onclick = () => {
    game = start_hangman("Kanelbulle"); // new word here
    render();
  };
}

// Keyboard support
window.addEventListener("keydown", (e) => {
  if (e.key === "Enter") return;
  const l = toLetter(e.key);
  if (!l) return;
  guess_letter(game, l);
  render();
});

// For testing purpose only
// Display current state in console, for testing and to see that it works like it should. 

function display_current_game (game: hangman_game): string {
  const display_word = game.word.split(" ").map(l => (game.guessed_letters.includes(l as Letter)) ? l: " ").join("");
  return ` Word: ${display_word}
  guess_letter: ${game.guessed_letters.join(", ")}
  Status: ${game.state}` 
};

let hangmanGame = start_hangman("Test");
console.log(display_current_game(hangmanGame));

game = guess_letter(hangmanGame, " ");
console.log(display_current_game(hangmanGame), hangmanGame.guessed_letters);


render();
