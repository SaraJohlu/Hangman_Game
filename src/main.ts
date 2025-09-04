import './style.css'

// ---------- States ----------
enum gameState {
  playing = "PLAYING",
  won = "WON",
  lost = "LOST",
};

// ---------- Letters (a–z som union-typ) ----------
type Letter =
  | "a"|"b"|"c"|"d"|"e"|"f"|"g"|"h"|"i"|"j"
  | "k"|"l"|"m"|"n"|"o"|"p"|"q"|"r"|"s"|"t"
  | "u"|"v"|"w"|"x"|"y"|"z";

// ---------- Game interface ----------
interface hangman_game {
  word: string;
  guessed_letters: Letter[];
  max_fails: number;
  state: gameState;
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
function start_hangman(word: string): hangman_game {
  return {
    word: word.toLowerCase(),
    guessed_letters: [],
    max_fails: HANGMAN_STEPS.length - 1, // link to hangman steps (last step = lost)
    state: gameState.playing,
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

//  Guess a letter 
function guess_letter(game: hangman_game, letterInput: string): hangman_game {
  if (game.state !== gameState.playing) return game;

  const letter = toLetter(letterInput);
  if (!letter) return game;

  if (!game.guessed_letters.includes(letter)) {
    game.guessed_letters.push(letter);
  }

  const fail = failCount(game);

  if (fail >= game.max_fails) {
    game.state = gameState.lost;
  } else {
    // win if every letter in the word is included in guessed_letters
    const allGuessed = game.word
      .split("")
      .every(ch => !(ch >= "a" && ch <= "z") || game.guessed_letters.includes(ch as Letter));
    if (allGuessed) game.state = gameState.won;
  }

  return game;
}

/*Simple UI */
const app = document.querySelector<HTMLDivElement>("#app");
if (!app) throw new Error("Could not find #app");

let game = start_hangman("Programmering"); // change the starting word here

function render() {
  const fails = failCount(game);

  app!.innerHTML = `
  <div class="container">
    <div class="card ${
      game.state === gameState.won ? "won" : 
      game.state === gameState.lost ? "lost" : ""
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

render();
