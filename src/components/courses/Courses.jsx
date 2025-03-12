import React from 'react'
// import { Course } from './Course'
import { Skeleton } from './Skeleton'

export const Courses = () => {
    return (
        <div className='flex justify-center my-20'>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-36 gap-y-20'>
                {/* <Course title={"Course Title"} description={"Course Description"} duration={"2h"} image={'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.mm.bing.net%2Fth%3Fid%3DOIP.lSNHRLMwc6uZc15X7Zn1qwHaDt%26pid%3DApi&f=1&ipt=4dcd060c1c4a0ea67e5c424538f37891be4ce94300301122caa9c2d83ebb5303&ipo=images'} /> */}
                <Skeleton />
                <Skeleton />
                <Skeleton />
                <Skeleton />
                <Skeleton />
                <Skeleton />
                <Skeleton />
                <Skeleton />
                <Skeleton />
                <Skeleton />
                <Skeleton />
                <Skeleton />
            </div>
        </div>
    )
}
