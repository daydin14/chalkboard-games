// Dependencies
import React, { useState, useEffect } from 'react';

// Components
import Board from './Board';

// Hooks
import useIsMobile from '../../../hooks/useIsMobile';

const ROWS = 20;
const COLS = 20;
const DIRECTIONS = {
    ArrowUp: { row: -1, col: 0 },
    ArrowDown: { row: 1, col: 0 },
    ArrowLeft: { row: 0, col: -1 },
    ArrowRight: { row: 0, col: 1 },
};

function createBoard() {
    return Array.from({ length: ROWS }, () => Array(COLS).fill(''));
}

function generateFood(snake) {
    let newFood;
    const isFoodOnSnake = (food) => snake.some((segment) => segment.row === food.row && segment.col === food.col);

    do {
        newFood = {
            row: Math.floor(Math.random() * ROWS),
            col: Math.floor(Math.random() * COLS),
        };
    } while (isFoodOnSnake(newFood));

    return newFood;
}

function Game() {
    const [board, setBoard] = useState(createBoard());
    const [snake, setSnake] = useState([{ row: 10, col: 10 }]);
    const [direction, setDirection] = useState(DIRECTIONS.ArrowRight);
    const [food, setFood] = useState(generateFood([{ row: 10, col: 10 }]));
    const [gameOver, setGameOver] = useState(false);
    const isMobile = useIsMobile();

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
        if (gameOver) return;

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
                    setGameOver(true);
                    return prevSnake;
                }

                newSnake.unshift(newHead);

                if (newHead.row === food.row && newHead.col === food.col) {
                    setFood(generateFood(newSnake));
                } else {
                    newSnake.pop();
                }

                return newSnake;
            });
        }, 200);

        return () => clearInterval(interval);
    }, [direction, food, gameOver]);

    useEffect(() => {
        const newBoard = createBoard();
        snake.forEach((segment) => {
            newBoard[segment.row][segment.col] = 'snake';
        });
        newBoard[food.row][food.col] = 'food';
        setBoard(newBoard);
    }, [snake, food]);

    useEffect(() => {
        if (!isMobile) return;

        let touchStartX = 0;
        let touchStartY = 0;
        let touchEndX = 0;
        let touchEndY = 0;

        const handleTouchStart = (event) => {
            touchStartX = event.touches[0].clientX;
            touchStartY = event.touches[0].clientY;
        };

        const handleTouchEnd = (event) => {
            touchEndX = event.changedTouches[0].clientX;
            touchEndY = event.changedTouches[0].clientY;
            handleSwipe();
        };

        const handleSwipe = () => {
            const deltaX = touchEndX - touchStartX;
            const deltaY = touchEndY - touchStartY;

            if (Math.abs(deltaX) > Math.abs(deltaY)) {
                if (deltaX > 0) {
                    setDirection(DIRECTIONS.ArrowRight);
                } else {
                    setDirection(DIRECTIONS.ArrowLeft);
                }
            } else {
                if (deltaY > 0) {
                    setDirection(DIRECTIONS.ArrowDown);
                } else {
                    setDirection(DIRECTIONS.ArrowUp);
                }
            }
        };

        window.addEventListener('touchstart', handleTouchStart);
        window.addEventListener('touchend', handleTouchEnd);

        return () => {
            window.removeEventListener('touchstart', handleTouchStart);
            window.removeEventListener('touchend', handleTouchEnd);
        };
    }, [isMobile]);

    const resetGame = () => {
        setBoard(createBoard());
        setSnake([{ row: 10, col: 10 }]);
        setDirection(DIRECTIONS.ArrowRight);
        setFood(generateFood([{ row: 10, col: 10 }]));
        setGameOver(false);
    };

    return (
        <div className="flex flex-col items-center">
            <button
                onClick={resetGame}
                className="mb-4 p-2 bg-blue-500 text-white font-bold rounded hover:bg-blue-700 transition-colors duration-200"
            >
                Reset Game
            </button>
            <Board board={board} />
            {gameOver && <div className="text-red-500 font-bold">Game Over</div>}
        </div>
    );
}

export default Game;