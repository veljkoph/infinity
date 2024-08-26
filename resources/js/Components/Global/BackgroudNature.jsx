import React from 'react'

const BackgroudNature = () => {
    return (
        <img src={`${import.meta.env.VITE_APP_BASE_URL}/storage/bg.jpg`} className='absolute bottom-0 top-0 opacity-50 left-0 w-full h-full  object-cover' />
    )
}

export default BackgroudNature
