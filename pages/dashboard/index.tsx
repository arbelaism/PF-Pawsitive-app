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
        <DashboardLayout title="Resumen">
            <div className="w-full">
                <div className="px-7 my-5 grid grid-cols-1 gap-5 xl:grid-cols-2">
                    <ProductMoreSold />
                    <BalancePerMont />
                </div>
                <div className='px-7 my-5 grid grid-cols-1 gap-5 lg:grid-cols-2'>
                    <RegisterAdoptions />
                    <RegisterUser />
                </div>
                <div className="px-7 my-5 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
                    <SalePerMontPrice />
                    <SalePerMontProduct />
                    <BalanceCurrentMont />
                </div>
            </div>
        </DashboardLayout>
    )
}
export default DashboardAdm
