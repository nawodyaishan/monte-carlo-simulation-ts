# Monte Carlo Simulation with TypeScript and Macao for Tic Tac Toe

This guide will walk you through how to use the [Macao](https://www.npmjs.com/package/macao) Monte Carlo Tree Search
library with TypeScript to create an AI player for the game of Tic Tac Toe.

## Setup

### Dependencies

To set up your project, you will need to have [Node.js](https://nodejs.org) installed. You will also need the following
dependencies:

- [macao](https://www.npmjs.com/package/macao)
- [ts-node](https://www.npmjs.com/package/ts-node)
- [typescript](https://www.npmjs.com/package/typescript)

You can install these with the following commands:

```
pnpm add macao
pnpm add -D typescript ts-node
```

You also need to have a `tsconfig.json` in your root folder:

```json
{
  "compilerOptions": {
    "module": "CommonJS",
    "esModuleInterop": true,
    "target": "es6",
    "noImplicitAny": true,
    "moduleResolution": "node",
    "sourceMap": true,
    "outDir": "dist",
    "baseUrl": ".",
    "paths": {
      "*": [
        "node_modules/*"
      ]
    }
  },
  "include": [
    "./**/*.ts"
  ]
}
```

### Project structure

Your project should have the following structure:

```
├── dist/
├── node_modules/
├── src/
|   └── index.ts
├── package.json
└── tsconfig.json
```

The `dist/` directory is where TypeScript will put the compiled JavaScript code. The `node_modules/` directory is where
your dependencies will be installed. The `src/` directory is where your TypeScript code will live. In this case, all the
code will be in `index.ts`.

## Code

In `src/index.ts`, import the required dependencies and define the `GameState` and `Action` interfaces:

```typescript
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
```

Then, implement the game rules for Tic Tac Toe. This includes functions to generate possible actions, apply an action to
the game state, determine if the game state is terminal (i.e., the game has ended), and calculate the reward for a
player at a given game state:

```typescript
// Implement the game rules

// ... (rest of the game rule functions here)
```

Create an instance of Macao with the game rules and a configuration:

```typescript
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

const macao = new Macao(funcs, config);
```

Finally, implement a game loop where the AI makes moves until the game ends:

```typescript
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


```

## Run the code

To run the code, you can use the `dev` script you have in your `package.json`:

```json
{
  //...
  "scripts": {
    "dev": "tsc && node ./dist/index.js"
  }
  //...
}
```

You can run this script with the command `pnpm run dev`.

This will compile the TypeScript code to JavaScript and then run the JavaScript code with Node.js.

You will see the AI making moves until the game ends, with each game state printed to the console.
