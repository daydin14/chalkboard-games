import React from 'react';
import Box from './Box';
import Line from './Line';
import Dot from './Dot';

const Board = ({ elements }) => {
    return (
        <div className="relative">
            {elements.map((element, index) => {
                if (element.type === 'box') {
                    return <Box key={index} {...element} />;
                } else if (element.type === 'lineh' || element.type === 'linev') {
                    return <Line key={index} {...element} />;
                } else if (element.type === 'dot') {
                    return <Dot key={index} {...element} />;
                }
                return null;
            })}
        </div>
    );
};

export default Board;