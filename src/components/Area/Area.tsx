import React from 'react'
import "./Area.css"

type Puzzle = {
    x: number,
    y: number
}

interface Props{
    number: number,
    x: number,
    y: number,
    structure: number[][],
    emptyPuzzle: Puzzle,
    moves: number,
    setEmptyPuzzle: React.Dispatch<React.SetStateAction<Puzzle>>,
    setStructure: React.Dispatch<React.SetStateAction<number[][]>>,
    addMoves: React.Dispatch<React.SetStateAction<number>>
}

const Area: React.FC<Props> = ({number, x, y, structure, emptyPuzzle, moves, setStructure, setEmptyPuzzle, addMoves}) => {
    let isClickable=false;
    if(emptyPuzzle.x===x && emptyPuzzle.y+1===y){
        isClickable=true;
    }
    else if(emptyPuzzle.x===x && emptyPuzzle.y-1===y){
        isClickable=true;
    }
    else if(emptyPuzzle.x-1===x && emptyPuzzle.y===y){
        isClickable=true;
    }
    else if(emptyPuzzle.x+1===x && emptyPuzzle.y===y){
        isClickable=true;
    }

    const handleClick = () => {
        let struct = structure;
        struct[x][y]=-1;
        struct[emptyPuzzle.x][emptyPuzzle.y]=number;
        setStructure(struct)
        setEmptyPuzzle({x,y})
        addMoves(moves+1)
    }

    return(
        <div className="puzzle" 
        onClick={isClickable?handleClick:undefined}>
            <div className="puzzle_inner">
                <h1>{number!==-1?number:null}</h1>
            </div>
        </div>
    )
}

export default Area;