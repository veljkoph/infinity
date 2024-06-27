import Header from '@/Components/Header'
import React from 'react'

const Layout = ({ children }) => {
    return (
        <div className='max-w-screen-lg mx-auto min-h-screen flex flex-col'>
            <Header />
            <div className='flex flex-grow'>
                {children}
            </div>


        </div>
    )
}

export default Layout
