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

    const newGameBtn = document.createElement('button');
    newGameBtn.classList.add('new-game-btn');
    newGameBtn.textContent= 'New game';
    newGameBtn.addEventListener('click', ()=>{
        Game.endGame();
    })
    mainBox.append(newGameBtn)


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

    function clearBoard() {
        board = new Array(9).fill('');
        renderBoard();
        Gameboard.gameboard = new Array(9).fill('');
    }

    return { renderBoard, clearBoard }
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
            if (board[index] === ''&& checkWin() !== 'Win') {
                board[index] = currentPlayer.marker;
                DisplayController.renderBoard()
                currentPlayer = switchPlayer(); 
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
            return console.log('Tie')
        } else {
            for (const combination of Gameboard.winningCombinations) {
                const [a, b, c] = combination;
                if (board[a] !== '' && board[a] === board[b] && board[a] === board[c]) {
                    console.log(`${currentPlayer.name} wins!`);
                    currentPlayer = playerX
                    return 'Win';
                }
            }
    
            
        }
    }

    function endGame() {
        DisplayController.clearBoard();
    }

    return { 
        markSpot,
        endGame
    }
})();


// Game.markSpot(3);
// Game.markSpot(7);
// Game.markSpot(1);
// Game.markSpot(8);
// Game.markSpot(0);
// Game.markSpot(6);

DisplayController.renderBoard()


console.log(Gameboard.gameboard)