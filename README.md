# Group 8 - Group assignment for our TypeScript course.
Developers: Gentiana and Sara.   




## The game: Hangman -> Tutorial of the code. 
#### With Enums and Literal Types

First of all we want to decide a game state for our game, in this case we have 3 different states, Playing, Won and Lost. 
With <b>ENUM</b> we can put those states like this. 

`enum gameState {
Playing = "PLAYING",
Won = "WON",
Lost = "LOST" }`

- Side note: Writing this will put the states not as playing, won or lost. It will render out 0,1 and 2 depending on what the outcome is.
   
`enum gameState {
  Playing,
  Won,
  Lost, 
};`
<b>Example</b>: Status: 0 instead of Status: Playing.

With this we can change the different game states to our functions we will build. 
Like for exampel, gameState.Playing, gameState.Won, gameState.Lost.   
<i>How these will look inside of a function will be displayed further down on this page.</i> 

Lets continue to the <b>Literal Types</b>.
In our case as we build a hangman game, we can with types decide which letters that will be "right" to use.

exampel for this on our code is:

`type Letter =
  | "a" | "b" | "c" | "d" | "e" | "f" | "g" <br>
  | "h" | "i" | "j" | "k" | "l" | "m" | "n"
  | "o" | "p" | "q" | "r" | "s" | "t" | "u"  
  | "v" | "w" | "x" | "y" | "z";`

