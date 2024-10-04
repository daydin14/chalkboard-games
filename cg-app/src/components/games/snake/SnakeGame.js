import React, { useState, useEffect } from 'react';
import Board from './Board';

const ROWS = 20;
const COLS = 20;
const DIRECTIONS = {
    ArrowUp: { row: -1, col: 0 },
    ArrowDown: { row: 1, col: 0 },
    ArrowLeft: { row: 0, col: -1 },
    ArrowRight: { row: 0, col: 1 },
};

function SnakeGame() {
    const [board, setBoard] = useState(createBoard());
    const [snake, setSnake] = useState([{ row: 10, col: 10 }]);
    const [direction, setDirection] = useState(DIRECTIONS.ArrowRight);
    const [food, setFood] = useState(generateFood());

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (DIRECTIONS[event.key]) {
                setDirection(DIRECTIONS[event.key]);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setSnake((prevSnake) => {
                const newSnake = [...prevSnake];
                const head = newSnake[0];
                const newHead = {
                    row: head.row + direction.row,
                    col: head.col + direction.col,
                };

                if (
                    newHead.row < 0 ||
                    newHead.row >= ROWS ||
                    newHead.col < 0 ||
                    newHead.col >= COLS ||
                    newSnake.some((segment) => segment.row === newHead.row && segment.col === newHead.col)
                ) {
                    clearInterval(interval);
                    alert('Game Over');
                    return prevSnake;
                }

                newSnake.unshift(newHead);

                if (newHead.row === food.row && newHead.col === food.col) {
                    setFood(generateFood());
                } else {
                    newSnake.pop();
                }

                return newSnake;
            });
        }, 200);

        return () => clearInterval(interval);
    }, [direction, food]);

    useEffect(() => {
        const newBoard = createBoard();
        snake.forEach((segment) => {
            newBoard[segment.row][segment.col] = 'snake';
        });
        newBoard[food.row][food.col] = 'food';
        setBoard(newBoard);
    }, [snake, food]);

    return (
        <div className="snake-game">
            <h1>Snake Game</h1>
            <Board board={board} />
        </div>
    );
}

function createBoard() {
    return Array.from({ length: ROWS }, () => Array(COLS).fill(''));
}

function generateFood() {
    return {
        row: Math.floor(Math.random() * ROWS),
        col: Math.floor(Math.random() * COLS),
    };
}

export default SnakeGame;