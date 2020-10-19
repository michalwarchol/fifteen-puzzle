import React, { useEffect, useState } from 'react'
import Area from "../Area/Area"
import "./Game.css"

const Game: React.FC = () => {

    const beginGame = () => {
        let struct = [
            [1, 2, 3, 4],
            [5, 6, 7, 8],
            [9, 10, 11, 12],
            [13, 14, 15, -1]
        ]; // copy of structure
        let nullP = { x: 3, y: 3 };
        let lastDirection = 0; //last direction null element moved to
        let availableDirections = [true, false, false, true] //top, left, bottom, right
        for (let i = 0; i < 150; i++) {
            let elementMovedCorrectly = false;
            do {
                let direction = Math.floor(Math.random() * 4)
                if (availableDirections[direction] && (direction !== (lastDirection > 1 ? lastDirection + 2 : lastDirection - 2))) {
                    let help;
                    switch (direction) {
                        case 0:
                            help = struct[nullP.x - 1][nullP.y];
                            struct[nullP.x - 1][nullP.y] = -1;
                            struct[nullP.x][nullP.y] = help;
                            nullP.x -= 1;
                            break;
                        case 1:
                            help = struct[nullP.x][nullP.y + 1];
                            struct[nullP.x][nullP.y + 1] = -1;
                            struct[nullP.x][nullP.y] = help;
                            nullP.y += 1;
                            break;
                        case 2:
                            help = struct[nullP.x + 1][nullP.y];
                            struct[nullP.x + 1][nullP.y] = -1;
                            struct[nullP.x][nullP.y] = help;
                            nullP.x += 1;
                            break;
                        case 3:
                            help = struct[nullP.x][nullP.y - 1];
                            struct[nullP.x][nullP.y - 1] = -1;
                            struct[nullP.x][nullP.y] = help;
                            nullP.y -= 1;
                            break;
                        default:
                            console.log("no chance :)")
                    }
                    lastDirection = direction
                    elementMovedCorrectly = true;
                    if (nullP.x === 0) availableDirections[0] = false; else availableDirections[0] = true;
                    if (nullP.x === 3) availableDirections[2] = false; else availableDirections[2] = true;
                    if (nullP.y === 0) availableDirections[3] = false; else availableDirections[3] = true;
                    if (nullP.y === 3) availableDirections[1] = false; else availableDirections[1] = true;
                }
            } while (!elementMovedCorrectly)
        }
        return struct;
    }

    type Puzzle = {
        x: number,
        y: number
    }
    const findEmptyPuzzle = (): Puzzle => {
        let struct = structure;
        let x: number = 0;
        let y: number = 0;
        struct.forEach((tab, index) => {
            if (tab.indexOf(-1) !== -1) {
                x = index;
                y = struct[x].indexOf(-1);
            }
        })
        return { x, y }
    }

    const [structure, setStructure] = useState<number[][]>(beginGame());
    const [emptyPuzzle, setEmptyPuzzle] = useState<Puzzle>(findEmptyPuzzle())
    const [moves, addMoves] = useState<number>(0);

    useEffect(() => {
        let finished = true;
        structure.forEach((el, i) => {
            el.forEach((elem, index) => {
                if (elem !== i * 4 + index + 1 && elem !== -1) {
                    finished = false;
                }
            })
        })
        console.log("----------")
        if (finished) {
            alert("eee")
            console.log("kurwica")
        }
    })

    return (
        <div className="container">
            <h1>Fifteen Puzzle</h1>
            <div className="content">
                <div className="game">
                    {structure.map((elem, i) => {
                        return elem.map((element, index) => {
                            return <Area
                                number={element}
                                x={i}
                                y={index}
                                moves={moves}
                                addMoves={addMoves}
                                structure={structure}
                                emptyPuzzle={emptyPuzzle}
                                setStructure={setStructure}
                                setEmptyPuzzle={setEmptyPuzzle}
                                key={i + ", " + index} />
                        })
                    })}
                </div>
                <div className="info">
                    Total moves: {moves}
                </div>
            </div>
        </div>
    )
}

export default Game;