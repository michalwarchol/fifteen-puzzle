import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import "./WinScreen.css";

interface Props {
    finished: boolean,
    moves: number,
    playAgain(): void
}

const variants = {
    initial: {y: "100vh"},
    animate: {y: "-10vh", transition: {duration: 0.1, type: "spring", stiffness: 120}},
    exit: {y: "100vh"}
}

const WinScreen: React.FC<Props> = ({ finished, moves, playAgain }) => {
    return (
        <AnimatePresence>
            {finished &&
                <motion.div className="win_screen"
                variants={variants}
                initial="initial"
                animate="animate"
                exit="exit">
                    <h1>Congratulations</h1>
                    <h3>Your Score: {moves}</h3>
                    <div className="play_again">
                        <h2 onClick={playAgain}>Play again</h2>
                    </div>
                </motion.div>
            }
        </AnimatePresence>
    )
}

export default WinScreen;