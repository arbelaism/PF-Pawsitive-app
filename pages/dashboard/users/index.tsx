import { 
    Header, 
    LeftNavbar, 
    TableUser,
 } from "../../../components/dashboard"

// import BarGraphic from "components/dashboard/graphics/BarGraphic"

const DashboardAdm = () => {
    return (
        <div>
            <Header />
            <LeftNavbar />
            <div className="mx-auto ">
            <TableUser />

            </div>

   
        
        </div>
    )
}
export default DashboardAdm