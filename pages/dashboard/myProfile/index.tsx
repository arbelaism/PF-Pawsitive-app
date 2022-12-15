import { DashboardLayout } from 'components/dashboard'
import Profile from 'components/dashboard/dashboardUser/profile'

const MyProfile = () => {
    return (
        <DashboardLayout title="Usuarios">
            <Profile />
        </DashboardLayout>
    )
}
export default MyProfile;