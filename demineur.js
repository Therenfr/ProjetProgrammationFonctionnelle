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