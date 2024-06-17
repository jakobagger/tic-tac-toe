"use strict";

//#region CONTROLLER

let currentPlayer = 1;

window.addEventListener("load", start);
document.getElementById("replay-btn").addEventListener("click", replay);

function start(){
    console.log("up and running");
    displayBoard();
    makeBoardClickable();
}

function selectCell(row, col){
    if (readFromCell(row, col) === 0){
        writeToCell(row, col, currentPlayer);
        displayBoard();
        //console.table(model);
        nextTurn();
        return true;
    } else {
        return false;
    }
}

function nextTurn(){

    const result = checkForWin(model);

    if (result != 0){
        console.log(`Game over, player ${currentPlayer} wins!`)
        endGame(true);
        return;
    }

    if (getAvailableCells(model).length === 0){
        endGame(result);
        return;
    }

    if (currentPlayer === 1){
        currentPlayer = 2;
        computerTurn();
    } else if (currentPlayer === 2){
        currentPlayer = 1;
        playerTurn();
    }
}

function computerTurn(){
    disableBoardClicks();
    //setTimeout(makeRandomMoveForComputer, 2000);
    setTimeout(makeMinimaxMoveForComputer, 2000);
}

function makeRandomMoveForComputer(){

    const moves = getAvailableCells();

    if (moves.length === 0){
        console.log("Game Over, no empty cells!");
    } else {
        const index = Math.floor(Math.random() * moves.length);
        const [row, col] = moves[index];
        selectCell(row, col);
    }
}

function makeMinimaxMoveForComputer(){
    const move = bestMove(model);
        if (move) {
            selectCell(move.row, move.col);
    }
}

function playerTurn(){
    makeBoardClickable();
}

function endGame(result){
    disableBoardClicks();
    displayEndGameMenu(result);
}

function replay(){
    console.log("starting new game");
    location.reload();
}

//#endregion

//#region VIEW

function makeBoardClickable(){
    document.querySelector("#board")
    .addEventListener("click", boardClicked);
}

function disableBoardClicks(){
    document.getElementById("board").removeEventListener("click", boardClicked);
}

function boardClicked(event){
    console.log("Board clicked!")
    const cell = event.target;
    const row = cell.dataset.row;
    const col = cell.dataset.col;

    console.log(`Clicked on row: ${row} and column: ${col}`);
    selectCell(row, col);
}

function displayBoard(){
    for (let row = 0; row < 3; row++){
        for (let col = 0; col < 3; col++){
            
            const value = readFromCell(row, col);
            const cell = document.querySelector(`[data-row="${row}"][data-col="${col}"]`);

            switch (value){
                case 0: cell.textContent = " "; break;
                case 1: cell.textContent = "X"; break;
                case 2: cell.textContent = "O"; break;
            }
        }
    }
}

function displayEndGameMenu(result){
    if (result === 0){
        document.getElementById("result-text").textContent = `Game ends in a tie!`;    
    } else {
    document.getElementById("result-text").textContent = `Player ${currentPlayer} wins!`;
}
    document.getElementById("end-screen").style.display = 'block';
}

//#endregion

//#region MODEL

let model = [
    [0,0,0],
    [0,0,0],
    [0,0,0]
]

const availableCells = [];

function writeToCell(row, col, value){
    model[row][col] = value;
}

function readFromCell(row, col){
    return model[row][col];
}

function getAvailableCells(model) {
    const availableCells = [];
    for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 3; col++) {
            if (model[row][col] === 0) {
                availableCells.push([row, col]);
            }
        }
    }
    return availableCells;
}

function checkForWin(model){
    const rowCount = model.length;
    const colCount = model[0].length;

    for (let i = 0; i < rowCount; i++) {
        for (let j = 0; j < colCount; j++) {
            //only check from filled cells
            if (model[i][j] !== 0) {
                //check horizontal
                if (j <= colCount - 3 &&
                    model[i][j] === model[i][j+1] &&
                    model[i][j] === model[i][j+2]){
                        return model[i][j];
                    }
                //check vertical    
                if (i <= colCount -3 &&
                    model[i][j] === model[i+1][j] &&
                    model[i][j] === model[i+2][j]
                ){
                    return model[i][j];
                }
                //top left to bottom right
                if (i <= rowCount - 3 && j <= colCount - 3 &&
                    model[i][j] === model[i+1][j+1] &&
                    model[i][j] === model[i+2][j+2]
                ){
                    return model[i][j];
                }
                // top right bottom left
                if (i <= rowCount - 3 && j >= 2 &&
                    model[i][j] === model[i + 1][j - 1] &&
                    model[i][j] === model[i + 2][j - 2]
                    ) {
                        return model[i][j];
                }

            }   
        }
    }
        return 0;
}

//#endregion

//#region MINIMAX

const cellScores = [
    [2, 3, 2],
    [3, 4, 3],
    [2, 3, 2]
];

function minimax(model, depth, isMaximizing, alpha, beta) {
    
    
    const score = evaluate(model);
    console.log(score);

    if (score === 10) return score - depth; // Consider depth to prefer faster wins
    if (score === -10) return score + depth; // Consider depth to prefer slower losses
    if (getAvailableCells(model).length === 0) return 0;

    if (isMaximizing) {
        let best = -1000;

        console.log(`Current player is maximizing`);

        getAvailableCells(model).forEach(([row, col]) => {
            
            model[row][col] = 2; // Assume the computer is player 2


            let value = minimax(model, depth + 1, false, alpha, beta);
            console.table(model);
            console.log(value);
            best = Math.max(best, value);
            console.log(best);
            alpha = Math.max(alpha, best);
            model[row][col] = 0; // Undo move

            if (beta <= alpha) {
                return best;
            }
        });

        return best;
    } else {
        let best = 1000;

        console.log(`Current player is minimizing`);

        getAvailableCells(model).forEach(([row, col]) => {
            model[row][col] = 1; // Assume the human player is player 1

            let value = minimax(model, depth + 1, true, alpha, beta);
            console.table(model);
            console.log(value);
            best = Math.min(best, value);
            console.log(best);
            beta = Math.min(beta, best);
        
            model[row][col] = 0; // Undo move

            if (beta <= alpha) {
                return best;
            }
        });

        return best;
    }
}

    
function evaluate(model){
    const winner = checkForWin(model);
    if (winner === 2) {
        return 10;
    } else if (winner === 1) {
        return -10;
    } else {
        let totalScore = 0;

        for (let row = 0; row < 3; row++){
            for (let col = 0; col < 3; col++){
                if (model[row][col] === 2) {
                    totalScore += cellScores[row][col];
                } else if (model[row][col] === 1) {
                    totalScore -= cellScores[row][col];
                }
            }
        }
        return totalScore;
    }
}

function bestMove(model) {
    let bestVal = -1000;
    let move = null;

    getAvailableCells(model).forEach(([row, col]) => {
        model[row][col] = 2; // Assume the computer is player 2

        let moveVal = minimax(model, 0, false, -1000, 1000);

        model[row][col] = 0; // Undo move

        if (moveVal > bestVal) {
            bestVal = moveVal; // Update the best score
            move = { row, col }; // Record the move's coordinates
        }
    });

    return move;
}
