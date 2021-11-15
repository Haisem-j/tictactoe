import React, { useState, useEffect, useContext } from 'react';

export const BoardContext = React.createContext();

export function useBoardContext() {
    return useContext(BoardContext)
}

export function BoardProvider({ children }) {
    const [boardGame, setBoardGame] = useState([]);
    const [turn, setTurn] = useState(1);
    const [winner, setWinner] = useState(-1);


    useEffect(() => {
        setBoardGame([
            {
                1: -1,
                2: -1,
                3: -1
            },
            {
                1: -1,
                2: -1,
                3: -1
            },
            {
                1: -1,
                2: -1,
                3: -1
            },
        ])
    }, [])

    function takeTurn(rowNumber, blockNumber) {
        // Check if block is taken
        if (boardGame[rowNumber - 1][blockNumber] !== -1) {
            return null;
        }

        // Add to board game object
        let newState = [...boardGame];
        newState[rowNumber - 1][blockNumber] = turn;
        checkBoard();
        turn === 1 ? setTurn(2) : setTurn(1);

    }

    function checkBoard() {
        /**
         * All three cells in any row are the same
           All three cells in any column are the same
           All three cells traversing the board diagonally are the same.
         */

        // Check if we have a winner
        // Check if all 3 cells in any row are the same
        let winner = -1;
        let cache = [];
        boardGame.forEach(item => {
            let tempWinner = 0;
            for (const prop in item) {
                tempWinner += item;
            }
            cache.push(tempWinner);
            if (tempWinner === 3) {
                winner = 1;
            } else if (tempWinner === 6) {
                winner = 2;
            }
        })

        if (winner !== -1) {
            console.log('Winner in row: Player ', winner);
            setWinner(winner)
            return null
        }

        // Check if all 3 cells in any column are the same

        for (let i = 1; i < 4; i++) {
            let tempWinner = 0;
            boardGame.forEach(item => {
                console.log('Item[i]', item[i]);
                tempWinner += item[i];
            })
            console.log('Tempwinner: ', tempWinner);
            if (tempWinner === 3) {
                winner = 1;
            } else if (tempWinner === 6) {
                winner = 2;
            }
        }

        if (winner !== -1) {
            console.log('Winner in column: Player ', winner);
            setWinner(winner)
            return null
        }

        // Check diagonally 
        function recurseLeftDiagnolly(n, arrObj) {
            // Base Case -> when n gets to 3
            if (n === 3) {
                return arrObj[n - 1][n]
            }

            return recurseLeftDiagnolly(n + 1, arrObj) + arrObj[n - 1][n]
        }
        function recurseDiagnolly(n, i, arrObj) {
            // Base Case -> when n gets to 3 && i ++
            if (n === 3) {
                return arrObj[n - 1][i]
            }

            return recurseDiagnolly(n + 1, i - 1, arrObj) + arrObj[n - 1][i]
        }

        let tempWinner = recurseLeftDiagnolly(1, boardGame)

        if (tempWinner === 3) {
            console.log('Winner diagnol: Player ', tempWinner);
            setWinner(1)
            return null
        } else if (tempWinner === 6) {
            console.log('Winner diagnol: Player ', tempWinner);
            setWinner(2)
            return null
        } else {
            tempWinner = 0;
        }
        
        tempWinner = recurseDiagnolly(1, 3, boardGame)
        
        if (tempWinner === 3) {
            console.log('Winner diagnol: Player ', tempWinner);
            setWinner(1)
            return null
        } else if (tempWinner === 6) {
            console.log('Winner diagnol: Player ', tempWinner);
            setWinner(2)
            return null
        } else {
            tempWinner = 0;
        }

        // If tempWinner is still 0 then there is no winner
        // Now we check cache to see if the board is full
        let flag = false;
        cache.forEach((item) => {
            if (item < 3) {
                flag = true
            }
        })
        if (flag) {
            setWinner(-2)
        }
        console.log('No Winner');

    }


    return (
        <BoardContext.Provider value={{
            boardGame,
            turn,
            takeTurn,
            winner
        }}>
            {children}
        </BoardContext.Provider>
    )
}