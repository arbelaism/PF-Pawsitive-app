import { DashboardLayout } from 'components/dashboard'
import{TableUser} from 'components/dashboard'

const Users = () => {
    return (
        <DashboardLayout title="Usuarios">
            <h1>USUARIOS</h1>
            <TableUser />
        </DashboardLayout>
    )
}
export default Users
