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
```
enum gameState {
Playing = "PLAYING",
Won = "WON",
Lost = "LOST" }`
```

- Att tänka på: Att skriva som ovan beskrivet kommer att retunera värdet av ditt state i spelet till antingen Playing, Won eller Lost.
  hade vi däremot skrivit som denna kodrad beskriver  
   ```
  enum gameState {
  Playing,
  Won,
  Lost, };
``
så hade programmet retunerat 0,1 och 2. Vilket i sin tur inte hade gett mycket av förklaring till den som spelar.
Detta kan säkert vara ett av första problemen man kan stöta på när man använder sig av enums. 

Så med enums kan vi alltså ändra vårat game state beroende på vad våra funktioner gör. Det kan isåfall se ut så här   
gameState.Playing, gameState.Won gameState.Lost.

<i>Hur Dessa ser ut i en funktion kommer vi visa längre ner.</i> 

### Vi fortsätter till <b>Literal Types</b>.
Som i vårat fall, som bygger ett hängagubbe spel så vill vi ge spelaren/spelarna rätta bokstäver att använda sig av. 
Exempel på det kan se ut så här:

```
type Letter =
  | "a" | "b" | "c" | "d" | "e" | "f" | "g"
  | "h" | "i" | "j" | "k" | "l" | "m" | "n"
  | "o" | "p" | "q" | "r" | "s" | "t" | "u"  
  | "v" | "w" | "x" | "y" | "z";`
```  

  - Att tänka på: att använda ÅÄÖ eller till exempel 1 kan leda till encodingproblem, speciellt om man arbetar med äldre versioner av UTF-8
    Samtidigt så är det inte optimalt för internationella sammarbeten kring projekt. Att undvika det ger också en bättre portabilitet
    då APIer, JSON-parses, och databaser kan läsa av tecknena fel.


För spel som dessa, speciellt när det kommer till att hantera olika lägen av ett projekt så är enums ett bra val att använda sig av. 



<b>Med TS är det bra att ha interface, våran ser ut så här</b>   

```
  interface hangman_game {
  word: String,
  guessed_letters: Letter[],
  max_fails: number,
  state: gameState
}; 
```

Detta säger åt TS hur vårat program ska fungera och vad som är vad. Gör det enkelt att skicka in props i funktioner.  

Nu har vi skapat grunden får vårat program. Dags att gå vidare till att skapa funktioner och gränssnittet. 

## Start Game

### HANGMAN_STEPS and other functions. Mindre förklaring av vad de har för funktioner
HANGMAN_steps är de olika stegen som kopplas ihop med spelarens gissade bokstav. Beroende på om gissningen är rätt eller inte, vid fel svar implementeras stegen en för en i funktionen start_hangman. Här skickar vi in att ordet är av typen string som parameter, gissade antal bokstävers array är tom. Vi ser till att oavsett stor eller liten bokstav så är gissade ordet OK med metoden toLowerCase som konverterar alla bokstäver till små. Sedan sätter vi vårat gamestate till playing och vårat första steg av HANGMAN_STEPS.
Hangman steps kan se ut så här -->
```
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
```


<b>toLetter</b>
funktionen ser till att det som passas in alltid kommer vara ett tecken mellan a - z. Skulle något skickas in som inte är ett av dessa tecken kommer funktionen retunera null.
```
function toLetter(ch: string): Letter | null {
  const c = ch.toLowerCase();
  if (c.length === 1 && c >= "a" && c <= "z") return c as Letter;
  return null;
}
```
<b>masked_word</b>
ser till att att vi har _ under de bokstäver som inte än blivit gissade. 
```
function masked_word(game: hangman_game): string {
  return game.word.split("")
    .map(ch => (ch >= "a" && ch <= "z")
      ? (game.guessed_letters.includes(ch as Letter) ? ch : "_")
      : ch
    )
    .join(" ");
}
```

<b>failcount</b>
Funktionen ser till att spelet kommer att retunera hur många antal fel gissningar spelaren gjort i typen nummer. 
```
function failCount(game: hangman_game): number {
  return game.guessed_letters.filter(l => !game.word.includes(l)).length;
} 
```
<b>guess_letter</b>
Vi ser till att så länge game state inte kommer att vara Playing så kommer spelet vara game over. Alltså inte spelas. 
Därefter ser funktionen till att de bokstäver som spelaren gissar skickas in i toLetter arrayen. Därefter kör programmet en jämförelse med rätt gissade bokstäver mot fel gissade bokstäver. 
Är fel gissade bokstäver >= max_fails så kommer spelet retunera game state Lost.   
Exxempel på kod:
```
function guess_letter(game: hangman_game, letterInput: string): hangman_game {
  if (game.state !== gameState.Playing) return game; //
    const letter = toLetter(letterInput);
  if (!letter) return game;
  if (!game.guessed_letters.includes(letter)) {
    game.guessed_letters.push(letter); 
  }
  const fail = failCount(game); 
  if (fail >= game.max_fails) {
    game.state = gameState.Lost;
  }
  else if (game.word.split("").every(l => game.guessed_letters.includes(l as Letter))) {
    game.state = gameState.Won;
  }
  return game;
};
```
# Starta Appen 
Dessa kod rader visar hur man startar upp programmet. Självklart behövs mer till gränssnittet för att det ska kunna renderas korrekt. Dessa kodrader finns under main.tsx längre ner på sidan.    
Detta säger mer eller mindre, om datorn inte hittar applikationen kommer error visas med fel meddelande.
annars deklarerar man att game kommer att vara spelet med ett start ordet Programmering
```
const app = document.querySelector<HTMLDivElement>("#app");
if (!app) throw new Error("Could not find #app");

let game = start_hangman("Programmering"); 
```
game kommer sedan tillsammans med de andra funktionerna sättas in i DOM gränssnittet inom html taggar.

# Övningsuppgift för grupp 9

- Visa antal gissningar: Lägg till en räknare som visar hur många bokstäver spelaren har gissat totalt (rätt + fel).

### <b>Ledtrådar:</b>
Spara gissade bokstäver i en lista, t.ex. guessedLetters.
Använd guessedLetters.length för att räkna.
Uppdatera ett element i DOM:en med textContent när spelaren gissar

    


