import getDOMElements from "./DOMElements.js";
import LSService from "./LSService.js";
import { checkDraw, checkWin, endGame } from "./drawWinEndgame.js";
import { toggleFieldClass, placeSymbol, displaySavedProgress } from "./gameField.js";

export default function game () {

  const {setProgressLS, getDataFirstLoad} = LSService();
  const {gameCells, modalOverlay, progressWindow, resetBtns, continueBtn} = getDOMElements();

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
    
  if (oCells.length > 0 || xCells.length > 0) {

    modalOverlay.classList.add('show');
    progressWindow.classList.add('show');
    
    continueBtn.addEventListener('click', () => {
      
      modalOverlay.classList.remove('show');
      progressWindow.classList.remove('show');
        
      displaySavedProgress(xCells, oCells);
      
        gameCells.forEach((cell) => {
          if (!cell.classList.contains('x') && !cell.classList.contains('o')) {
               cell.addEventListener('click', handleCellClick, {once: true});
          }
        })
    
      toggleFieldClass(x_class, o_class, oTurn);

    })} 

  else {
    
    gameCells.forEach((cell) => {
        cell.addEventListener('click', handleCellClick, {once: true});
    })
    
    toggleFieldClass(x_class, o_class, oTurn);
  }

  function handleCellClick (e) {

    const cell = e.target;
    const currClass = oTurn ? o_class : x_class;

    placeSymbol(cell, currClass);

    if (checkWin(win_combos, currClass)) {
        
        endGame(false, oTurn);
        setProgressLS([], [], false);

    } else if (checkDraw(x_class, o_class)) {
        
        endGame(true, oTurn);
        setProgressLS([], [], false);

    } else {
        
        toggleTurn();
        toggleFieldClass(x_class, o_class, oTurn);
        setProgressLS(xCells, oCells, oTurn);
    }  
  }


  resetBtns.forEach((btn) => {
    
    btn.addEventListener('click', () => {
      
      oCells = [];
      xCells = [];
      oTurn = false;
        
        setProgressLS(xCells, oCells, oTurn);

          modalOverlay.classList.remove('show');
          progressWindow.classList.remove('show');

            gameCells.forEach((cell) => {
              cell.classList.remove('x');
              cell.classList.remove('o');
              cell.removeEventListener('click', handleCellClick);
              cell.addEventListener('click', handleCellClick, {once: true});
            })

        toggleFieldClass(x_class, o_class, oTurn);
        
    })
  })

  function toggleTurn () {
    oTurn = !oTurn;
  }
  
}