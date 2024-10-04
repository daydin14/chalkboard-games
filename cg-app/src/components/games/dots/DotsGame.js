import React, { useState } from 'react';
import Board from './Board';

const ROWS = 5;
const COLS = 5;

function DotsGame() {
    const initialBoard = Array(ROWS).fill(null).map(() =>
        Array(COLS).fill(null).map(() => ({
            horizontal: false,
            vertical: false,
            box: null,
        }))
    );

    const [board, setBoard] = useState(initialBoard);
    const [currentPlayer, setCurrentPlayer] = useState('Player1');
    const [scores, setScores] = useState({ Player1: 0, Player2: 0 });

    const handleLineClick = (row, col, orientation) => {
        const newBoard = board.map(row => row.slice());
        if (orientation === 'horizontal') {
            newBoard[row][col].horizontal = true;
        } else {
            newBoard[row][col].vertical = true;
        }

        let boxCompleted = false;
        if (orientation === 'horizontal') {
            if (row > 0 && newBoard[row - 1][col].horizontal && newBoard[row - 1][col].vertical && newBoard[row - 1][col + 1] && newBoard[row - 1][col + 1].vertical) {
                newBoard[row - 1][col].box = currentPlayer;
                boxCompleted = true;
            }
            if (row < ROWS - 1 && newBoard[row][col].horizontal && newBoard[row][col].vertical && newBoard[row][col + 1] && newBoard[row][col + 1].vertical) {
                newBoard[row][col].box = currentPlayer;
                boxCompleted = true;
            }
        } else {
            if (col > 0 && newBoard[row][col - 1].horizontal && newBoard[row][col - 1].vertical && newBoard[row + 1] && newBoard[row + 1][col - 1].horizontal) {
                newBoard[row][col - 1].box = currentPlayer;
                boxCompleted = true;
            }
            if (col < COLS - 1 && newBoard[row][col].horizontal && newBoard[row][col].vertical && newBoard[row + 1] && newBoard[row + 1][col].horizontal) {
                newBoard[row][col].box = currentPlayer;
                boxCompleted = true;
            }
        }

        setBoard(newBoard);
        if (boxCompleted) {
            setScores({
                ...scores,
                [currentPlayer]: scores[currentPlayer] + 1,
            });
        } else {
            setCurrentPlayer(currentPlayer === 'Player1' ? 'Player2' : 'Player1');
        }
    };

    return (
        <div className="dots-game">
            <h1>Dots and Boxes</h1>
            <Board board={board} onLineClick={handleLineClick} />
            <div className="scores">
                <div>Player 1: {scores.Player1}</div>
                <div>Player 2: {scores.Player2}</div>
            </div>
            <div className="current-player">Current Player: {currentPlayer}</div>
        </div>
    );
}

export default DotsGame;