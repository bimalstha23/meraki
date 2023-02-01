import React from 'react'
import { Link } from 'react-router-dom'

export const ProfileNavigation = () => {
  
  const profileNavigation = [
    {
      name: 'My Profile',
      path: '/profile',
      subtitle:'Your Profile Details can be change from here'
    },
    {
      name: 'My Orders',
      path: '/profile/orders',
      subtitle:' your orders details '
    },
    {
      name: 'My Addresses',
      path: '/profile/addresses',
      subtitle: 'Your Address Details can be change from here'
    },
    {
      name: 'My Reviews',
      path: '/profile/reviews',
      subtitle: 'Your Reviews Details'

    },
    {
      name: 'My Account Settings',
      path: '/profile/account-settings',
      subtitle: 'Your Account Settings Details can be change from here'
    },
  ]


  return (
    <div className='flex flex-col border-r border-gray-200'>
      <div className='flex flex-col gap-10'>
        {profileNavigation.map((items, key) => (
          <div key={key} className='flex flex-col'>
             <div className="px-4 sm:px-0">
              <Link to={items.path}>
              <h3 className="text-lg font-medium leading-6 text-gray-900">{items.name}</h3>
              </Link>
              <p className="mt-1 text-sm text-gray-600">
                {items.subtitle}
              </p>
            </div>

          </div>
        ))}
      </div>
    </div>
  )
}
