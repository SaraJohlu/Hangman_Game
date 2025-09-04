# Typescript + ENUMS and LITERAL TYPES - Group 8
Gentiana and Sara. 

### Enums and Literal Types

## The game: Hangman -> Tutorial of the code. 
First of all we want to decide a game state for our game, in this case we have 3 different states, Playing, Won and Lost. 
With <b>ENUM</b> we can put those states like this. 

enum gameState {
  playing = "PLAYING",
  won = "WON",
  lost = "LOST", 
};

