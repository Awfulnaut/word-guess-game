var letters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
var wordBank = ["test", "derp", "honk"]

// Store a random word from wordBank as the currentWord in array form
var currentWord;
function getWord() {
  currentWord = wordBank[Math.floor(Math.random() * wordBank.length)].toUpperCase().split("");
}
getWord();

// Convert the currentWord into an array of underscores that will be used as the in-progress word
var wordInProgress = [];
currentWord.forEach(function(letter) {
  wordInProgress.push("_");
});

var displayWord = wordInProgress.join(' ');
var guesses = [];
var guessesLeft = 10;
var wins = 0;

// Update the DOM with values for wins, guesses remaining, and letters guessed
function update() {
  document.querySelector("#wins").innerHTML = wins;
  document.querySelector("#current-word").innerHTML = displayWord;
  document.querySelector("#guesses-left").innerHTML = guessesLeft;
  document.querySelector("#guesses").innerHTML = guesses.join(", ");
}

// Reset the game by selecting a new word and updating the DOM
function reset() {
  guesses = [];
  guessesLeft = 10;
  getWord();
  update();
  console.log(currentWord);
}

// Set the DOM for the first time
reset();

// Check for win condition (if currentWord has no more underscores)
if (wordInProgress.indexOf("_") == -1) {
  wins++;
  update();
  alert("You win!");
}

document.onkeyup = function(event) {
  var userGuess = event.key.toUpperCase();

  // Check if key pressed is a letter
  if (letters.indexOf(userGuess) >= 0) {

    // Check if key pressed is in the current word
    if (currentWord.indexOf(userGuess) >= 0) {
      // Replace the underscore with userGuess
      // Also needs to replace any repeated letters (STILL NEED TO DO)
      wordInProgress[currentWord.indexOf(userGuess)] = userGuess;
      displayWord = wordInProgress.join(' ');
      update();

    // If userGuess doesn't match any letter in currentWord AND hasn't been guessed before 
    } else if (currentWord.indexOf(userGuess) == -1 && guesses.indexOf(userGuess) == -1) {
      guesses.push(userGuess);
      guessesLeft--;
      update();

      // If no more guesses left, you lose the game and it resets
      if (guessesLeft == 0) {
        alert('You lose! The word was "' + currentWord.join("") + '"');
        reset();
      }

    }

  };
};