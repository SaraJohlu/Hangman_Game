# Group 8 - Group assignment for our TypeScript course.
Developers: Gentiana and Sara.   




## The game: Hangman -> Tutorial of the code. 
#### With Enums and Literal Types

### First of all, lets start up the project.   
1: Use your code editor (our case, VS code).   
2. Create a new project with npm create vite@latest .
   Chose a sutble name, chose Vanilla and then TypeScript in the list. Clean up the files after your own liking.   
3. And now to the fun part, Codeing. Lets decide state for the game, as a player its nice to know in this case 3 important things, Playing, Won or Lost. 
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
<b>Example</b>: Status: 0 instead of Status: Playing. Can lead too confusion.

With this we can change the different game states to our functions we will build. 
Like for exampel:  
gameState.Playing, gameState.Won, gameState.Lost.   
<i>How these will look inside of a function will be displayed further down on this page.</i> 

### Lets continue to the <b>Literal Types</b>.
In our case as we build a hangman game, we can with types decide which letters will be the "right" ones to use.

exampel for this on our code is:

`type Letter =
  | "a" | "b" | "c" | "d" | "e" | "f" | "g"
  | "h" | "i" | "j" | "k" | "l" | "m" | "n"
  | "o" | "p" | "q" | "r" | "s" | "t" | "u"  
  | "v" | "w" | "x" | "y" | "z";`   

  - Side note: Why not Å Ä Ö?
    


