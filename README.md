# FEN Chess Application

## Overview

Welcome to the FEN Chess Application! This simple application allows users to play chess using Forsyth–Edwards Notation (FEN). Players can move and swap pieces on the chessboard.

## Features

- **Chessboard Interaction**: Interact with the chessboard by clicking on pieces to select and move them.

- **Piece Swapping**: Double-click on a piece to open a modal for swapping it with other available piece types.

- **FEN Notation**: The application supports FEN notation for representing the chessboard state.

## Getting Started

1. **Installation**: Clone the repository and install dependencies.

   ```bash
   git clone https://github.com/Elyyps/chess-challenge.git
   cd chess-challenge
   npm install
   ```

2. **Run the Application**: Start the development server.

   ```bash
   npm start
   ```

3. **Play Chess**: Open the application in your browser by typing `localhost:3000` and enjoy playing chess with FEN notation!

4. **Test the application**: Start testing with cypress.

   ```bash
   npx cypress open
   ```

## Usage

- **Moving Pieces**: Click on a piece, then click on a valid empty square to move the piece.

- **Swapping Pieces**: Double-click on a piece to open the swap modal. Choose a new piece type from the options and confirm.

- **FEN Input**: Use the input field to enter a custom FEN string and apply it to the chessboard.

## Technologies Used

- React
- TypeScript
- Cypress (for testing)

````
