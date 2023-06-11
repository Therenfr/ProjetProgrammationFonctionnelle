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

// Fonction pour compter le nombre de mines adjacentes à chaque case
function countAdjacentMines(grid) {
    const rows = grid.length;
    const cols = grid[0].length;

    const isValidCell = (row, col) => {
        return row >= 0 && row < rows && col >= 0 && col < cols;
    };

    const count = (row, col) => {
        let count = 0;
        for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
                const newRow = row + i;
                const newCol = col + j;
                if (isValidCell(newRow, newCol) && grid[newRow][newCol].isMine) {
                    count++;
                }
            }
        }
        return count; // Correction : renvoyer le compteur de mines
    };

    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            if (!grid[row][col].isMine) {
                grid[row][col].adjacentMines = count(row, col);
            }
        }
    }
    return count;

}
