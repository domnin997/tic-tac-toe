export default function LSService () {

    function setProgressLS (xCells, oCells, oTurn) {
        localStorage.setItem('gameProgress', JSON.stringify({xCells, oCells, oTurn}));
    }

    function getProgressLS () {
        return JSON.parse(localStorage.getItem('gameProgress'));
    }

    return {getProgressLS, setProgressLS};
}