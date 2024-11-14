import Xarrow, { useXarrow, Xwrapper } from 'react-xarrows';

const ConnectableQuestion = ({ id, pairs, selectedElement, setSelectedElement, item }) => {
    const updateXarrow = useXarrow()
    const isGreen = pairs.some(pair => pair.start === id);



    if (item.question.image && !item.question.text) return <div onClick={() => setSelectedElement(item)} id={id} className={` ${selectedElement?.id === item?.id ? 'bg-[#a5c2f4] text-white' : 'text-black bg-white'}   ${!isGreen && 'hover:bg-[#a5c2f4]  hover:text-white'} h-full  text-xl hover:text-white text-black  duration-300 ease-in-out  flex justify-center rounded items-center p-2 cursor-pointer  ${isGreen && 'bg-[#36c980] text-white'}`}>
        <img
            src={`${import.meta.env.VITE_APP_BASE_URL}/storage/${item.question.image}`}
            alt={item.question.text}
            className='w-24 h-24 object-contain rounded-md '
        />

    </div>
    if (item.question.image && item.question.text) return <div onClick={() => setSelectedElement(item)} id={id} className={` ${selectedElement?.id === item?.id ? 'bg-[#a5c2f4] text-white' : 'text-black bg-white'}  flex-col  ${!isGreen && 'hover:bg-[#a5c2f4]  hover:text-white'} h-full  text-xl hover:text-white text-black  duration-300 ease-in-out  flex justify-center rounded items-center p-2 cursor-pointer  ${isGreen && 'bg-[#36c980] text-white'}`}>
        <img
            src={`${import.meta.env.VITE_APP_BASE_URL}/storage/${item.question.image}`}
            alt={item.question.text}
            className='w-24 h-24 object-contain rounded-md '
        />
        <span className='font-bold text-center'> {item.question.text}</span>
    </div>

    return (
        <div onClick={() => setSelectedElement(item)} id={id} className={`
            text-xl duration-300 ease-in-out flex justify-center
            rounded items-center pt-5 pb-5 px-20 cursor-pointer
            ${selectedElement?.id === item?.id
                ? 'bg-[#a5c2f4] text-white'
                : isGreen
                    ? 'bg-[#36c980] text-white'
                    : 'hover:bg-[#a5c2f4] hover:text-white bg-white'
            }
          `}>
            <span className='font-bold text-center'> {item.question.text}</span>
        </div>
    )

}
export default ConnectableQuestion
