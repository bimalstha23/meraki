import { useState } from 'react'
import { Tab } from '@headlessui/react'
import { useSelector } from 'react-redux'
import { Comments } from './Comments'
import { Description } from './Description'
function classNames(...classes:any) {
  return classes.filter(Boolean).join(' ')
}

export  function OtherProductDetails() {
  const tabList = [
    'Description',
    'Reviews',
    'videos',

]
    const currentProduct  = useSelector((state:any)=>state.product.currentProduct)    

  return (
    <div className="w-full px-2 py-16 sm:px-0">
      <Tab.Group>
        <Tab.List className="flex flex-row justify-start rounded-xl">
          {tabList.map((category,key) => (
            <Tab
              key={key}
              className={({ selected }) =>
                classNames(
                  'w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700',
                  'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
                  selected
                    ? 'bg-white shadow'
                    : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'
                )
              }
            >
              {category}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels className="mt-2">
          <Tab.Panel>
              <Description Description = {currentProduct?.Description}/>
          </Tab.Panel>
          <Tab.Panel>
                hello Reviews
                <Comments productId = {currentProduct?.id} />
          </Tab.Panel>
          <Tab.Panel>
                hello video
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  )
}
