// Game variables
const gridSquares = document.querySelectorAll('.grid-square');
const scoreDisplay = document.getElementById('score');
const timeLeftDisplay = document.getElementById('time-left');
const startButton = document.getElementById('start-btn');
const pauseButton = document.getElementById('pause-btn');
const endButton = document.getElementById('end-btn');

let score = 0;
let timeLeft = 30;
let timerInterval;
let moleTimer;
let isGamePaused = false;

// Function to start the game
function startGame() {
    score = 0;
    timeLeft = 30;
    scoreDisplay.textContent = score;
    timeLeftDisplay.textContent = timeLeft;

    startButton.disabled = true;
    pauseButton.disabled = false;
    endButton.disabled = false;

    timerInterval = setInterval(countDown, 1000);  // Countdown timer for the game
    moleTimer = setInterval(showMole, 800);  // Mole appearance timer
}
// Pause Game Function
function pauseGame() {
  clearInterval(timerInterval);
  clearInterval(moleTimer);
  isGamePaused = true;
  pauseButton.textContent = "⏵︎ Resume Game";  // Change button text to "Resume"
}

// Resume Game (if paused) Function
function resumeGame() {
  timerInterval = setInterval(countDown, 1000);
  moleTimer = setInterval(showMole, 800);
  pauseButton.textContent = "⏸︎ Pause Game";  // Reset button text back to "Pause"
  isGamePaused = false;
}

// End Game Function
function endGame() {
  clearInterval(timerInterval);
  clearInterval(moleTimer);
  alert(`Game Over! Your score is ${score}.`);

  // Reset the game state
  startButton.disabled = false;
  pauseButton.disabled = true;
  endButton.disabled = true;
}
// Countdown function
function countDown() {
    timeLeft--;
    timeLeftDisplay.textContent = timeLeft;

    if (timeLeft === 0) {
        clearInterval(timerInterval);
        clearInterval(moleTimer);
        alert(`Game Over! Your score is ${score}.`);
        startButton.disabled = false;
        pauseButton.disabled = true;
        endButton.disabled = true;
        document.getElementById("popup").style.display = "flex";  // Show the popup again to play again
    }
}

// Function to show a mole in random grid squares
function showMole() {
    gridSquares.forEach(square => {
        square.innerHTML = ''; // Clear previous mole
    });

    const randomSquare = gridSquares[Math.floor(Math.random() * gridSquares.length)];
    const mole = document.createElement('div');
    mole.classList.add('mole', 'active');

    mole.addEventListener('click', () => {
        score++;
        scoreDisplay.textContent = score;
        mole.classList.remove('active'); // Prevent multiple clicks on the same mole
    });

    randomSquare.appendChild(mole);
}

// JavaScript to control the popup visibility and game start
window.onload = function() {
    // Display the popup when the page loads
    document.getElementById("popup").style.display = "flex";

    // Start game when the button in the popup is clicked
    document.getElementById("start-btn").addEventListener("click", function() {
        // Hide the popup
        document.getElementById("popup").style.display = "none";
        // Start the game logic
        startGame();
    });
    // Pause button event
pauseButton.addEventListener('click', function() {
  if (isGamePaused) {
    resumeGame();  // Resume game if paused
  } else {
    pauseGame();   // Pause the game
  }
});

// End button event
endButton.addEventListener('click', endGame);
};

function showMole() {
  gridSquares.forEach(square => {
      square.innerHTML = ''; // Clear previous mole
  });

  const randomSquare = gridSquares[Math.floor(Math.random() * gridSquares.length)];
  const mole = document.createElement('div');
  mole.classList.add('mole', 'active');

  // Add click event listener for the mole
  mole.addEventListener('click', () => {
      if (!mole.classList.contains('hit')) {
          score++;
          scoreDisplay.textContent = score;
          mole.classList.add('hit'); // Trigger the noticeable animation

          // Remove the mole after animation completes
          setTimeout(() => {
              mole.remove();
          }, 500); // Match the animation duration (0.5s)
      }
  });

  randomSquare.appendChild(mole);
}
