const Gameboard = (()=> {
    let gameboard = new Array(9).fill('');

    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8], 
        [0, 4, 8], [2, 4, 6]             
    ];

    return {
        gameboard,
        winningCombinations
    }
})();

let board = Gameboard.gameboard;

function createPlayer(name, marker) {
    return { name, marker }
}


const DisplayController = (()=> {
    const mainBox = document.querySelector('.main-container')
    const boardBox = document.querySelector('.board-container');
    const winnerBox = document.createElement('div');

    const newGameBtn = document.createElement('button');
    newGameBtn.classList.add('new-game-btn');
    newGameBtn.textContent= 'New game';
    newGameBtn.addEventListener('click', ()=>{
        Game.endGame();
    })
    mainBox.append(newGameBtn);
    mainBox.append(winnerBox)

    function renderBoard() {
        boardBox.textContent = ''
        for(let i=0; i< board.length; i++) {
            const box = document.createElement('div');
            box.classList.add('board-box') 
            box.id = `box${i}`;
            box.textContent = `${board[i]}`;
            (function(index) {
                box.addEventListener('click', () => {
                    boardBox.textContent = '';
                    Game.markSpot(index);
                });
            })(i);

            boardBox.append(box)
        }
    }

    function announceWinner(winner) {
        if (winner === 'Tie') {
            winnerBox.textContent = 'Tie!';
        } else winnerBox.textContent = `${winner} won!`;
    }

    function clearBoard() {
        board = new Array(9).fill('');
        renderBoard();
        Gameboard.gameboard = new Array(9).fill('');
        winnerBox.textContent = '';
    }

    return { renderBoard, clearBoard, announceWinner }
})();


const Game = (() => {
    const playerX = createPlayer('playerX', 'X');
    const playerO = createPlayer('playerO', 'O');
   
    let currentPlayer = playerX;

    function switchPlayer() {
        return (currentPlayer === playerX) ? playerO : playerX;
    }

    function markSpot(index) {
        if (index < 0 || index > 8) {
            console.log ('Invalid index')
        } else {
            if (board[index] === '') {
                board[index] = currentPlayer.marker;
                DisplayController.renderBoard()
                const result = checkWin(); 
                if (result !== 'Win') {
                    currentPlayer = switchPlayer(); 
                } 
            } else {
                DisplayController.renderBoard()
                console.log('Invalid spot')
            }
        }
    }

    function checkTie() {
        return (board.includes('')) ? false : true;
    }

    function checkWin () {
        if(checkTie()) {
            return DisplayController.announceWinner('Tie')
        } else {
            for (const combination of Gameboard.winningCombinations) {
                const [a, b, c] = combination;
                if (board[a] !== '' && board[a] === board[b] && board[a] === board[c]) {
                    console.log(`${currentPlayer.name} wins!`);
                    DisplayController.announceWinner(currentPlayer.name)
                    return 'Win';
                }
            }  
            return null 
        }
    }

    function endGame() {
        DisplayController.clearBoard();
        currentPlayer = playerX;
    }

    return { 
        markSpot,
        endGame
    }
})();

DisplayController.renderBoard()


console.log(Gameboard.gameboard)