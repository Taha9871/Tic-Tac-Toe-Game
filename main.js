document.addEventListener('DOMContentLoaded', () => {
    const cells = document.querySelectorAll('.container > div');
    const player1Input = document.getElementById('player1');
    const player2Input = document.getElementById('player2');
    const startDialog = document.getElementById('start-dialog');
    const startButton = startDialog.querySelector('button[type="submit"]');
    const turnInfo = document.getElementById('turn-info');
    const winnerInfo = document.getElementById('winner-info');
    let currentPlayer = 'X';
    let player1Name = 'Player 1';
    let player2Name = 'Player 2';
    let gameEnded = false;
    let restartButton;

    startDialog.showModal();

    startButton.addEventListener('click', () => {
        player1Name = player1Input.value || 'Player 1';
        player2Name = player2Input.value || 'Player 2';
        startDialog.close();
        updateTurnInfo();
    });

    function displayWinner(winner) {
        if (winner) {
            winnerInfo.textContent = `${winner} is the winner!`;
            winnerInfo.style.display = 'block'; 
        } else {
            winnerInfo.textContent = "Draw";
            winnerInfo.style.display = 'block'; 
        }

        turnInfo.style.display = 'none';
        gameEnded = true;
        showRestartButton(); 
    }

    function updateTurnInfo() {
        turnInfo.textContent = `${currentPlayer === 'X' ? player1Name : player2Name}'s turn`;
    }

    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    function checkWinner() {
        let winner = null;
        winningCombinations.forEach(combination => {
            const [a, b, c] = combination;
            if (cells[a].textContent && cells[a].textContent === cells[b].textContent && cells[a].textContent === cells[c].textContent) {
                winner = cells[a].textContent;
            }
        });

        if (winner) {
            displayWinner(winner === 'X' ? player1Name : player2Name);
            return;
        } 
        else if (Array.from(cells).every(cell => cell.textContent !== '')) {
            displayWinner(null);
        }
    }

    function resetGame() {
        cells.forEach(cell => {
            cell.textContent = '';
        });
        currentPlayer = 'X';
        turnInfo.style.display = 'block'; 
        updateTurnInfo();
        winnerInfo.style.display = 'none'; 
        gameEnded = false;
        hideRestartButton(); 
        startDialog.showModal();
    }

    function showRestartButton() {
        if (!restartButton) {
            restartButton = document.createElement('button');
            restartButton.textContent = 'NEW GAME';
            restartButton.style.position = 'fixed';
            restartButton.style.bottom = '10px';
            restartButton.style.right = '10px';
            restartButton.addEventListener('click', resetGame);
            document.body.appendChild(restartButton); 
        }
        restartButton.style.display = 'block'; 
    }

    function hideRestartButton() {
        if (restartButton) {
            restartButton.style.display = 'none'; 
        }
    }

    cells.forEach(cell => {
        cell.addEventListener('click', () => {
            if (cell.textContent === '' && !gameEnded) { 
                cell.textContent = currentPlayer;
                checkWinner();
                currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
                updateTurnInfo();
            }
        });
    });
});
