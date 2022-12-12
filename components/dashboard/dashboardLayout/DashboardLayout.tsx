import Header from './Header'
import LeftNavbar from './LeftNavbar'

type DashBoardLayoutProps = {
    children: React.ReactNode
    title: string
}

const MainLayout = ({ children, title }: DashBoardLayoutProps) => {
    return (
        <div className="w-full h-screen flex overflow-hidden">
            <div className="relative transition-all lg:overflow-y-scroll lg:w-1/5">
                <div
                    id="leftNav"
                    className="absolute shadow-2xl -left-60 top-12 inset-y-0 transition-all z-20 lg:shadow-none lg:static">
                    <LeftNavbar />
                </div>
            </div>
            <div className="w-full flex flex-col bg-pwgreen-100 overflow-y-scroll lg:w-4/5">
                <Header title={title} />
                <main className="w-full flex justify-center items-center">
                    {children}
                </main>
            </div>
        </div>
    )
}

export default MainLayout
