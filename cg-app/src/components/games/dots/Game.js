import React, { useState, useEffect } from 'react';
import Board from './Board';

const Game = () => {
    const [html, setHtml] = useState([]);
    const [boxes, setBoxes] = useState([]);
    const [turn, setTurn] = useState(true);
    const [you, setYou] = useState(0);
    const [comp, setComp] = useState(0);

    useEffect(() => {
        load();
    }, []);

    const load = () => {
        let newBoxes = [];
        setTurn(true);
        setYou(0);
        setComp(0);
        const m = 10;
        const n = 10;
        const offset = 50;

        const sx = window.innerWidth / 2 - (m * offset) / 2;
        const sy = offset * 2.5;
        let c = 0;

        let newHtml = [];
        for (let j = 0; j < m; j++) {
            for (let i = 0; i < n; i++) {
                const x = sx + i * offset;
                const y = sy + j * offset;

                newHtml.push({ type: 'box', id: c, x: x + 2.5, y: y + 2.5, zIndex: i - 1 });
                newHtml.push({ type: 'dot', id: c, x: x - 5, y: y - 5, zIndex: i });
                newHtml.push({ type: 'lineh', id: c, line1: c, line2: c - m, x: x, y: y, zIndex: i });
                newHtml.push({ type: 'linev', id: c, line1: c, line2: c - 1, x: x, y: y, zIndex: i });

                newBoxes.push(0);
                c++;
            }
        }

        // Right boxes
        for (let i = 0; i < n; i++) {
            const x = sx + m * offset;
            const y = sy + i * offset;
            newHtml.push({ type: 'dot', id: c, x: x - 5, y: y - 5, zIndex: i });
            newHtml.push({ type: 'linev', id: c, line1: m * (i + 1) - 1, line2: -1, x: x, y: y, zIndex: i });
        }

        // Bottom boxes
        for (let i = 0; i < m; i++) {
            const x = sx + i * offset;
            const y = sy + n * offset;
            newHtml.push({ type: 'dot', id: c, x: x - 5, y: y - 5, zIndex: i });
            newHtml.push({ type: 'lineh', id: c, line1: (n - 1) * m + i, line2: -1, x: x, y: y, zIndex: i });
        }

        // Right-bottom most dot
        newHtml.push({ type: 'dot', id: c, x: sx + m * offset - 5, y: sy + n * offset - 5, zIndex: m });

        setBoxes(newBoxes);
        setHtml(newHtml);
        applyEvents();
    };

    const applyEvents = () => {
        document.querySelectorAll('div.line').forEach(line => {
            line.addEventListener('click', function () {
                const id1 = parseInt(this.getAttribute('data-line-1'));
                const id2 = parseInt(this.getAttribute('data-line-2'));

                if (checkValid(this) && turn) {
                    let a = false, b = false;

                    if (id1 >= 0) a = addValue(id1);
                    if (id2 >= 0) b = addValue(id2);
                    this.classList.add('line-active');
                    this.setAttribute('data-active', 'true');

                    if (a === false && b === false) {
                        computer();
                    }
                }
            });
        });
    };

    const acquire = (id) => {
        let color;
        if (turn) {
            color = 'bg-salmon';
            setYou(you + 1);
        } else {
            color = 'bg-skyblue';
            setComp(comp + 1);
        }

        document.querySelector(`div.box[data-id='${id}']`).classList.add(color);
        boxes[id] = 'full';

        document.querySelector('.player2').textContent = `You : ${you}`;
        document.querySelector('.player1').textContent = `Computer : ${comp}`;

        let full = true;
        for (let i = boxes.length - 1; i >= 0; i--) {
            if (boxes[i] !== 'full') {
                full = false;
                break;
            }
        }

        if (full) alert(`${you > comp ? 'You' : 'Computer'} won`);
    };

    const addValue = (id) => {
        boxes[id]++;
        if (boxes[id] === 4) {
            acquire(id);
            return true;
        }
        return false;
    };

    const checkValid = (t) => {
        return t.getAttribute('data-active') === 'false';
    };

    const computer = () => {
        setTurn(false);
        document.getElementById('turn').textContent = 'Turn : Computer';

        setTimeout(() => {
            const length = boxes.length;
            const arr3 = [], arr2 = [], arr1 = [], arr0 = [];

            for (let i = length - 1; i >= 0; i--) {
                if (boxes[i] === 3) arr3.push(i);
                else if (boxes[i] === 2) arr2.push(i);
                else if (boxes[i] === 1) arr1.push(i);
                else arr0.push(i);
            }

            if (arr3.length > 0) {
                computerSelect(arr3[random(0, arr3.length - 1)]);
            } else if (arr1.length > 0) {
                computerSelect(arr1[random(0, arr1.length - 1)]);
            } else if (arr0.length > 0) {
                computerSelect(arr0[random(0, arr0.length - 1)]);
            } else if (arr2.length > 0) {
                computerSelect(arr2[random(0, arr2.length - 1)]);
            }
        }, 500);
    };

    const computerSelect = (id) => {
        document.querySelectorAll(`div.line[data-line-1='${id}'], div.line[data-line-2='${id}']`).forEach(v => {
            if (!v.classList.contains('line-active')) {
                const id1 = parseInt(v.getAttribute('data-line-1'));
                const id2 = parseInt(v.getAttribute('data-line-2'));

                if (checkValid(v) && !turn) {
                    let a = false, b = false;
                    if (id1 >= 0) a = addValue(id1);
                    if (id2 >= 0) b = addValue(id2);
                    v.classList.add('line-active');
                    v.setAttribute('data-active', 'true');

                    if (a || b) {
                        computer();
                    } else {
                        setTurn(true);
                        document.getElementById('turn').textContent = 'Turn : You';
                    }
                }
            }
        });
    };

    const random = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    return (
        <div id="app" className="p-10 m-0 bg-white text-center relative">
            <div className="player1 text-skyblue font-bold text-lg">Computer : {comp}</div>
            <div className="player2 text-salmon font-bold text-lg">You : {you}</div>
            <div id="turn" className="text-lg">Turn : {turn ? 'You' : 'Computer'}</div>
            <Board elements={html} />
        </div>
    );
};

export default Game;