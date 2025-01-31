//!TEMP
const grid = [
    [5,0,0,0,7,0,0,8,4],
    [6,0,9,0,3,0,2,0,0],
    [0,0,7,0,4,0,0,1,3],
    [4,0,0,1,0,7,8,0,2],
    [0,0,0,0,9,0,0,0,0],
    [0,0,3,0,0,0,0,9,6],
    [1,8,0,0,6,3,0,2,0],
    [9,6,0,4,1,5,3,7,0],
    [3,0,4,9,0,0,0,6,1]
]

var solvedGrid = [
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0]
];
/*const grid = [
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0]
]*/

//Grid Generation Variables
var randomPositionsNum = 0;
var missingGapsNum = 40;

function GenerateGrid(){
    //Filling in rest of grid
    console.log(SolveGrid(structuredClone(solvedGrid), false));
    console.log(JSON.stringify(structuredClone(solvedGrid)));
}


function CheckIfGridFilled(workingGrid){
    for(let line of workingGrid){
        if(line.includes(0)) return false
    }

    return true;
}

function ShuffleArray(inputArray) {
    let inputArrayCopy = structuredClone(inputArray);
    let output = [];
    for(let i = 0; i < inputArrayCopy.length; i++){
        let index = Math.floor(Math.random() * (inputArrayCopy.length));
        output.push(inputArrayCopy[index]);
        inputArrayCopy.splice(index, 1);
    }

    return output;
}

function SolveGrid(workingGrid, random = false){

    let row = null, col = null;
    let foundSpot = false;

    if(CheckIfGridFilled(workingGrid)) {
        solvedGrid = workingGrid;
        return true;
    }

    for(let i = 0; i < 81; i++){
        let rowCopy = (i - (i % 9)) / 9; // Equal to i // 9
        let colCopy = i % 9;
        
        if(workingGrid[rowCopy][colCopy] === 0){
            foundSpot = true;
            row = rowCopy;
            col = colCopy;
            break
        }
    }

    if(foundSpot){
        //We have found a working spot
        let workingArray = [1,2,3,4,5,6,7,8,9];
        
        if(random) workingArray = ShuffleArray(workingArray);  // Shuffling numbers randomly

        for(let j = 0; j < workingArray.length; j++){

            let workingItem = workingArray[j];

            //Checking if insert is valid
            let attemptValid = true;
                //Row check
            if(workingGrid[row].includes(workingItem)) attemptValid = false;
                //Column check
            
                let column = [workingGrid[0][col],workingGrid[1][col],workingGrid[2][col],workingGrid[3][col],workingGrid[4][col],workingGrid[5][col],workingGrid[6][col],workingGrid[7][col],workingGrid[8][col]];
            if(column.includes(workingItem)) attemptValid = false;

                //Square check
            
            let squareRow = (row - (row % 3));
            let squareCol = (col - (col % 3));

            let square = [
                [workingGrid[squareRow][squareCol],workingGrid[squareRow][squareCol + 1],workingGrid[squareRow][squareCol + 2]],
                [workingGrid[squareRow + 1][squareCol],workingGrid[squareRow + 1][squareCol + 1],workingGrid[squareRow + 1][squareCol + 2]],
                [workingGrid[squareRow + 2][squareCol],workingGrid[squareRow + 2][squareCol + 1],workingGrid[squareRow + 2][squareCol + 2]]
            
            ];

            for(let line of square){
                if(line.includes(workingItem)) attemptValid = false;
            } 

            if(!attemptValid) continue;

            workingGrid[row][col] = workingItem;
            if(SolveGrid(workingGrid, random)) return true;
            workingGrid[row][col] = 0;
        }
    }
    return false;
}

function GenerateGridHTML(workingGrid) {
    let boardHTML = document.getElementById("container");
    boardHTML.innerHTML = "";
    for(let lineIndex = 0; lineIndex < workingGrid.length; lineIndex++){
        let line = workingGrid[lineIndex];
        for(let itemIndex = 0; itemIndex < line.length; itemIndex++){

            let item = workingGrid[lineIndex][itemIndex];


            let cell = document.createElement("div");
            cell.classList.add("cell");

            if(item === 0) cell.textContent = " ";
            else cell.textContent = item.toString();

            //Line styling
                //Bottom
            if(lineIndex % 3 === 2){ 
                cell.classList.add("cellBorderBottom");
            }
                //Top
            else if(lineIndex % 3 === 0){ 
                cell.classList.add("cellBorderTop");
            }
                //Left
            if(itemIndex % 3 === 0){
                cell.classList.add("cellBorderLeft");
            }
                //Right
            else if(itemIndex % 3 === 2){
                cell.classList.add("cellBorderRight");
            }


            boardHTML.appendChild(cell);
        }
    }
}

window.onload = function() {
    GenerateGrid();
    //SolveGrid(structuredClone(grid));
    GenerateGridHTML(solvedGrid);
}