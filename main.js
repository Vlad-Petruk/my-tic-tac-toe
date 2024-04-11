const Gameboard = (()=> {
    const gameboard = new Array(9).fill('');

    function getBoard() {
        return gameboard;
    }

    function clearBoard() {
        return gameboard = new Array(9).fill('');
    }

    return {
        getBoard,
        clearBoard
    }
})();

function createPlayer(name, marker) {
    return { name, marker }
}



const DisplayController = (()=> {

})();

console.log(Gameboard)