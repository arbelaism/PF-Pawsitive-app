import { DashboardLayout } from 'components/dashboard'
import{TableUser} from 'components/dashboard'

const Users = () => {
    return (
        <DashboardLayout title="Usuarios">
            <TableUser />
        </DashboardLayout>
    )
}
export default Users
