import getDOMElements from "./DOMElements.js";
const {gameCells, gameField} = getDOMElements();

export const toggleFieldClass = function (xClass, oClass, oTurn) {
    
    gameField.classList.remove(xClass);
    gameField.classList.remove(oClass);

    if (oTurn) {
        gameField.classList.add(oClass);

    } else {
        gameField.classList.add(xClass);
    }
}

export const placeSymbol = function (cell, currClass) {
    cell.classList.add(currClass);
}

export const displaySavedProgress = function (xCells, oCells) {
    
    oCells.forEach((index) => {
        gameCells[index].classList.add('o');
      })
      
    xCells.forEach((index) => {
        gameCells[index].classList.add('x');
    })
}