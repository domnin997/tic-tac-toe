import LSService from "./LSService.js";

const x_class = 'x';
const o_class = 'o';

// let oTurn;

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

// Для направления в LS

const {getProgressLS, setProgressLS} = LSService();

function pageLoad () {
    if (getProgressLS()) {
        return getProgressLS();
    } else {
        return {oCells: [], xCells: [], oTurn: false};
    };
}

const gameCells = document.querySelectorAll('.cell');
const gameField = document.querySelector('.game-field');
const gameOverWindow = document.querySelector('.game-over-window');
const gameOverMsgBlock = document.querySelector('.game-over-msg');
const gameOverMsg = document.querySelector('.game-over-window__text');
const progressWindow = document.querySelector('.progress-dialog');
const resetBtns = document.querySelectorAll('.reset-btn');
const continueBtn = document.querySelector('.continue-btn');

gameCells.forEach((cell, index) => {
    cell.addEventListener('click' , () => {
        if (oTurn) {
            oCells.push(index);
        } else {
            xCells.push(index);
        }
    })
})

let {oCells, xCells, oTurn} = pageLoad();

resetBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
        oCells = [];
        xCells = [];
        oTurn = false;
        setProgressLS([], [], false);
        gameOverWindow.classList.remove('show');
        progressWindow.classList.remove('show');
        gameCells.forEach((cell, index) => {
            cell.classList.remove('x');
            cell.classList.remove('o');
            cell.removeEventListener('click', handleClick);
            cell.addEventListener('click', handleClick, {once: true});
        })
        startGame();
        
    })
})


if (oCells.length > 0 || xCells.length > 0) {
    
    gameOverWindow.classList.add('show');
    progressWindow.classList.add('show');

        continueBtn.addEventListener('click', () => {

            gameOverWindow.classList.remove('show');
            progressWindow.classList.remove('show');

            oCells.forEach((index) => {
                gameCells[index].classList.add('o');
            })
            
            xCells.forEach((index) => {
                gameCells[index].classList.add('x');
            })
            
            startGame();
        })
} else {
    startGame();
}

console.log(oCells, xCells, oTurn);

function startGame () {
    oTurn = false;
    
    gameCells.forEach((cell) => {
        cell.addEventListener('click', handleClick, {once: true});
        // addCellClickHandler(cell, index);
    })

    toggleFieldClass();
}


function handleClick (e) {

    const cell = e.target;
    const currClass = oTurn ? o_class : x_class;

    placeSymbol(cell, currClass);

    if (checkWin(currClass)) {
        endGame(false);
        setProgressLS([], [], false);
    } else if (isDraw()) {
        endGame(true);
        setProgressLS([], [], false);
    } else {
        toggleTurn();
        toggleFieldClass();
        setProgressLS(xCells, oCells, oTurn);
    }  
}

function endGame (noWinner) {
    if (noWinner) {
        gameOverMsg.innerText = `Победила дружба :)`;
    } else {
        gameOverMsg.innerText = `${oTurn ? `Победа нулей!` : `Кресты победили!`}`;
    }

    gameOverWindow.classList.add('show');
    gameOverMsgBlock.classList.add('show');
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


function addCellClickHandler (cell, index) {
    
    if (!cell.classList.contains('x') && !cell.classList.contains('o')) {
        cell.addEventListener('click', (e) => handClick(e, index), {once: true})
    }
}




// function handClick (event, index) {
//     const cell = event.target;
//     const currClass = oTurn ? o_class : x_class;

//             placeSymbol(cell, currClass);

//             if (checkWin(currClass)) {
//                 endGame(false);
//                 setProgressLS([], [], false);
//             } else if (isDraw()) {
//                 endGame(true);
//                 setProgressLS([], [], false);
//             } else {
//                 toggleTurn();
//                 toggleFieldClass();
//                 setProgressLS(xCells, oCells, oTurn);
//             }  
// }