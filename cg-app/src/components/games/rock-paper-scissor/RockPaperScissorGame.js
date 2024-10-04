import React, { useState } from 'react';
import ChoiceButton from './ChoiceButton';

const choices = ['rock', 'paper', 'scissors'];

function RockPaperScissorsGame() {
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
        <div className="rock-paper-scissors-game">
            <h1>Rock, Paper, Scissors</h1>
            <div className="choices">
                {choices.map((choice) => (
                    <ChoiceButton key={choice} choice={choice} onClick={handleChoiceClick} />
                ))}
            </div>
            {playerChoice && (
                <div className="result">
                    <p>You chose: {playerChoice}</p>
                    <p>Computer chose: {computerChoice}</p>
                    <p>{result}</p>
                </div>
            )}
        </div>
    );
}

export default RockPaperScissorsGame;