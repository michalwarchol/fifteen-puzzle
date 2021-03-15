import React from 'react'
import Canvas from '../Canvas/Canvas'
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
    finished: boolean,
    imgRef: React.RefObject<HTMLImageElement>,
    setEmptyPuzzle: React.Dispatch<React.SetStateAction<Puzzle>>,
    setStructure: React.Dispatch<React.SetStateAction<number[][]>>,
    addMoves: React.Dispatch<React.SetStateAction<number>>,
    checkGameStatus(): void
}

const Area: React.FC<Props> = ({number, x, y, structure, emptyPuzzle, moves, finished, imgRef, setStructure, setEmptyPuzzle, addMoves, checkGameStatus}) => {

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
        checkGameStatus()
    }

    return(
        <div className="puzzle" 
        onClick={isClickable&&!finished?handleClick:undefined}
        style={isClickable?{}:{cursor: "default"}}>
            <div className="puzzle_inner">
                <Canvas number={number} imgRef={imgRef}/>
            </div>
        </div>
    )
}

export default Area;