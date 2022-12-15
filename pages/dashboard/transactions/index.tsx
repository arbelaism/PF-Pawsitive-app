import { DashboardLayout } from 'components/dashboard'
import{TableTransaction} from 'components/dashboard'
const Transactions = () => {
    return (
        <DashboardLayout title="Transacciones">
            <TableTransaction />
        </DashboardLayout>
    )
}
export default Transactions
