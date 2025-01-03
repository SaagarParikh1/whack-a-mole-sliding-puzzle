const puzzleContainer = document.getElementById("puzzle-container");
const shuffleButton = document.getElementById("shuffle-btn");

let tiles = [];

// Create the puzzle grid
function createPuzzle() {
    puzzleContainer.innerHTML = ""; // Clear any existing tiles
    tiles = [];
    for (let i = 1; i <= 8; i++) {
        const tile = document.createElement("div");
        tile.classList.add("tile");
        tile.textContent = i;
        tiles.push(tile);
        puzzleContainer.appendChild(tile);
    }
    // Add the empty tile
    const emptyTile = document.createElement("div");
    emptyTile.classList.add("tile", "empty");
    tiles.push(emptyTile);
    puzzleContainer.appendChild(emptyTile);
}

// Shuffle the puzzle
function shufflePuzzle() {
    for (let i = tiles.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [tiles[i], tiles[j]] = [tiles[j], tiles[i]];
    }
    updatePuzzle();
}

// Update the puzzle layout
function updatePuzzle() {
    puzzleContainer.innerHTML = "";
    tiles.forEach((tile) => puzzleContainer.appendChild(tile));
}

// Handle tile movement
function moveTile(tile) {
    const tileIndex = tiles.indexOf(tile);
    const emptyIndex = tiles.indexOf(document.querySelector(".tile.empty"));

    // Check if the tile is adjacent to the empty tile
    const isAdjacent =
        tileIndex === emptyIndex - 1 || // Left
        tileIndex === emptyIndex + 1 || // Right
        tileIndex === emptyIndex - 3 || // Above
        tileIndex === emptyIndex + 3; // Below

    if (isAdjacent) {
        [tiles[tileIndex], tiles[emptyIndex]] = [tiles[emptyIndex], tiles[tileIndex]];
        updatePuzzle();
    }
}

// Add click listeners to tiles
function addTileListeners() {
    tiles.forEach((tile) => {
        tile.addEventListener("click", () => moveTile(tile));
    });
}

// Initialize the puzzle
function init() {
    createPuzzle();
    shufflePuzzle();
    addTileListeners();
}

shuffleButton.addEventListener("click", () => {
    shufflePuzzle();
    addTileListeners();
});

init();
