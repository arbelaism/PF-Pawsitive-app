import { Header, LeftNavbar, SalePerMontPrice,SalePerMontProduct, ProductMoreSold } from "../../components/dashboard"

const DashboardAdm = () => {
    return (
        <div>
            <Header />
            <LeftNavbar />
            <SalePerMontPrice />
            <SalePerMontProduct />
            <ProductMoreSold />
        </div>
    )
}
export default DashboardAdm