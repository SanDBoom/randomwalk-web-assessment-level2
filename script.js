const cells = document.querySelectorAll('[data-cell]');
const statusText = document.getElementById('status');
const resetButton = document.getElementById('reset');
const scoreX = document.getElementById('score-x');
const scoreO = document.getElementById('score-o');
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
    return winPatterns.some(pattern => {
        return pattern.every(index => board[index] === currentPlayer);
    });
}

// Check for a draw
function checkDraw() {
    return board.every(cell => cell !== '');
}

// Handle a player move
function handleCellClick(e) {
    const cell = e.target;
    const cellIndex = Array.from(cells).indexOf(cell);

    if (board[cellIndex] !== '' || !gameActive) return;

    board[cellIndex] = currentPlayer;
    cell.textContent = currentPlayer;

    if (checkWin()) {
        statusText.textContent = `Player ${currentPlayer} wins!`;
        gameActive = false;
        updateScore(currentPlayer);
    } else if (checkDraw()) {
        statusText.textContent = 'Draw!';
        gameActive = false;
    } else {
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
    currentPlayer = 'X';
    statusText.textContent = `Player ${currentPlayer}'s turn`;
    gameActive = true;
}

// Event listeners
cells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetButton.addEventListener('click', resetGame);
