import {
    DashboardLayout,
    SalePerMontPrice,
    SalePerMontProduct,
    ProductMoreSold,
    BalancePerMont,
    BalanceCurrentMont,
    RegisterAdoptions,
    RegisterUser
} from '../../components/dashboard'

// import BarGraphic from "components/dashboard/graphics/BarGraphic"

const DashboardAdm = () => {
    return (
        <DashboardLayout title='Resumen'>
            <div className='w-9/12'>
                <div className="flex justify-center align-middle space-x-12 w-full ">
                    <div className="w-auto   bg-pwgreen-100">
                        <SalePerMontPrice />
                    </div>
                    <div className="w-auto   bg-pwgreen-100">
                        <SalePerMontProduct />
                    </div>
                    <div className="w-auto   bg-pwgreen-100">
                        <ProductMoreSold />
                    </div>
                </div>
                <div className="w-auto h-1/2 b bg-pwgreen-100">
                    <RegisterAdoptions />
                </div>
                <div className="w-auto h-1/2  bg-pwgreen-100">
                    <BalancePerMont />
                </div>
                <div className="w-auto h-1/2  bg-pwgreen-100">
                    <BalanceCurrentMont />
                </div>
                <div className="w-auto h-1/2  bg-pwgreen-100">
                    <RegisterUser />
                </div>
            </div>

        </DashboardLayout>
    )
}
export default DashboardAdm
