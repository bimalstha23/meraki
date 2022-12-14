import React from 'react'
import { Profile } from './Profile'
import { ProfileNavigation } from './ProfileNavigation'

export const ProfilePage = () => {
    return (
        <div className='mt-28 flex flex-row gap-10 px-44'>
             <div>
             <ProfileNavigation/>
             </div>
             <div>
                <Profile/>
             </div>

        </div>
    )
}
