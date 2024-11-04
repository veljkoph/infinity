import Xarrow, { useXarrow, Xwrapper } from 'react-xarrows';

const ConnectableQuestion = ({ id, setPairs, selectedElement, setSelectedElement, item }) => {
    const updateXarrow = useXarrow()

    if (item.question.image && !item.question.text) return <div
        style={{
            borderRadius: 10,
            backgroundColor: 'white',
            width: '220px',
            padding: '5px',
            height: '220px',

        }}
    >
        <img
            src={`${import.meta.env.VITE_APP_BASE_URL}/storage/${item.question.image}`}
            alt={item.question.text}
            style={{
                width: '210px',
                height: '210px',
                overflow: 'hidden',
                objectFit: 'contain'
            }}
        />
    </div>

    if (item.question.image && item.question.text) return <div

        style={{
            borderRadius: 10,
            backgroundColor: 'white',
            cursor: 'pointer',
            width: '220px',
            padding: '5px',
            height: '220px',
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'center'
        }}
    >
        <img
            src={`${import.meta.env.VITE_APP_BASE_URL}/storage/${item.question.image}`}
            alt={item.question.text}

            style={{
                width: '160px',
                height: '160px',
                overflow: 'hidden',
                objectFit: 'contain'

            }}
        />
        <span className='text-center font-bold text-xl' > {item.question.text}</span>
    </div>
    return (


        <div onClick={() => setSelectedElement(id)} id={id} className={` ${selectedElement === id ? 'bg-[#a5c2f4] text-white' : 'text-black bg-white'} h-10  hover:bg-[#a5c2f4] text-xl hover:text-white text-black  duration-300 ease-in-out  flex justify-center rounded items-center pt-5 pb-5 px-20 cursor-pointer`}>
            <span className='font-bold text-center'> {item.question.text}</span>
        </div>
    )

}
export default ConnectableQuestion
