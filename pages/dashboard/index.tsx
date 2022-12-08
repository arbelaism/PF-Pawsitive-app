import { 
    Header, 
    LeftNavbar, 
    SalePerMontPrice, 
    SalePerMontProduct, 
    ProductMoreSold, 
    BalancePerMont,
    BalanceCurrentMont,
    RegisterAdoptions,
    RegisterUser } from "../../components/dashboard"

// import BarGraphic from "components/dashboard/graphics/BarGraphic"

const DashboardAdm = () => {
    return (
        <div>
            <Header />
            <LeftNavbar />
            <div className="flex space-x-4 w-screen border-2 border-black">
                <div className="w-1/3 border-2 border-black place-items-center bg-pwgreen-200">
                    <SalePerMontPrice />
                </div>
                <div className="w-1/3 border-2 border-black place-items-center bg-pwgreen-200">
                    <SalePerMontProduct />
                </div>
                <div  className="w-1/3 border-2 border-black place-items-center bg-pwgreen-200">
                    <ProductMoreSold />
                </div>
            </div>
            <div className="w-screen h-1/2 border-2 border-black bg-pwgreen-200">
                    <RegisterAdoptions />
            </div>
            <div className="w-screen h-1/2 border-2 border-black bg-pwgreen-200">
                    <BalancePerMont />
            </div>
            <div className="w-screen h-1/2 border-2 border-black bg-pwgreen-200">
                    <BalanceCurrentMont />
            </div>
            <div className="w-screen h-1/2 border-2 border-black bg-pwgreen-200">
                    <RegisterUser />
            </div>
   
        
        </div>
    )
}
export default DashboardAdm