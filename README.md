# Group 8 - Group assignment for our TypeScript course.
Developers: Gentiana and Sara.
KYHA_FE2024


## The game: Hangman -> Tutorial av koden. 
#### Med Enums och Literal Types

### Vi börjar med att:   
1: Använd dig av den kod edititor som du jobbar i (i vårat fall är det VS-code).   
2. I terminalen skriver du npm create vite@latest . .
  Välj ett namn som passar bra för projektet, välj React och TypeScript i listan av förslag.   
3. Nu är det dags att börja koda.   

Först bestämmer vi ett game state med enums. Så här kan koden kan se ut.   
`enum gameState {
Playing = "PLAYING",
Won = "WON",
Lost = "LOST" }`

- Att tänka på: Att skriva som ovan beskrivet kommer att retunera värdet av ditt state i spelet till antingen Playing, Won eller Lost.
  hade vi däremot skrivit som denna kodrad beskriver  
   `enum gameState {
  Playing,
  Won,
  Lost, 
};`
så hade programmet retunerat 0,1 och 2. Vilket i sin tur inte hade gett mycket av förklaring till den som spelar.
Detta kan säkert vara ett av första problemen man kan stöta på när man använder sig av enums. 

Så med enums kan vi alltså ändra vårat game state beroende på vad våra funktioner gör. Det kan isåfall se ut så här   
gameState.Playing, gameState.Won gameState.Lost.

<i>Hur Dessa ser ut i en funktion kommer vi visa längre ner.</i> 

### Vi fortsätter till <b>Literal Types</b>.
Som i vårat fall, som bygger ett hängagubbe spel så vill vi ge spelaren/spelarna rätta bokstäver att använda sig av. 
Exempel på det kan se ut så här:

`type Letter =
  | "a" | "b" | "c" | "d" | "e" | "f" | "g"
  | "h" | "i" | "j" | "k" | "l" | "m" | "n"
  | "o" | "p" | "q" | "r" | "s" | "t" | "u"  
  | "v" | "w" | "x" | "y" | "z";`   

  - Att tänka på: att använda ÅÄÖ eller till exempel 1 kan leda till encodingproblem, speciellt om man arbetar med äldre versioner av UTF-8
    Samtidigt så är det inte optimalt för internationella sammarbeten kring projekt. Att undvika det ger också en bättre portabilitet
    då APIer, JSON-parses, och databaser kan läsa av tecknena fel.

Med TS är det bra att ha interface, våran ser ut så här   

`interface hangman_game {
  word: String,
  guessed_letters: Letter[],
  max_fails: number,
  state: gameState
};`

Detta säger åt TS hur vårat program ska fungera och vad som är vad. Gör det enkelt att skicka in props i funktioner.  

Nu har vi skapat grunden får vårat program. Dags att gå vidare till att skapa funktioner och gränssnittet. 

## Start Game

- HANGMAN_STEPS, är de olika stegen som kopplas ihop med spelarens gissade bokstav. Beroende på om gissningen är rätt eller inte, vid fel svar implementeras stegen en för en i funktionen start_hangman. Här skickar vi in att ordet är av typen string som parameter, gissade antal bokstävers array är tom. Vi ser till att oavsett stor eller liten bokstav så är gissade ordet OK med metoden toLowerCase. Sedan sätter vi vårat gamestate till playing och vårat första steg av HANGMAN_STEPS.

- 


    ### Övningsuppgift

Visa antal gissningar: Lägg till en räknare som visar hur många bokstäver spelaren har gissat totalt (rätt + fel).

<b>Ledtrådar:</b>

Spara gissade bokstäver i en lista, t.ex. guessedLetters.
Använd guessedLetters.length för att räkna.
Uppdatera ett element i DOM:en med textContent när spelaren gissar

    


