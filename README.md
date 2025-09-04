# Typescript + ENUMS and LITERAL TYPES - Group 8
Gentiana and Sara. 

### Enums and Literal Types

## The game: Hangman -> Tutorial of the code. 
First of all we want to decide a game state for our game, in this case we have 3 different states, Playing, Won and Lost. 
With <b>ENUM</b> we can put those states like this. 

enum gameState {
  Playing,
  Won,
  Lost, 
};

With this we can change the different game states to our functions we will build. 
Like for exampel, gameState.Playing, gameState.Won, gameState.Lost. <i>How these will look inside of function will be displayed further down on thi page.</i> 

Lets continue to the <b>Literal Types</b>.
In our case as we build a hangman game, we can with types decide which letters that will be "right" to use.

exampel for this on our code is:

type Letter =
  | "a" | "b" | "c" | "d" | "e" | "f" | "g"
  | "h" | "i" | "j" | "k" | "l" | "m" | "n"
  | "o" | "p" | "q" | "r" | "s" | "t" | "u"
  | "v" | "w" | "x" | "y" | "z";

