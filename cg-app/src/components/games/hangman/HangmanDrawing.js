import React, { useState } from 'react';

function HangmanDrawing({ incorrectGuesses, color }) {

    const stages = [
        // Stage 0: Empty stand
        <svg width="200" height="250" key="0">
            <line x1="10" y1="230" x2="190" y2="230" stroke={color} strokeWidth="4" />
            <line x1="50" y1="230" x2="50" y2="20" stroke={color} strokeWidth="4" />
            <line x1="50" y1="20" x2="150" y2="20" stroke={color} strokeWidth="4" />
            <line x1="150" y1="20" x2="150" y2="50" stroke={color} strokeWidth="4" />
        </svg>,
        // Stage 1: Head
        <svg width="200" height="250" key="1">
            <line x1="10" y1="230" x2="190" y2="230" stroke={color} strokeWidth="4" />
            <line x1="50" y1="230" x2="50" y2="20" stroke={color} strokeWidth="4" />
            <line x1="50" y1="20" x2="150" y2="20" stroke={color} strokeWidth="4" />
            <line x1="150" y1="20" x2="150" y2="50" stroke={color} strokeWidth="4" />
            <circle cx="150" cy="70" r="20" stroke={color} strokeWidth="4" fill="none" />
        </svg>,
        // Stage 2: Body
        <svg width="200" height="250" key="2">
            <line x1="10" y1="230" x2="190" y2="230" stroke={color} strokeWidth="4" />
            <line x1="50" y1="230" x2="50" y2="20" stroke={color} strokeWidth="4" />
            <line x1="50" y1="20" x2="150" y2="20" stroke={color} strokeWidth="4" />
            <line x1="150" y1="20" x2="150" y2="50" stroke={color} strokeWidth="4" />
            <circle cx="150" cy="70" r="20" stroke={color} strokeWidth="4" fill="none" />
            <line x1="150" y1="90" x2="150" y2="150" stroke={color} strokeWidth="4" />
        </svg>,
        // Stage 3: Left Arm
        <svg width="200" height="250" key="3">
            <line x1="10" y1="230" x2="190" y2="230" stroke={color} strokeWidth="4" />
            <line x1="50" y1="230" x2="50" y2="20" stroke={color} strokeWidth="4" />
            <line x1="50" y1="20" x2="150" y2="20" stroke={color} strokeWidth="4" />
            <line x1="150" y1="20" x2="150" y2="50" stroke={color} strokeWidth="4" />
            <circle cx="150" cy="70" r="20" stroke={color} strokeWidth="4" fill="none" />
            <line x1="150" y1="90" x2="150" y2="150" stroke={color} strokeWidth="4" />
            <line x1="150" y1="110" x2="120" y2="130" stroke={color} strokeWidth="4" />
        </svg>,
        // Stage 4: Right Arm
        <svg width="200" height="250" key="4">
            <line x1="10" y1="230" x2="190" y2="230" stroke={color} strokeWidth="4" />
            <line x1="50" y1="230" x2="50" y2="20" stroke={color} strokeWidth="4" />
            <line x1="50" y1="20" x2="150" y2="20" stroke={color} strokeWidth="4" />
            <line x1="150" y1="20" x2="150" y2="50" stroke={color} strokeWidth="4" />
            <circle cx="150" cy="70" r="20" stroke={color} strokeWidth="4" fill="none" />
            <line x1="150" y1="90" x2="150" y2="150" stroke={color} strokeWidth="4" />
            <line x1="150" y1="110" x2="120" y2="130" stroke={color} strokeWidth="4" />
            <line x1="150" y1="110" x2="180" y2="130" stroke={color} strokeWidth="4" />
        </svg>,
        // Stage 5: Left Leg
        <svg width="200" height="250" key="5">
            <line x1="10" y1="230" x2="190" y2="230" stroke={color} strokeWidth="4" />
            <line x1="50" y1="230" x2="50" y2="20" stroke={color} strokeWidth="4" />
            <line x1="50" y1="20" x2="150" y2="20" stroke={color} strokeWidth="4" />
            <line x1="150" y1="20" x2="150" y2="50" stroke={color} strokeWidth="4" />
            <circle cx="150" cy="70" r="20" stroke={color} strokeWidth="4" fill="none" />
            <line x1="150" y1="90" x2="150" y2="150" stroke={color} strokeWidth="4" />
            <line x1="150" y1="110" x2="120" y2="130" stroke={color} strokeWidth="4" />
            <line x1="150" y1="110" x2="180" y2="130" stroke={color} strokeWidth="4" />
            <line x1="150" y1="150" x2="120" y2="190" stroke={color} strokeWidth="4" />
        </svg>,
        // Stage 6: Right Leg
        <svg width="200" height="250" key="6">
            <line x1="10" y1="230" x2="190" y2="230" stroke={color} strokeWidth="4" />
            <line x1="50" y1="230" x2="50" y2="20" stroke={color} strokeWidth="4" />
            <line x1="50" y1="20" x2="150" y2="20" stroke={color} strokeWidth="4" />
            <line x1="150" y1="20" x2="150" y2="50" stroke={color} strokeWidth="4" />
            <circle cx="150" cy="70" r="20" stroke={color} strokeWidth="4" fill="none" />
            <line x1="150" y1="90" x2="150" y2="150" stroke={color} strokeWidth="4" />
            <line x1="150" y1="110" x2="120" y2="130" stroke={color} strokeWidth="4" />
            <line x1="150" y1="110" x2="180" y2="130" stroke={color} strokeWidth="4" />
            <line x1="150" y1="150" x2="120" y2="190" stroke={color} strokeWidth="4" />
            <line x1="150" y1="150" x2="180" y2="190" stroke={color} strokeWidth="4" />
        </svg>,
    ];

    return (
        <>
            <div className="flex justify-center items-center">
                {stages[incorrectGuesses]}
            </div>
        </>
    );
}

export default HangmanDrawing;