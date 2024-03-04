"use strict";

// *******************************CONTROLLER*******************************************************************

window.addEventListener("load", start);

function start(){
    console.log("up and running");
    makeBoardClickable();
}

function selectCell(row, col){
    writeToCell(row, col, 1);
    console.table(model);
}


//****************************** VIEW **********************************************************************

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

// *************************************MODEL******************************************************************

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