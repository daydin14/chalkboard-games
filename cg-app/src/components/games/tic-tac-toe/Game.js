// Dependencies
import React, { useState } from 'react';

// Components
import Board from './Board';

function Game() {
    const [history, setHistory] = useState([{ squares: Array(9).fill(null) }]);
    const [stepNumber, setStepNumber] = useState(0);
    const [xIsNext, setXIsNext] = useState(true);

    const current = history[stepNumber];
    const winner = calculateWinner(current.squares);

    const handleClick = (i) => {
        const historyCopy = history.slice(0, stepNumber + 1);
        const currentCopy = historyCopy[historyCopy.length - 1];
        const squares = currentCopy.squares.slice();

        if (winner || squares[i]) {
            return;
        }

        squares[i] = xIsNext ? 'X' : 'O';
        setHistory(historyCopy.concat([{ squares }]));
        setStepNumber(historyCopy.length);
        setXIsNext(!xIsNext);
    };

    const jumpTo = (step) => {
        setStepNumber(step);
        setXIsNext(step % 2 === 0);
    };

    const moves = history.map((step, move) => {
        const desc = move ? 'Go to move #' + move : 'Go to game start';
        return (
            <li key={move}>
                <button onClick={() => jumpTo(move)}>{desc}</button>
            </li>
        );
    });

    let status;
    if (winner) {
        status = 'Winner: ' + winner;
    } else {
        status = 'Next player: ' + (xIsNext ? 'X' : 'O');
    }

    return (
        <div className="game">
            <div className="game-board">
                <Board squares={current.squares} onClick={handleClick} />
            </div>
            <div className="game-info">
                <div>{status}</div>
                <ol>{moves}</ol>
            </div>
        </div>
    );
}

function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
}

export default Game;