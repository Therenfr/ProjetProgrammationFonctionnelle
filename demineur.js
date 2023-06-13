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


function printGrid(grid) {
    for (let row = 0; row < grid.length; row++) {
        let rowStr = "";
        for (let col = 0; col < grid[row].length; col++) {
            const cell = grid[row][col];
            if (cell.isDiscovered) {
                rowStr += cell.adjacentMines !== 0 ? cell.adjacentMines : "_";
            } else {
                rowStr += "-";
            }
            rowStr += " ";
        }
        console.log(rowStr);
    }
}

function revealCell(grid, row, col,revealedCells) {
    const cell = grid[row][col];
    if (cell.isDiscovered || cell.isMine) {
        return;
    }
    if (cell.adjacentMines === 0) {
        const rows = grid.length;
        const cols = grid[0].length;
        for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
                const newRow = row + i;
                const newCol = col + j;
                if (
                    newRow >= 0 &&
                    newRow < rows &&
                    newCol >= 0 &&
                    newCol < cols &&
                    !(i === 0 && j === 0) // Exclure la cellule courante
                ) {
                    revealCell(grid, newRow, newCol);
                }
            }
        }
    }
    revealedCells++;
    grid = R.assocPath([row, col, "isDiscovered"], true, grid);

}

function getUnrevealedNeighbors(grid, row, col) {
    const neighbors = [];
    const rows = grid.length;
    const cols = grid[0].length;

    for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
            const newRow = row + i;
            const newCol = col + j;
            if (
                newRow >= 0 &&
                newRow < rows &&
                newCol >= 0 &&
                newCol < cols &&
                !(i === 0 && j === 0) && // Exclure la cellule courante
                !grid[newRow][newCol].isDiscovered
            ) {
                neighbors.push({ row: newRow, col: newCol });
            }
        }
    }

    return neighbors;
}

