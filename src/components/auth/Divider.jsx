import React from 'react'

export const Divider = () => {
    return (
        <div className='relative flex p-6 pt-0 items-center w-full'>
            <div className='flex-grow border-t border-gray-700 dark:border-gray-700'></div>
            <span className='flex-shrink mx-4 text-gray-700 dark:text-gray-700'>OR</span>
            <div className='flex-grow border-t border-gray-700 dark:border-gray-700'></div>
        </div>

    )
}
