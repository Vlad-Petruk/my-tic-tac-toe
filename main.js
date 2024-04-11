const Gameboard = (()=> {
    const gameboard = new Array(9).fill('');

    function getBoard() {
        return gameboard;
    }

    function clearBoard() {
        return gameboard = new Array(9).fill('');
    }

    const winningCombinations = [
        [1,2,3], [2,3,4], [3,4,5],
        [4,5,6], [6,7,8], [7,8,9]
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

})();


const Game = (() => {
    const playerX = createPlayer('playerX', 'X');
    const playerO = createPlayer('playerO', 'O');
    const board = Gameboard.getBoard();
    let currentPlayer = playerX;

    function changeTurn() {
        return (currentPlayer === playerX) ? playerO : playerX;
    }

    function markSpot(index) {
        if (index < 0 || index > 8) {
            console.log ('Invalid index')
        } else {
            if (board[index] === '') {
                board[index] = currentPlayer.marker;
                currentPlayer = changeTurn();
            } else console.log('Invalid spot')
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


Game.markSpot(8);
Game.markSpot(3);
Game.markSpot(12);
Game.markSpot(0);
Game.markSpot(0);




console.log(Gameboard.getBoard())