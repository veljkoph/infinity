import ModalDraw from '@/Components/Tasks/ModalDraw';
import useStringSimilarity from '@/Hooks/UseStringSimilarity';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Stage, Layer, Line, Text } from 'react-konva';
import { createWorker } from 'tesseract.js';


const Draw = ({ task }) => {
    const { t } = useTranslation()
    const [tool, setTool] = React.useState('pen');
    const [lines, setLines] = React.useState([]);
    const isDrawing = React.useRef(false);
    const stageRef = React.useRef(null);
    const { similarity, calculateSimilarity } = useStringSimilarity();

    const [fontSize, setFontSize] = React.useState(160);
    const [isLoading, setIsLoading] = React.useState(false);

    React.useEffect(() => {

        const baseFontSize = 240;
        const fontSizeStep = 10;
        const newFontSize = baseFontSize - ((task.helperText.length - 1) * fontSizeStep);
        setFontSize(newFontSize);
    }, [task]);


    const [selectedImage, setSelectedImage] = React.useState(null);
    const [textResult, setTextResult] = React.useState("");



    const handleExport = () => {
        const uri = stageRef.current.toDataURL();
        setSelectedImage(uri)

    };
    const convertImageToText = React.useCallback(async () => {
        let lang;
        const storedLang = localStorage.getItem('lang');
        switch (storedLang) {
            case 'sr':
                lang = 'srp_latn';
                break;
            case 'sr_cir':
                lang = 'srp';
                break;
            case 'cro':
                lang = 'hrv';
                break;
            default:
                lang = 'hrv';
        }
        console.log('Converting....')
        setIsLoading(true)
        const worker = await createWorker(lang)
        const { data } = await worker.recognize(selectedImage);
        setTextResult(data.text);
        setIsLoading(false)

        calculateSimilarity(data.text, task.helperText);

    }, [selectedImage]);

    React.useEffect(() => {
        if (!selectedImage) return;
        convertImageToText();
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
            <div className='flex flex-col items-center justify-center bg-white min-h-10'>
                <span className='text-center  text-xl font-bold'>{task.title}</span>
                {/* {isLoading ? "Loading..." : <span className="text-lg font-bold">Res: {textResult}</span>} */}
                {task.helperText && <span style={{ fontSize: `${fontSize}px` }} className={`absolute  rounded-md top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-10`}>{task.helperText}</span>}

                {/* <input type="file" id="upload" accept='image/*' onChange={handleChangeImage} /> */}

            </div>
            {textResult && <ModalDraw setLines={setLines} setTextResult={setTextResult} similarity={similarity} result={textResult} hasNextTask={task.nextTaskId} lessonId={task.lessonId} />}
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
            {/* <select
                value={tool}
                onChange={(e) => {
                    setTool(e.target.value);
                }}
            >
                <option value="pen">Pen</option>
                <option value="eraser">Eraser</option>
            </select> */}
            <button className='bg-green-700 text-white p-2 rounded-md  absolute right-20' onClick={handleExport}>{t('check')}</button>
        </div>
    );
};
export default Draw;
