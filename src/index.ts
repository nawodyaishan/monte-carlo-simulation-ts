import {Macao} from "macao";

// Define the game state and actions
interface GameState {
    board: number[][];
    player: number;
}

interface Action {
    row: number;
    column: number;
}

// Functions for the game rules
const generateActions = (state: GameState): Action[] => {
    const result: Action[] = [];
    state.board.forEach((rowArray, row) => {
        rowArray.forEach((value, column) => {
            if (value === 0) result.push({row, column});
        });
    });
    return result;
};

const applyAction = (state: GameState, action: Action): GameState => {
    const newBoard = JSON.parse(JSON.stringify(state.board));
    newBoard[action.row][action.column] = state.player * -1;
    const newState: GameState = {
        board: newBoard,
        player: state.player * -1
    };
    return newState;
};

const isStateTerminal = (state: GameState): boolean => {
    // check rows, columns, and diagonals for a win
    for (let i = 0; i < 3; i++) {
        if (
            Math.abs(state.board[i][0] + state.board[i][1] + state.board[i][2]) === 3 ||
            Math.abs(state.board[0][i] + state.board[1][i] + state.board[2][i]) === 3
        ) {
            return true;
        }
    }
    if (
        Math.abs(state.board[0][0] + state.board[1][1] + state.board[2][2]) === 3 ||
        Math.abs(state.board[2][0] + state.board[1][1] + state.board[0][2]) === 3
    ) {
        return true;
    }

    // check for a draw
    if (generateActions(state).length === 0) {
        return true;
    }

    return false;
};

const calculateReward = (state: GameState, player: number): number => {
    for (let i = 0; i < 3; i++) {
        if (
            Math.abs(state.board[i][0] + state.board[i][1] + state.board[i][2]) === 3
        ) {
            return state.board[i][0] === player ? 1 : -1;
        }
        if (
            Math.abs(state.board[0][i] + state.board[1][i] + state.board[2][i]) === 3
        ) {
            return state.board[0][i] === player ? 1 : -1;
        }
    }
    if (
        Math.abs(state.board[0][0] + state.board[1][1] + state.board[2][2]) === 3
    ) {
        return state.board[0][0] === player ? 1 : -1;
    }
    if (
        Math.abs(state.board[2][0] + state.board[1][1] + state.board[0][2]) === 3
    ) {
        return state.board[2][0] === player ? 1 : -1;
    }
    return 0;
};

// Create the Macao AI
const funcs = {
    generateActions,
    applyAction,
    isStateTerminal,
    calculateReward
};

const config = {
    duration: 30
};

console.log(isStateTerminal.toString());

const macao = new Macao({
    generateActions: generateActions,
    applyAction: applyAction,
    stateIsTerminal: isStateTerminal,
    calculateReward: calculateReward
}, config);


// Somewhere in your game loop
const initialState: GameState = {
    board: [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
    ],
    player: 1
};

const playGame = async () => {
    let gameState = initialState;
    while (!isStateTerminal(gameState)) {
        const action = await macao.getAction(gameState);
        gameState = applyAction(gameState, action);
        console.log(gameState)
    }
}

playGame();
