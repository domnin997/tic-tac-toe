import getDOMElements from "./DOMElements.js";
const { gameCells, modalOverlay, gameOverMsgBlock, gameOverMsg} = getDOMElements();

export const checkWin = function (winCombos, currClass) {

    return winCombos.some((combo) => {
        return combo.every(index => {
            return gameCells[index].classList.contains(currClass);
        })
    })
}

export const checkDraw = function (xClass, oClass) {
    
    return Array.from(gameCells).every((cell) => {
        return cell.classList.contains(xClass) ||
               cell.classList.contains(oClass);
    })
}

export const endGame = function (noWinner, oTurn) {
    
    if (noWinner) {
        gameOverMsg.innerText = `Победила дружба :)`;
    } else {
        gameOverMsg.innerText = `${oTurn ? `Победа нулей!` : `Кресты победили!`}`;
    }

    modalOverlay.classList.add('show');
    gameOverMsgBlock.classList.add('show');
}