import React from 'react'

export const Description = (props:{Description:string}) => {
    const {Description} = props
  return (
    <div>
        <h1 className='text-2xl font-bold'>Description</h1>
        <p className='text-gray-500 text-sm'>{Description}</p>
    </div>
  )
}
