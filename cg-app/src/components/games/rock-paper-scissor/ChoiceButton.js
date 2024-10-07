import React from 'react';

function ChoiceButton({ choice, onClick }) {
    return (
        <button
            className="choice-button bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-2"
            onClick={() => onClick(choice)}
        >
            {choice}
        </button>
    );
}

export default ChoiceButton;