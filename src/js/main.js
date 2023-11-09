const x_class = 'x';
const o_class = 'o';

const win_combos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

const gameCells = document.querySelectorAll('.cell');
const gameField = document.querySelector('.game-field');
const gameOverWindow = document.querySelector('.game-over-window');
const gameOverMsg = document.querySelector('.game-over-window__text');

let oTurn;

startGame();

function startGame () {
    oTurn = false;
    
    gameCells.forEach((cell) => {
        cell.addEventListener('click', handleClick, {once: true})
    });

    toggleFieldClass();
}


function handleClick (e) {

    const cell = e.target;
    const currClass = oTurn ? o_class : x_class;
    
    placeSymbol(cell, currClass);

    if (checkWin(currClass)) {
        endGame(false);
    } else if (isDraw()) {
        endGame(true);
    } else {
        toggleTurn();
        toggleFieldClass();
    }  
}

function endGame (noWinner) {
    if (noWinner) {
        gameOverMsg.innerText = `Победила дружба :)`;
    } else {
        gameOverMsg.innerText = `${oTurn ? `Победа нулей!` : `Кресты победили!`}`;
    }

    gameOverWindow.classList.add('show');
}

function isDraw () {
    return Array.from(gameCells).every((cell) => {
        return cell.classList.contains(x_class) ||
               cell.classList.contains(o_class);
    })
}

function placeSymbol (cell, currClass) {
    cell.classList.add(currClass);
}

function toggleTurn () {
    oTurn = !oTurn;
}

function toggleFieldClass () {
    gameField.classList.remove(x_class);
    gameField.classList.remove(o_class);

    if (oTurn) {
        gameField.classList.add(o_class);

    } else {
        gameField.classList.add(x_class);
    }
}

function checkWin (currClass) {
    return win_combos.some((combo) => {
        return combo.every(index => {
            return gameCells[index].classList.contains(currClass);
        })
    })
}