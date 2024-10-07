import React, { useState } from 'react';
import ChoiceButton from './ChoiceButton';

const choices = ['rock', 'paper', 'scissors'];

function Game() {
    const [playerChoice, setPlayerChoice] = useState(null);
    const [computerChoice, setComputerChoice] = useState(null);
    const [result, setResult] = useState('');

    const determineWinner = (player, computer) => {
        if (player === computer) return 'It\'s a tie!';
        if (
            (player === 'rock' && computer === 'scissors') ||
            (player === 'paper' && computer === 'rock') ||
            (player === 'scissors' && computer === 'paper')
        ) {
            return 'You win!';
        }
        return 'You lose!';
    };

    const handleChoiceClick = (choice) => {
        const computerChoice = choices[Math.floor(Math.random() * choices.length)];
        setPlayerChoice(choice);
        setComputerChoice(computerChoice);
        setResult(determineWinner(choice, computerChoice));
    };

    return (
        <div className="flex flex-col items-center justify-center">
            <div className="flex space-x-4 mb-8">
                {choices.map((choice) => (
                    <ChoiceButton key={choice} choice={choice} onClick={handleChoiceClick} />
                ))}
            </div>
            {playerChoice && (
                <div className="text-center bg-gray-600 p-8 rounded-lg shadow-md w-80">
                    <p className="text-lg font-semibold">You chose: {playerChoice}</p>
                    <p className="text-lg font-semibold">Computer chose: {computerChoice}</p>
                    <p className="text-xl font-bold mt-4">{result}</p>
                </div>
            )}
        </div>
    );
}

export default Game;