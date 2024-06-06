"use strict";

//#region CONTROLLER

let currentPlayer = 1;

window.addEventListener("load", start);

function start(){
    console.log("up and running");
    displayBoard();
    makeBoardClickable();
}

function selectCell(row, col){
    if (readFromCell(row, col) === 0){
        writeToCell(row, col, currentPlayer);
        displayBoard();
        console.table(model);
        nextTurn();
        return true;
    } else {
        return false;
    }
}

function nextTurn(){
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
    updateAvailableCells();
    setTimeout(makeMoveForComputer, 2000)
    //makeMoveForComputer();
}

function makeMoveForComputer(){
    if (availableCells.length === 0){
        console.log("Game Over, no empty cells!");
    } else {
        const index = Math.floor(Math.random() * availableCells.length);
        const [row, col] = availableCells[index];
        selectCell(row, col);
    }
}

function playerTurn(){
    makeBoardClickable();
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
//#endregion

//#region MODEL

const model = [
    [0,0,0],
    [0,0,0],
    [0,0,0]
]

let availableCells = [];

function writeToCell(row, col, value){
    model[row][col] = value;
}

function readFromCell(row, col){
    return model[row][col];
}

function updateAvailableCells(){
    availableCells = [];
    for (let row = 0; row < 3; row++){
        for (let col = 0; col < 3; col++){
            if (readFromCell(row, col) === 0){
                availableCells.push([row, col]);
            }
        }
    }
}

//#endregion
