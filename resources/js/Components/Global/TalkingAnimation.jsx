import Lottie from 'lottie-react'
import React from 'react'
import talkingAnimation from '../../Animations/pen.json'
import { useTranslation } from 'react-i18next';

const TalkingAnimation = () => {
    const style = {
        height: 200,
    };

    const { t } = useTranslation()
    return (
        <div>
            <div className='absolute -right-52 bottom-100'>
                <img src={`${import.meta.env.VITE_APP_BASE_URL}/storage/bubble.png`}
                    alt='Chat'
                    className="max-w-60 " />

                <span className="max-w-48 top-12 font-bold text-xl left-14 absolute rounded-md ">{t('chooseLanguage')}</span>
            </div>
            <Lottie style={style} animationData={talkingAnimation} loop={true} />
        </div>
    )
}

export default TalkingAnimation
