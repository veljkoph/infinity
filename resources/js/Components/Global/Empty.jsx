import Lottie from 'lottie-react'
import React from 'react'
import pen from '../../Animations/pen.json'
import { useTranslation } from 'react-i18next'

const Empty = ({ text }) => {

    const style = {
        height: 400,
    };
    return (
        <div className="flex flex-row">
            <Lottie style={style} animationData={pen} loop={true} />
            <div className='relative'>
                <img src={`${import.meta.env.VITE_APP_BASE_URL}/storage/bubble.png`}
                    alt='Chat'
                    className="w-96 " />
                <span className="max-w-48 top-20 font-bold text-xl left-24 text-center absolute rounded-md ">{text}</span>
            </div>

        </div>

    )
}

export default Empty
