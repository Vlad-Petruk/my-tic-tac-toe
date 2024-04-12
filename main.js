const Gameboard = (()=> {
    const gameboard = new Array(9).fill('');

    function getBoard() {
        return gameboard;
    }

    function clearBoard() {
        return gameboard = new Array(9).fill('');
    }

    const winningCombinations = [
        [0,1,2], [1,2,3], [2,3,4], 
        [3,4,5], [4,5,6], [6,7,8],
    ]

    return {
        getBoard,
        clearBoard,
        winningCombinations
    }
})();

function createPlayer(name, marker) {
    return { name, marker }
}


const DisplayController = (()=> {
    const boardBox = document.querySelector('.board-container');

    const board = Gameboard.getBoard();
    function renderBoard() {
        for(let i=0; i< board.length; i++) {
            const box = document.createElement('div');
            box.classList.add('board-box') 
            box.id = `box${i}`;
            box.textContent = `Box ${i} ${board[i]}`

            boardBox.append(box)
        }
    }

    return { renderBoard }
})();


const Game = (() => {
    const playerX = createPlayer('playerX', 'X');
    const playerO = createPlayer('playerO', 'O');
    const board = Gameboard.getBoard();
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
                checkWin()
            } else console.log('Invalid spot')
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
                    return;
                }
            }
    
            currentPlayer = switchPlayer(); 
        }
    }

    function endGame() {
        Gameboard.clearBoard();
    }

    return { 
        markSpot,
        endGame
    }
})();


Game.markSpot(3);
Game.markSpot(7);
Game.markSpot(1);
Game.markSpot(8);
Game.markSpot(0);
Game.markSpot(6);

DisplayController.renderBoard()


console.log(Gameboard.getBoard())