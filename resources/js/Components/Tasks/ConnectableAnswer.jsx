
const ConnectableAnswer = ({ id, setPairs, selectedElement, setSelectedElement, item, pairs }) => {

    const isGreen = pairs.some(pair => pair.end === id);

    const handleConnection = (id) => {
        if (!selectedElement) {
            return
        }
        setSelectedElement(null)
        if (selectedElement.id === id) {
            setPairs((prevPairs) => [...prevPairs, { start: selectedElement.question.id, end: item.answer.id }]);
        }
    }
    if (item.answer.image && !item.answer.text) {
        return (
            <div
                onClick={() => handleConnection(item.id)}
                id={id}
                className={`
                    h-full text-xl duration-300 ease-in-out flex justify-center rounded items-center p-2 cursor-pointer
                    ${isGreen ? 'bg-[#36c980] text-white' : 'bg-white text-black'}
                    ${!isGreen && selectedElement ? 'hover:bg-[#a5c2f4] hover:text-white' : ''}
                `}
            >
                <img
                    src={`${import.meta.env.VITE_APP_BASE_URL}/storage/${item.answer.image}`}
                    alt={item.answer.text}
                    className="w-24 h-24 object-contain rounded-md"
                />
            </div>
        );
    }

    if (item.answer.image && item.answer.text) {
        return (
            <div
                onClick={() => handleConnection(item.id)}
                id={id}
                className={`
                    h-full flex-col text-xl duration-300 ease-in-out flex justify-center rounded items-center p-2 cursor-pointer
                    ${isGreen ? 'bg-[#36c980] text-white' : 'bg-white text-black'}
                    ${!isGreen && selectedElement ? 'hover:bg-[#a5c2f4] hover:text-white' : ''}
                `}
            >
                <img
                    src={`${import.meta.env.VITE_APP_BASE_URL}/storage/${item.answer.image}`}
                    alt={item.answer.text}
                    className="w-24 h-24 object-contain rounded-md"
                />
                <span className="font-bold text-center">{item.answer.text}</span>
            </div>
        );
    }

    return (


        <div
            onClick={() => handleConnection(item.id)}
            id={id}
            className={`
    ${isGreen ? 'bg-[#36c980] text-white' : 'bg-white text-black'}
    ${!isGreen && selectedElement ? 'hover:bg-[#a5c2f4] hover:text-white' : ''}
    text-xl duration-300 ease-in-out flex justify-center rounded items-center pt-5 pb-5 px-20 cursor-pointer
  `}
        >
            <span className="font-bold text-center">{item.answer.text}</span>
        </div>


    )

}

export default ConnectableAnswer
