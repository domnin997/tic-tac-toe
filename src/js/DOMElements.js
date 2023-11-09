export default function getDOMElements () {
    return {
        gameCells: document.querySelectorAll('.cell'),
        gameField: document.querySelector('.game-field'),
        modalOverlay: document.querySelector('.modal-overlay'),
        gameOverMsgBlock: document.querySelector('.game-over-msg'),
        gameOverMsg: document.querySelector('.game-over-window__text'),
        progressWindow: document.querySelector('.progress-dialog'),
        resetBtns: document.querySelectorAll('.reset-btn'),
        continueBtn: document.querySelector('.continue-btn'),
    }
}