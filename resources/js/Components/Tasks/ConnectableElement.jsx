import Xarrow, { useXarrow, Xwrapper } from 'react-xarrows';

const ConnectableElement = ({ id, setPairs, selectedElement, setSelectedElement, ...props }) => {
    const updateXarrow = useXarrow()

    return (
        <div onClick={() => setSelectedElement(id)} id={id} className={` ${selectedElement === id ? 'bg-[#a5c2f4] text-white' : 'text-black bg-white'} h-10  hover:bg-[#a5c2f4] text-xl hover:text-white text-black  duration-300 ease-in-out  flex justify-center rounded items-center pt-5 pb-5 px-20 cursor-pointer`}>
            <span className='font-bold text-center'> {props.label}</span>
        </div>
    )

}
export default ConnectableElement
