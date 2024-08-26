import React from 'react';
import { Stage, Layer, Line, Text } from 'react-konva';
import { createWorker } from 'tesseract.js';

function downloadURI(uri, name) {
    var link = document.createElement('a');
    link.download = name;
    link.href = uri;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}



const Draw = ({ showHelp }) => {
    const [tool, setTool] = React.useState('pen');
    const [lines, setLines] = React.useState([]);
    const isDrawing = React.useRef(false);
    const stageRef = React.useRef(null);
    const text = "ДРУГ"
    const [fontSize, setFontSize] = React.useState(160);
    const [isLoading, setIsLoading] = React.useState(false);

    React.useEffect(() => {
        //Setting fontsize on canvas
        const baseFontSize = 240;
        const fontSizeStep = 10;
        const newFontSize = baseFontSize - ((text.length - 1) * fontSizeStep);
        setFontSize(newFontSize);
    }, [text]);


    const [selectedImage, setSelectedImage] = React.useState(null);
    const [textResult, setTextResult] = React.useState("");

    //ovde lezi problem -rerebder


    const handleExport = () => {
        const uri = stageRef.current.toDataURL();
        console.log(uri)
        setSelectedImage(uri)
        //downloadURI(uri, 'stage.png');
    };
    const convertImageToText = React.useCallback(async () => {
        console.log('Converting....')
        setIsLoading(true)
        const worker = await createWorker("srp")
        const { data } = await worker.recognize(selectedImage);
        setTextResult(data.text);
        setIsLoading(false)
    }, [selectedImage]);

    React.useEffect(() => {
        if (!selectedImage) return;
        convertImageToText();
        console.log('effect')
    }, [selectedImage, convertImageToText])


    const handleMouseDown = (e) => {
        isDrawing.current = true;
        const pos = e.target.getStage().getPointerPosition();
        setLines([...lines, { tool, points: [pos.x, pos.y] }]);
    };

    const handleMouseMove = (e) => {
        // no drawing - skipping
        if (!isDrawing.current) {
            return;
        }
        const stage = e.target.getStage();
        const point = stage.getPointerPosition();
        let lastLine = lines[lines.length - 1];
        // add point
        lastLine.points = lastLine.points.concat([point.x, point.y]);

        // replace last
        lines.splice(lines.length - 1, 1, lastLine);
        setLines(lines.concat());
    };

    const handleMouseUp = () => {
        isDrawing.current = false;
    };



    const handleChangeImage = e => {
        if (e.target.files[0]) {
            setSelectedImage(e.target.files[0]);
        } else {
            setSelectedImage(null);
            setTextResult("")
        }
    }



    return (
        <div className='bg-slate-200 relative'>
            <div className='flex flex-col bg-white min-h-10'>
                <span>Napiši reč sa slike</span>
                {isLoading ? "Loading..." : <span className="text-lg font-bold">Res: {textResult}</span>}
                {!showHelp && <span style={{ fontSize: `${fontSize}px` }} className={`absolute  rounded-md top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-10`}>{text}</span>}

                {/* <input type="file" id="upload" accept='image/*' onChange={handleChangeImage} /> */}

            </div>
            <Stage
                width={1024}
                height={window.innerHeight - 200}
                onMouseDown={handleMouseDown}
                onMousemove={handleMouseMove}
                onMouseup={handleMouseUp}
                ref={stageRef}
            >
                <Layer>


                    {lines.map((line, i) => (
                        <Line
                            key={i}
                            points={line.points}
                            stroke="#303030"
                            strokeWidth={15}
                            tension={0}
                            lineCap="round"
                            lineJoin="round"
                            globalCompositeOperation={
                                line.tool === 'eraser' ? 'destination-out' : 'source-over'
                            }
                        />
                    ))}
                </Layer>
            </Stage>
            <select
                value={tool}
                onChange={(e) => {
                    setTool(e.target.value);
                }}
            >
                <option value="pen">Pen</option>
                <option value="eraser">Eraser</option>
            </select>
            <button onClick={handleExport}>Click here to log stage data URL</button>
        </div>
    );
};
export default Draw;
// import { useCallback, useEffect, useState } from 'react';
// import { createWorker } from 'tesseract.js';

// function Draw() {

//     const handleChangeImage = e => {
//         if (e.target.files[0]) {
//             setSelectedImage(e.target.files[0]);
//         } else {
//             setSelectedImage(null);
//             setTextResult("")
//         }
//     }

//     return (
//         <div className="App">
//             <h1>ImText</h1>
//             <p>Gets words in image!</p>
//             <div className="input-wrapper">
//                 <label htmlFor="upload">Upload Image</label>
//                 <input type="file" id="upload" accept='image/*' onChange={handleChangeImage} />
//             </div>

//             <div className="result">
//                 {selectedImage && (
//                     <div className="box-image">
//                         <img src={URL.createObjectURL(selectedImage)} alt="thumb" />
//                     </div>
//                 )}
//                 {textResult && (
//                     <div className="box-p">
//                         <p>{textResult}</p>
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// }

// export default Draw;
