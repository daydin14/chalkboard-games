import React from 'react';

function ChoiceButton({ choice, onClick }) {
    return (
        <button className="choice-button" onClick={() => onClick(choice)}>
            {choice}
        </button>
    );
}

export default ChoiceButton;