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
];

function CheckIfGridFilled(workingGrid){
    for(let row of workingGrid){
        if(row.includes(0)) return false;
    }
    return true;
}

function SolveGrid(workingGrid){
    if (CheckIfGridFilled(workingGrid)) {
        console.log("Solution Found:");
        console.table(workingGrid);
        return true;  // Stop recursion
    }

    let row = -1, col = -1;
    for (let i = 0; i < 81; i++) {
        let r = Math.floor(i / 9), c = i % 9;
        if (workingGrid[r][c] === 0) {
            row = r;
            col = c;
            break;
        }
    }

    if (row === -1) return false;  // No empty space found

    for (let j = 1; j <= 9; j++) {
        // Check if number is valid in row, column, and 3x3 square
        if (!isValid(workingGrid, row, col, j)) continue;

        workingGrid[row][col] = j; // Place number
        if (SolveGrid(workingGrid)) return true; // Recurse
        workingGrid[row][col] = 0; // Undo (backtrack)
    }

    return false;  // No valid number found, backtrack
}

function isValid(grid, row, col, num) {
    // Check row
    if (grid[row].includes(num)) return false;

    // Check column
    for (let i = 0; i < 9; i++) {
        if (grid[i][col] === num) return false;
    }

    // Check 3x3 square
    let squareRow = Math.floor(row / 3) * 3;
    let squareCol = Math.floor(col / 3) * 3;
    for (let r = 0; r < 3; r++) {
        for (let c = 0; c < 3; c++) {
            if (grid[squareRow + r][squareCol + c] === num) return false;
        }
    }

    return true;
}

window.onload = () => SolveGrid(grid);
