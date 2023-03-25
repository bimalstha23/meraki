import { ProfileNavigation } from './ProfileNavigation'
import { Outlet } from 'react-router-dom'

export const ProfilePage = () => {
    return (
        <div className='mt-28 flex flex-row gap-10 px-44'>
            <div>
                <ProfileNavigation />
            </div>
            <div className='w-full'>
                <Outlet />
            </div>

        </div>
    )
}
