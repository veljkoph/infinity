import Header from '@/Components/Header'
import React from 'react'

const Layout = ({ children }) => {
    return (
        <div className='max-w-screen-lg mx-auto'>
            <Header />
            <div>
                {children}
            </div>
        </div>
    )
}

export default Layout
