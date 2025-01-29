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
var iterations = 0;

function CheckIfGridFilled(workingGrid){
    for(let line of workingGrid){
        if(line.includes(0)) return false
    }

    return true;
}

function SolveGrid(workingGrid){
    iterations ++;
    console.log(`ITERATION ${iterations}`);
    let row = null, col = null;
    let foundSpot = false;

    if(CheckIfGridFilled(workingGrid)) {
        console.log(JSON.stringify(workingGrid));
        throw new Error ("COMPLETE");
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

        for(let j = 1; j < 10; j++){
            //Checking if insert is valid
            let attemptValid = true;
                //Row check
            if(workingGrid[row].includes(j)) attemptValid = false;
                //Column check
            
                let column = [workingGrid[0][col],workingGrid[1][col],workingGrid[2][col],workingGrid[3][col],workingGrid[4][col],workingGrid[5][col],workingGrid[6][col],workingGrid[7][col],workingGrid[8][col]];
            if(column.includes(j)) attemptValid = false;

                //Square check
            
            let squareRow = (row - (row % 3));
            let squareCol = (col - (col % 3));

            let square = [
                [workingGrid[squareRow][squareCol],workingGrid[squareRow][squareCol + 1],workingGrid[squareRow][squareCol + 2]],
                [workingGrid[squareRow + 1][squareCol],workingGrid[squareRow + 1][squareCol + 1],workingGrid[squareRow + 1][squareCol + 2]],
                [workingGrid[squareRow + 2][squareCol],workingGrid[squareRow + 2][squareCol + 1],workingGrid[squareRow + 2][squareCol + 2]]
            
            ];

            for(let line of square){
                if(line.includes(j)) attemptValid = false;
            } 

            if(!attemptValid) continue;

            workingGrid[row][col] = j;
            SolveGrid(workingGrid);
            workingGrid[row][col] = 0;
        }
    }
}

window.onload = SolveGrid(grid);