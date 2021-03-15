import React, { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import Area from "../Area/Area"
import Menu from '../Menu/Menu'
import WinScreen from "../WinScreen/WinScreen"
import "./Game.css"

const Game: React.FC = () => {

    const beginGame = () => {
        let struct = [
            [1, 2, 3, 4],
            [5, 6, 7, 8],
            [9, 10, 11, 12],
            [13, 14, 15, -1]
        ]; //primary structure
        let nullP = { x: 3, y: 3 }; //empty puzzle
        let lastDirection = 0; //last direction null element moved to
        let availableDirections = [true, false, false, true] //top, left, bottom, right
        for (let i = 0; i < 150; i++) { //generating random structure
            let elementMovedCorrectly = false;
            do {
                let direction = Math.floor(Math.random() * 4); //direction of empty puzzle
                if (availableDirections[direction] && (direction !== (lastDirection > 1 ? lastDirection + 2 : lastDirection - 2))) {
                    let help; //support variable
                    switch (direction) { //changes in structure based on direction
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
                    lastDirection = direction; //new last direction
                    elementMovedCorrectly = true; //everything is fine, element moved correctly

                    //update available directions in new loop cycle
                    if (nullP.x === 0) availableDirections[0] = false; else availableDirections[0] = true;
                    if (nullP.x === 3) availableDirections[2] = false; else availableDirections[2] = true;
                    if (nullP.y === 0) availableDirections[3] = false; else availableDirections[3] = true;
                    if (nullP.y === 3) availableDirections[1] = false; else availableDirections[1] = true;
                }
            } while (!elementMovedCorrectly)
        }
        return {struct, emptyPuzzle: findEmptyPuzzle(struct)}; //returns object of struct and position of empty puzzle
    }

    type Puzzle = {
        x: number,
        y: number
    }

    const findEmptyPuzzle = (struct: number[][]): Puzzle => { //takes a structure and finds an empty puzzle
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

    const startGame = () => {
        setGameOn(!gameOn)
    }

    const switchImage = (num: number) => {
        setImageNum(num)
    }

    const checkGameStatus = () => {
        let gameFinished = true;
        structure.forEach((el, i) => {
            el.forEach((elem, index) => {
                if (elem !== i * 4 + index + 1 && elem !== -1) {
                    gameFinished = false;
                }
            })
        })
        if(gameFinished) setFinished(true);
    }

    const playAgain = () => {
        let gameObject = beginGame();
        setGameOn(true);
        addMoves(0);
        setFinished(false);
        setStructure(gameObject.struct);
        setEmptyPuzzle(gameObject.emptyPuzzle);
    }

    //---------
    //  STATE
    // |     |
    // V     V
    //  STATE
    //---------
    const [gameOn, setGameOn] = useState<boolean>(true);
    const [imageNum, setImageNum] = useState<number>(0);
    const [structure, setStructure] = useState<number[][]>(beginGame().struct);
    const [emptyPuzzle, setEmptyPuzzle] = useState<Puzzle>(findEmptyPuzzle(structure))
    const [moves, addMoves] = useState<number>(0);
    const [finished, setFinished] = useState<boolean>(false);

    const imgRef = useRef<HTMLImageElement>(null);
    console.log(gameOn)
    return (
        <div className="container">
            <div className="title"><h1>Fifteen Puzzle</h1></div>
            {gameOn ? //set your options
                <Menu startGame={startGame} setImg={switchImage} />
                ://game has started
                <div className="content">
                    <motion.div
                        className="template"
                        whileTap={{ width: 300, height: 300 }}>
                        <img src={require("../../img/img" + imageNum + ".png")} alt="not found" ref={imgRef} onContextMenu={() => false} />
                    </motion.div>
                    <div className="game">
                        <div className="game_inner">
                            {structure.map((elem, i) => {
                                return elem.map((element, index) => {
                                    return <Area
                                        number={element}
                                        x={i}
                                        y={index}
                                        moves={moves}
                                        finished={finished}
                                        addMoves={addMoves}
                                        structure={structure}
                                        emptyPuzzle={emptyPuzzle}
                                        imgRef={imgRef}
                                        setStructure={setStructure}
                                        setEmptyPuzzle={setEmptyPuzzle}
                                        checkGameStatus={checkGameStatus}
                                        key={i + ", " + index} />
                                })
                            })}
                        </div>
                        <div className="moves">
                            <span>Total moves: {moves}</span>
                            <div className="button">
                                <span onClick={playAgain}>&#8592; Go back</span>
                            </div>
                        </div>
                    </div>
                    <WinScreen finished={finished} moves={moves} playAgain={playAgain} />
                </div>
            }
            <div className="info">
                <small>Copyright &copy; {new Date().getFullYear()} Michał Warchoł</small>
            </div>
        </div>
    )
}

export default Game;