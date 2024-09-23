// Get all elements from HTML
const cells = document.querySelectorAll('[data-cell]');
const statusText = document.getElementById('status');
const resetButton = document.getElementById('reset');
const scoreX = document.getElementById('score-x');
const scoreO = document.getElementById('score-o');
// Set initial game state: Player X always starts first
let currentPlayer = 'X';

let score = { X: 0, O: 0 };
let gameActive = true;
let board = ['', '', '', '', '', '', '', '', ''];

// Winning combinations (rows, columns, diagonals)
const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

// Check if current player has won
function checkWin() {
    // Loop through each win pattern and check if the board contains the current player's marks in any pattern
    return winPatterns.some(pattern => {
        return pattern.every(index => board[index] === currentPlayer);
    });
}

// Check for a draw
function checkDraw() {
    // If every cell in the board array is filled, it's a draw
    return board.every(cell => cell !== '');
}

// Handle a player move
function handleCellClick(e) {
    const cell = e.target;// Get the clicked cell
    const cellIndex = Array.from(cells).indexOf(cell);

    if (board[cellIndex] !== '' || !gameActive) return;

    board[cellIndex] = currentPlayer;
    cell.textContent = currentPlayer;// Display the symbol in the UI

    if (checkWin()) {
        statusText.textContent = `Player ${currentPlayer} wins!`;// Update status message
        gameActive = false;// End the game
        updateScore(currentPlayer);// Update the score for the winner
    } else if (checkDraw()) {
        statusText.textContent = 'Draw!';// Update status message
        gameActive = false;// End the game
    } else {
        // If the game is not over, switch to the other player's turn
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        statusText.textContent = `Player ${currentPlayer}'s turn`;
    }
}

// Update scorecard
function updateScore(winner) {
    score[winner]++;
    scoreX.textContent = score.X;
    scoreO.textContent = score.O;
}

// Reset the game
function resetGame() {
    board.fill('');
    cells.forEach(cell => (cell.textContent = ''));
    currentPlayer = 'X';// Reset the turn to Player X
    statusText.textContent = `Player ${currentPlayer}'s turn`;
    gameActive = true;// Reactivate the game
}

// Event listeners
cells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetButton.addEventListener('click', resetGame);
