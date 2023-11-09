import LSService from "./LSService.js";
import getDOMElements from "./DOMElements.js";

const { gameCells, gameField, modalOverlay, gameOverMsgBlock, 
        gameOverMsg, progressWindow, resetBtns, continueBtn
      } = getDOMElements();

const {setProgressLS, getDataFirstLoad} = LSService();

let {oCells, xCells, oTurn} = getDataFirstLoad();

const x_class = 'x';
const o_class = 'o';
const win_combos = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6],
                    [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6],];

gameCells.forEach((cell, index) => {
    cell.addEventListener('click' , () => {
        if (oTurn) {
            oCells.push(index);
        } else {
            xCells.push(index);
        }
    })
})

resetBtns.forEach((btn) => {
    
    btn.addEventListener('click', () => {
      
      oCells = [];
      xCells = [];
      oTurn = false;
        
        setProgressLS(oCells, xCells, oTurn);

          modalOverlay.classList.remove('show');
          progressWindow.classList.remove('show');

            gameCells.forEach((cell) => {
              cell.classList.remove('x');
              cell.classList.remove('o');
              cell.removeEventListener('click', handleClick);
              cell.addEventListener('click', handleClick, {once: true});
            })

        toggleFieldClass();
        
    })
})

if (oCells.length > 0 || xCells.length > 0) {
    
    modalOverlay.classList.add('show');
    progressWindow.classList.add('show');

        continueBtn.addEventListener('click', () => {

            modalOverlay.classList.remove('show');
            progressWindow.classList.remove('show');

            oCells.forEach((index) => {
                gameCells[index].classList.add('o');
            })
            
            xCells.forEach((index) => {
                gameCells[index].classList.add('x');
            })
        
            gameCells.forEach((cell) => {
                if (!cell.classList.contains('x') && !cell.classList.contains('o')) {
                    cell.addEventListener('click', handleClick, {once: true})
                }
            })
            toggleFieldClass();
        })} 
else {
    gameCells.forEach((cell) => {
        cell.addEventListener('click', handleClick, {once: true});
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

    modalOverlay.classList.add('show');
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