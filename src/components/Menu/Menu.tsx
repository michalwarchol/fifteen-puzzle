import React, { useState } from 'react'
import "./Menu.css"

interface ImageProps {
    img: string,
    num: number,
    handleClick(n: number): void,
    chosen: number
}
const Image: React.FC<ImageProps> = ({img, num, handleClick, chosen}) => {
    const onClick = () => {
        handleClick(num)
    }
    return (
        <div className="menu_image" onClick={onClick}>
            <img src={require("../../img/"+img)} alt="not found" style={chosen===num?{transform: "scale(1.3)"}:{}}/>
            <div className="bg_div"
            style={chosen===num?{backgroundColor: "#7579e7"}:{}}></div>
        </div>
    )
}

interface MenuProps {
    setImg(n: number): void,
    startGame(): void
}

const Menu:React.FC<MenuProps> = ({setImg, startGame}) => {
    const [images] = useState<string[]>(["img0.png", "img1.png", "img2.png", "img3.png"]);
    const [chosen, setChosen] = useState<number>(0)
    const handleClick = (n: number) => {
        setImg(n)
        setChosen(n)
    }
    return(
        <div className="menu_content">
            <h2>Choose Picture</h2>
            <div className="menu_images">
            {images.map((elem, index)=>{
                return <Image img={elem} num={index} handleClick={handleClick} key={index} chosen={chosen} />
            })}
            </div>
            <h3 onClick={startGame}>Play</h3>
        </div>
    )
}

export default Menu