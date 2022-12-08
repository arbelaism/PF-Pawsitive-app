import { Header, LeftNavbar, SalePerMontPrice, SalePerMontProduct, ProductMoreSold, BalancePerMont } from "../../components/dashboard"

const DashboardAdm = () => {
    return (
        <div>
            <Header />
            <LeftNavbar />
            <div className="flex space-x-4 w-screen border-2 border-black">
                <div className="w-1/3 border-2 border-black place-items-center bg-pwpurple-100">
                    <SalePerMontPrice />
                </div>
                <div className="w-1/3 border-2 border-black place-items-center bg-pwgreen-200">
                    <SalePerMontProduct />
                </div>
                <div  className="w-1/3 border-2 border-black place-items-center bg-pwgreen-200">
                    <ProductMoreSold />
                </div>
            </div>
            <div className="w-screen h-screen border-2 border-black bg-pwgreen-200">
                    <BalancePerMont />
            </div>
        
        </div>
    )
}
export default DashboardAdm