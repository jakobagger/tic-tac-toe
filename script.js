"use strict";

window.addEventListener("load", start);

function start(){
    console.log("up and running");
    makeBoardClickable();
}

function makeBoardClickable(){
    document.querySelector("#board")
    .addEventListener("click", boardClicked);
}

function boardClicked(event){
    console.log("Board clicked!")
    const cell = event.target;
    console.log(cell)
}