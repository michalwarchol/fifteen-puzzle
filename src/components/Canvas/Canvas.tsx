import React, { useRef, useEffect } from 'react'

interface Props {
    number: number,
    imgRef: React.RefObject<HTMLImageElement>
}

const Canvas: React.FC<Props> = ({ number, imgRef }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        if (number !== -1) {
            const canvas = canvasRef.current;
            const img = imgRef.current;
            let imgRow = Math.floor((number-1) / 4) * 120;
            let imgCol = (number-1) % 4 * 120;
            if (canvas && img) {
                const context = canvas.getContext("2d");
                context?.drawImage(img, imgCol, imgRow, 120, 120, 0, 0, 120, 120);
            }
        }else{
            const canvas = canvasRef.current;
            if (canvas) {
                const context = canvas.getContext("2d");
                context?.clearRect(0, 0, 120, 120);
            }
        }
    }, [number, imgRef])
    return <><canvas className="myCanvas" height="120px" width="120px" ref={canvasRef}></canvas></>
}

export default Canvas;