"use strict";

//#region CONTROLLER

window.addEventListener("load", start);

function start(){
    console.log("up and running");
    makeBoardClickable();
}

function selectCell(row, col){
    writeToCell(row, col, 1);
    displayBoard();
    console.table(model);
}

//#endregion

//#region VIEW

function makeBoardClickable(){
    document.querySelector("#board")
    .addEventListener("click", boardClicked);
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

function writeToCell(row, col, value){
    model[row][col] = value;
}

function readFromCell(row, col){
    return model[row][col];
}

//#endregion
