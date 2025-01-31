function SolveGrid(workingGrid, random = false){
    let row = null, col = null;
    let foundSpot = false;

    if(CheckIfGridFilled(workingGrid)) {
        solvedGrid = workingGrid;
        return true;
    }

    // Loop through the grid to find the first empty cell (0)
    for(let i = 0; i < 81; i++){
        let rowCopy = Math.floor(i / 9); // Changed: Use Math.floor(i / 9) to calculate row index
        let colCopy = i % 9;  // Changed: Use modulo (i % 9) to calculate column index
        
        if(workingGrid[rowCopy][colCopy] === 0){
            foundSpot = true;
            row = rowCopy;
            col = colCopy;
            break
        }
    }

    if(foundSpot){
        // We have found a working spot

        let workingArray = [1,2,3,4,5,6,7,8,9];
        
        // Change: If 'random' is true, shuffle the array of numbers (1–9) to try randomly
        if(random) workingArray = ShuffleArray(workingArray);  // Shuffling numbers randomly

        for(let j = 0; j < 9; j++){
            let workingItem = workingArray[j];

            // Checking if the current number is valid to place in the current row, column, and square
            let attemptValid = true;

            // Row check: if the number already exists in the row, it's invalid
            if(workingGrid[row].includes(workingItem)) attemptValid = false;

            // Column check: if the number already exists in the column, it's invalid
            let column = [workingGrid[0][col], workingGrid[1][col], workingGrid[2][col], workingGrid[3][col], workingGrid[4][col], workingGrid[5][col], workingGrid[6][col], workingGrid[7][col], workingGrid[8][col]];
            if(column.includes(workingItem)) attemptValid = false;

            // Square check: if the number already exists in the 3x3 square, it's invalid
            let squareRow = Math.floor(row / 3) * 3;  // Changed: Calculate square row
            let squareCol = Math.floor(col / 3) * 3;  // Changed: Calculate square column
            let square = [
                [workingGrid[squareRow][squareCol], workingGrid[squareRow][squareCol + 1], workingGrid[squareRow][squareCol + 2]],
                [workingGrid[squareRow + 1][squareCol], workingGrid[squareRow + 1][squareCol + 1], workingGrid[squareRow + 1][squareCol + 2]],
                [workingGrid[squareRow + 2][squareCol], workingGrid[squareRow + 2][squareCol + 1], workingGrid[squareRow + 2][squareCol + 2]]
            ];

            // If the number already exists in the square, it's invalid
            for (let line of square) {
                if (line.includes(workingItem)) attemptValid = false;
            }

            if (!attemptValid) continue;  // Skip this number if it's invalid

            // Place the number if valid
            workingGrid[row][col] = workingItem;
            
            // Recursively attempt to solve the grid with the current number
            if (SolveGrid(workingGrid, random)) return true;
            
            // If no valid solution found, backtrack by resetting the cell
            workingGrid[row][col] = 0;
        }
    }
    return false;
}
