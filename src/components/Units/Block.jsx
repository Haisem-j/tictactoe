import React from 'react';
import { useBoardContext } from '../../context/BoardContext';

const Block = ({ rowNumber, block, blocks }) => {
    const { takeTurn } = useBoardContext()

    const renderTurn = () => {
        if(blocks[block] === 1){
            return 'X'
        }else if(blocks[block] === 2){
            return 'O'
        }else{
            return null
        }
    }
    return (
        <div className="block" onClick={() => takeTurn(rowNumber, block)}>
            {renderTurn()}
        </div>
    )
}

export default Block