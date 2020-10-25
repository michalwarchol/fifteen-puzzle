import React from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import "./Options.css"

//variants--------------
const menuVariant = {
    initial: { scale: 0, opacity: 0 },
    animate: { scale: 1, opacity: 1, transition: { duration: 0.5, type: "spring", delay: 0.5 } },
    exit: { scale: 0, opacity: 0, transition: { duration: 0.5, type: "spring" } }
}

const returnVariant = {
    initial: { scale: 1.3, opacity: 0, x: -50, y: -50 },
    animate: { scale: 1, opacity: 1, x: 0, y: 0, transition: { delay: 0.5 } },
    exit: { scale: 1.3, opacity: 0, x: -50, y: -50 }
}
const logoutVariant = {
    initial: { scale: 1.3, opacity: 0, x: 50, y: -50 },
    animate: { scale: 1, opacity: 1, x: 0, y: 0, transition: { delay: 0.5 } },
    exit: { scale: 1.3, opacity: 0, x: 50, y: -50 }
}
const cancelVariant = {
    initial: { scale: 1.3, opacity: 0, x: -50, y: 50 },
    animate: { scale: 1, opacity: 1, x: 0, y: 0, transition: { delay: 0.5 } },
    exit: { scale: 1.3, opacity: 0, x: -50, y: 50 }
}
const templateVariant = {
    initial: { scale: 1.3, opacity: 0, x: 50, y: 50 },
    animate: { scale: 1, opacity: 1, x: 0, y: 0, transition: { delay: 0.5 } },
    exit: { scale: 1.3, opacity: 0, x: 50, y: 50 }
}

interface Props {
    menuOn: boolean,
    setMenuOn: React.Dispatch<React.SetStateAction<boolean>>
}

const Options: React.FC<Props> = ({ menuOn, setMenuOn }) => {

    const startMenu = () => {
        setMenuOn(!menuOn)
    }

    return (
        <div className="options">
            <div className="options_inner">
                <div className="options_menu">
                    <AnimatePresence>
                        {
                            !menuOn &&
                            <motion.svg
                                variants={menuVariant}
                                initial="initial"
                                animate="animate"
                                exit="exit"
                            >
                                <image onClick={startMenu} xlinkHref={require("../../img/menu.svg")} width="96" height="96" />
                            </motion.svg>
                        }
                    </AnimatePresence>
                </div>
                <div className="options_select">
                    <AnimatePresence>
                        {menuOn &&
                            <>
                                <motion.svg
                                    variants={returnVariant}
                                    initial="initial"
                                    animate="animate"
                                    exit="exit">
                                    <image onClick={startMenu} xlinkHref={require("../../img/return.svg")} width="96" height="96" />
                                </motion.svg>
                                <motion.svg
                                    variants={logoutVariant}
                                    initial="initial"
                                    animate="animate"
                                    exit="exit">
                                    <image onClick={startMenu} xlinkHref={require("../../img/logout.svg")} width="96" height="96" />
                                </motion.svg>
                                <motion.svg
                                    variants={cancelVariant}
                                    initial="initial"
                                    animate="animate"
                                    exit="exit">
                                    <image onClick={startMenu} xlinkHref={require("../../img/cancel.svg")} width="96" height="96" />
                                </motion.svg>
                                <motion.svg
                                    variants={templateVariant}
                                    initial="initial"
                                    animate="animate"
                                    exit="exit">
                                    <image onClick={startMenu} xlinkHref={require("../../img/template.svg")} width="96" height="96" />
                                </motion.svg>
                            </>
                        }
                    </AnimatePresence>
                </div>
            </div>
        </div>
    )
}

export default Options;