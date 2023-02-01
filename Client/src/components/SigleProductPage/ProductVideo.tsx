import React from 'react'

interface ProductVideoProps {
    video: string
}


export const ProductVideo = (props: ProductVideoProps) => {
    const { video } = props
    if (!video) return <h1>Video Comming Soon</h1>
    return (
        <div>
            <h1 className='text-2xl font-bold'>Video</h1>
        </div>
    )
}
