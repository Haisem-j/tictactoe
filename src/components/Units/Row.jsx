import React from 'react';
import Block from './Block';
import './units.css';

const Row = ({ rowNumber, blocks }) => {

    function renderBlocks() {
        return Object.keys(blocks).map(block =>{
            return <Block key={`Block${block}Row${rowNumber}`} rowNumber={rowNumber} block={block} blocks={blocks}/>
        })
    }
    return (
        <div className="row">
            {renderBlocks()}
        </div>
    )
}

export default Row;