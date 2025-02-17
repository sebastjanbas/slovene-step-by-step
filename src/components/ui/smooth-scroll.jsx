import React from 'react'

const SmoothScroll = ({ children }) => {
    return (
        <>
            <div />
            <div className='fixed top-0'>{children}</div>
        </>
    )
}

export default SmoothScroll