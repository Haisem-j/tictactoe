import React from 'react';
import BoardContainer from './components/BoardContainer';
import { useBoardContext } from './context/BoardContext';

const App = () => {
    const { turn, winner } = useBoardContext()
    return (
        <div className="container">
            <h1>Player {turn} Turn</h1>
            <BoardContainer />
        </div>
    )
}

export default App;