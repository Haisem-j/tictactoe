import React from 'react';
import { useBoardContext } from '../../context/BoardContext';
import Row from '../Units/Row';

import './boardContainer.css'

const BoardContainer = () => {
    const { boardGame } = useBoardContext()
    function renderRows() {
        return boardGame.map((row, index) => {
            return <Row key={index + 1} rowNumber={index + 1} blocks={row}/>
        })
    }
    return (
        <div className="boardContainer">
            {renderRows()}
        </div>
    )
}

export default BoardContainer;