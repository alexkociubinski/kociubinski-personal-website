// Game Engine for Space Defense: Operation Xylon
// Ported from C to TypeScript

const SIZE = 8;

export type Cell = '*' | 'S' | 'X' | 'O';
export type Grid = Cell[][];

export interface GameState {
    userMap: Grid;      // User's defensive grid
    alienMap: Grid;     // Alien's ships (hidden from player)
    shotMap: Grid;      // User's targeting grid (what they see of alien map)
    userShips: number;
    alienShips: number;
    turnNumber: number;
    totalShots: number;
    totalHits: number;
    gameOver: boolean;
    winner: 'user' | 'alien' | null;
}

interface AlienAI {
    targetMode: boolean;
    lastHitRow: number;
    lastHitCol: number;
    tried: boolean[][];
}

// Initialize empty grid
function initializeMap(): Grid {
    const map: Grid = [];
    for (let r = 0; r < SIZE; r++) {
        map[r] = [];
        for (let c = 0; c < SIZE; c++) {
            map[r][c] = '*';
        }
    }
    return map;
}

// Check if cell is open
function checkOpen(map: Grid, row: number, col: number): boolean {
    return map[row][col] === '*';
}

// Check if ship can be placed
function canPlaceShip(
    map: Grid,
    row: number,
    col: number,
    length: number,
    direction: number
): boolean {
    // direction: 0=right, 1=left, 2=up, 3=down

    // Check bounds
    switch (direction) {
        case 0: // right
            if (col + length > SIZE) return false;
            break;
        case 1: // left
            if (col - (length - 1) < 0) return false;
            break;
        case 2: // up
            if (row - (length - 1) < 0) return false;
            break;
        case 3: // down
            if (row + length > SIZE) return false;
            break;
    }

    // Check if all spots are open
    for (let i = 0; i < length; i++) {
        let r = row, c = col;
        switch (direction) {
            case 0: c = col + i; break; // right
            case 1: c = col - i; break; // left
            case 2: r = row - i; break; // up
            case 3: r = row + i; break; // down
        }
        if (!checkOpen(map, r, c)) return false;
    }

    return true;
}

// Place a ship of given length
function placeShip(map: Grid, length: number): boolean {
    const MAX_ATTEMPTS = 10000;
    let attempts = 0;

    while (attempts++ < MAX_ATTEMPTS) {
        const row = Math.floor(Math.random() * SIZE);
        const col = Math.floor(Math.random() * SIZE);
        const direction = Math.floor(Math.random() * 4);

        if (canPlaceShip(map, row, col, length, direction)) {
            // Place the ship
            for (let i = 0; i < length; i++) {
                let r = row, c = col;
                switch (direction) {
                    case 0: c = col + i; break;
                    case 1: c = col - i; break;
                    case 2: r = row - i; break;
                    case 3: r = row + i; break;
                }
                map[r][c] = 'S';
            }
            return true;
        }
    }

    console.error(`Failed to place ship of length ${length}`);
    return false;
}

// Place all ships
function placeAllShips(map: Grid): void {
    placeShip(map, 2);
    placeShip(map, 3);
    placeShip(map, 4);
    placeShip(map, 5);
}

// Initialize game state
export function initializeGame(): GameState {
    const userMap = initializeMap();
    const alienMap = initializeMap();
    const shotMap = initializeMap();

    placeAllShips(userMap);
    placeAllShips(alienMap);

    return {
        userMap,
        alienMap,
        shotMap,
        userShips: 14, // 2 + 3 + 4 + 5
        alienShips: 14,
        turnNumber: 1,
        totalShots: 0,
        totalHits: 0,
        gameOver: false,
        winner: null,
    };
}

// Format grid for display
export function formatGrid(grid: Grid, showShips: boolean = true): string {
    let output = '  A B C D E F G H\n';

    for (let row = 0; row < SIZE; row++) {
        output += `${row + 1} `;
        for (let col = 0; col < SIZE; col++) {
            let cell = grid[row][col];

            // Hide ships on targeting grid
            if (!showShips && cell === 'S') {
                cell = '*';
            }

            output += cell + ' ';
        }
        output += '\n';
    }

    return output;
}

// Convert column letter to index
export function columnLetterToIndex(letter: string): number {
    const upper = letter.toUpperCase();
    return upper.charCodeAt(0) - 'A'.charCodeAt(0);
}

// Validate coordinates
export function validateCoordinates(col: string, row: number): { valid: boolean; colIndex?: number; rowIndex?: number; error?: string } {
    const colIndex = columnLetterToIndex(col);

    if (colIndex < 0 || colIndex >= SIZE) {
        return { valid: false, error: 'Invalid column. Use A-H.' };
    }

    const rowIndex = row - 1;
    if (rowIndex < 0 || rowIndex >= SIZE) {
        return { valid: false, error: 'Invalid row. Use 1-8.' };
    }

    return { valid: true, colIndex, rowIndex };
}

// Process user shot
export interface ShotResult {
    hit: boolean;
    alreadyShot: boolean;
    message: string;
    gameOver: boolean;
    winner: 'user' | null;
}

export function processUserShot(
    state: GameState,
    colLetter: string,
    row: number
): ShotResult {
    const coords = validateCoordinates(colLetter, row);

    if (!coords.valid) {
        return {
            hit: false,
            alreadyShot: false,
            message: coords.error || 'Invalid coordinates',
            gameOver: false,
            winner: null,
        };
    }

    const { colIndex, rowIndex } = coords;
    const cell = state.alienMap[rowIndex!][colIndex!];

    // Check if already shot
    if (cell === 'X' || cell === 'O') {
        return {
            hit: false,
            alreadyShot: true,
            message: `Already fired at ${colLetter.toUpperCase()}${row}. Choose new coordinates.`,
            gameOver: false,
            winner: null,
        };
    }

    state.totalShots++;

    // Check for hit
    if (cell === 'S') {
        state.alienMap[rowIndex!][colIndex!] = 'X';
        state.shotMap[rowIndex!][colIndex!] = 'X';
        state.alienShips--;
        state.totalHits++;

        const gameOver = state.alienShips <= 0;

        return {
            hit: true,
            alreadyShot: false,
            message: `\x1b[1;31m💥 DIRECT HIT at ${colLetter.toUpperCase()}${row}! Enemy vessel damaged!\x1b[0m`,
            gameOver,
            winner: gameOver ? 'user' : null,
        };
    } else {
        // Miss
        state.alienMap[rowIndex!][colIndex!] = 'O';
        state.shotMap[rowIndex!][colIndex!] = 'O';

        return {
            hit: false,
            alreadyShot: false,
            message: `\x1b[0;37mMISS at ${colLetter.toUpperCase()}${row}. Shot passed through empty space.\x1b[0m`,
            gameOver: false,
            winner: null,
        };
    }
}

// Alien AI state (persistent across turns)
const alienAI: AlienAI = {
    targetMode: false,
    lastHitRow: -1,
    lastHitCol: -1,
    tried: Array(SIZE).fill(null).map(() => Array(SIZE).fill(false)),
};

// Process alien shot
export interface AlienShotResult {
    hit: boolean;
    row: number;
    col: number;
    message: string;
    gameOver: boolean;
    winner: 'alien' | null;
}

export function processAlienShot(state: GameState): AlienShotResult {
    let row = -1, col = -1;

    // If in target mode, try adjacent cells
    if (alienAI.targetMode) {
        const directions = [[0, 1], [0, -1], [1, 0], [-1, 0]];
        let found = false;

        for (const [dr, dc] of directions) {
            const nr = alienAI.lastHitRow + dr;
            const nc = alienAI.lastHitCol + dc;

            if (nr >= 0 && nr < SIZE && nc >= 0 && nc < SIZE && !alienAI.tried[nr][nc]) {
                row = nr;
                col = nc;
                found = true;
                break;
            }
        }

        if (!found) {
            alienAI.targetMode = false;
        }
    }

    // Random shot if not in target mode or couldn't find adjacent
    if (!alienAI.targetMode || row === -1) {
        do {
            row = Math.floor(Math.random() * SIZE);
            col = Math.floor(Math.random() * SIZE);
        } while (alienAI.tried[row][col]);
    }

    alienAI.tried[row][col] = true;

    const cell = state.userMap[row][col];
    const colLetter = String.fromCharCode('A'.charCodeAt(0) + col);

    if (cell === 'S') {
        state.userMap[row][col] = 'X';
        state.userShips--;
        alienAI.targetMode = true;
        alienAI.lastHitRow = row;
        alienAI.lastHitCol = col;

        const gameOver = state.userShips <= 0;

        return {
            hit: true,
            row: row + 1,
            col,
            message: `\x1b[1;31m💥 Alien hits your ship at ${colLetter}${row + 1}!\x1b[0m`,
            gameOver,
            winner: gameOver ? 'alien' : null,
        };
    } else {
        state.userMap[row][col] = 'O';

        return {
            hit: false,
            row: row + 1,
            col,
            message: `\x1b[0;37mAlien misses at ${colLetter}${row + 1}.\x1b[0m`,
            gameOver: false,
            winner: null,
        };
    }
}

// Reset alien AI (call when starting new game)
export function resetAlienAI(): void {
    alienAI.targetMode = false;
    alienAI.lastHitRow = -1;
    alienAI.lastHitCol = -1;
    alienAI.tried = Array(SIZE).fill(null).map(() => Array(SIZE).fill(false));
}

// Get game statistics
export function getGameStats(state: GameState): string {
    const accuracy = state.totalShots > 0 ? (state.totalHits * 100.0) / state.totalShots : 0;

    let rating = '';
    if (accuracy >= 70) {
        rating = '\x1b[1;33m⭐⭐⭐ EXCEPTIONAL MARKSMAN\x1b[0m';
    } else if (accuracy >= 50) {
        rating = '\x1b[1;33m⭐⭐ COMPETENT COMMANDER\x1b[0m';
    } else {
        rating = '\x1b[1;33m⭐ MISSION ACCOMPLISHED\x1b[0m';
    }

    return `\x1b[1;36mMISSION STATISTICS:\x1b[0m
\x1b[0;37m   Turns Completed: ${state.turnNumber}\x1b[0m
\x1b[0;37m   Total Shots Fired: ${state.totalShots}\x1b[0m
\x1b[0;37m   Successful Hits: ${state.totalHits}\x1b[0m
\x1b[0;37m   Accuracy: ${accuracy.toFixed(1)}%\x1b[0m
\x1b[1;33m   Mission Rating: ${rating}\x1b[0m`;
}
