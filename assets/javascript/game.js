var letters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
var pokemonNames = ["Bulbasaur", "Ivysaur", "Charmander", "Charizard", "Squirtle", "Wartortle", "Caterpie", "Metapod", "Butterfree", "Pidgeotto", "Pidgeot", "Raticate", "Fearow", "Arbok", "Pikachu", "Raichu", "Sandshrew", "Nidoran", "Clefairy", "Clefable", "Vulpix", "Ninetales", "Jigglypuff", "Gloom", "Vileplume", "Paras", "Venonat", "Diglett", "Psyduck", "Primeape", "Growlithe", "Arcanine", "Poliwag", "Abra", "Alakazam", "Bellsprout", "Tentacruel", "Geodude", "Ponyta", "Slowbro", "Magnemite", "Farfetchd", "Dodrio", "Seel", "Dewgong", "Muk", "Cloyster", "Gastly", "Haunter", "Gengar", "Onix", "Krabby", "Exeggcute", "Cubone", "Marowak", "Koffing", "Rhydhorn", "Kangaskhan", "Horsea", "Goldeen", "Seaking", "MrMime", "Scyther", "Jynx", "Magmar", "Pinsir", "Magikarp", "Lapras", "Ditto", "Eevee", "Kabuto", "Kabutops", "Aerodactyl", "Snorlax", "Zapdos", "Moltres", "Dragonite", "Mewtwo"];

var correctWordArr;
var wordInProgress;
var displayWord;
var incorrectGuesses = [];
var correctGuesses = [];
var guessesRemaining = 15;
var wins = 0;
var roundComplete = false;

function getWord() {

  correctWord = pokemonNames[Math.floor(Math.random() * pokemonNames.length)].toUpperCase();
  // Store a random word from pokemonNames as the correctWordArr in array form
  correctWordArr = correctWord.split("");

  // Set wordInProgress to an empty array
  wordInProgress = [];

  // Convert the correctWordArr into an array of underscores that will be used as the in-progress word
  correctWordArr.forEach(function (letter) {
    wordInProgress.push("_");
  });

  // Convert wordInProgress to a displayable string
  displayWord = wordInProgress.join(' ');
};

function changePokemonImage(imageName) {
  document.querySelector('.pokemon-image').src = "assets/images/" + imageName.toLowerCase() + ".png";
}

// Update the DOM with values for wins, guesses remaining, and letters guessed
function update() {
  document.querySelector("#wins").innerHTML = wins;
  document.querySelector("#current-word").innerHTML = displayWord;
  document.querySelector("#guesses-left").innerHTML = guessesRemaining;
  document.querySelector("#guesses").innerHTML = incorrectGuesses.join(", ");
}

// Reset the game
function reset() {
  incorrectGuesses = [];
  correctGuesses = [];
  guessesRemaining = 15;
  wordInProgress = [];
  roundComplete = false;
  document.querySelector('.instruction').innerHTML = "Press any letter to begin";
  changePokemonImage("blank");
  document.querySelector('.pokemon-image').src = "assets/images/blank.jpg";
  getWord();
  update();
}

// Set the DOM for the first time
reset();

// Daclare function the will return the word in progress as letters with correct guesses and underscores
function printWordInProgress(correctWordArr, correctGuesses) {
  var underscoresAndCorrectGuesses = [];
  // for every letter in the current word...
  for (var i = 0; i < correctWordArr.length; i++) {
    // set currentLetter to the letter in current word for each iteration of the loop
    var currentLetter = correctWordArr[i];
    // check if any letter in the current word is in the list of correct guesses already made
    if (correctGuesses.indexOf(currentLetter) !== -1) {
      underscoresAndCorrectGuesses.push(currentLetter);
    } else {
      underscoresAndCorrectGuesses.push("_");
    }
  }
  return underscoresAndCorrectGuesses;
}

document.onkeyup = function (event) {
  var userGuess = event.key.toUpperCase();

  // Check if key pressed is a letter
  if (letters.indexOf(userGuess) >= 0) {

    // Only run if you have guesses remaining
    if (roundComplete === false) {

      // Check if key pressed is in the current word (aka it's a correct guess)
      if (correctWordArr.indexOf(userGuess) >= 0) {

        // Push userGuess to correctGuesses
        correctGuesses.push(userGuess);

        // Replace the underscores with userGuess, including repeated letters
        wordInProgress = printWordInProgress(correctWordArr, correctGuesses);

        // Update displayWord with new values
        displayWord = wordInProgress.join(' ');

        // Update the DOM
        update();

        // Check for win condition (if correctWordArr has no more underscores)
        if (wordInProgress.indexOf("_") == -1) {

          // Increment the win variable
          wins++;

          // Update the page with new instructions
          document.querySelector('.instruction').innerHTML = "Nice work! Click reset to start a new word.";

          // Change pokemon image to show the correct pokemon
          changePokemonImage(correctWord);

          // Update the DOM
          update();

          // Set roundComplete so the player can't continue to play until the round is reset
          roundComplete = true;
        }

        // If userGuess doesn't match any letter in correctWordArr AND hasn't been guessed before 
      } else if (correctWordArr.indexOf(userGuess) == -1 && incorrectGuesses.indexOf(userGuess) == -1) {
        incorrectGuesses.push(userGuess);
        guessesRemaining--;
        update();

        // If no more guesses left, you lose the game and it resets
        if (guessesRemaining == 0) {

          // Update the page with new instructions
          document.querySelector('.instruction').innerHTML = 'You lose! The word was "' + correctWord + '" Click reset to start a new word.';

          // Change pokemon image to show the correct pokemon
          changePokemonImage(correctWord);

          // Set roundComplete so the player can't continue to play until the round is reset
          roundComplete = true;
        }
      }
    }
  };
};