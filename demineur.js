import * as R from "ramda";

// Exemple d'utilisation
const rows = 5;
const cols = 5;
const mineCount = 10;

function generateEmptyGrid(rows, cols) {
    const grid = [];
    for (let i = 0; i < rows; i++) {
        const row = [];
        for (let j = 0; j < cols; j++) {
            row.push({ isMine: false, isDiscovered: false, adjacentMines: 0 });
        }
        grid.push(row);
    }
    return grid;
}

function placeMines(grid, mineCount) {
    const rows = grid.length;
    const cols = grid[0].length;
    let minesPlaced = 0;

    while (minesPlaced < mineCount) {
        const randomRow = Math.floor(Math.random() * rows);
        const randomCol = Math.floor(Math.random() * cols);

        if (!grid[randomRow][randomCol].isMine) {
            grid[randomRow][randomCol].isMine = true;
            minesPlaced++;
        }
    }

    return grid;
}

