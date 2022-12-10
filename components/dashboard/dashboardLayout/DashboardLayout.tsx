import Header from './Header'
import LeftNavbar from './LeftNavbar'

type DashBoardLayoutProps = {
    children: React.ReactNode
    title: string
}

const MainLayout = ({ children, title }: DashBoardLayoutProps) => {
    return (
        <div className="w-full flex">
            <div className="w-1/5">
                <LeftNavbar active={title} />
            </div>
            <div className="w-4/5 flex flex-col bg-pwgreen-100">
                <Header title={title} />
                <main className='w-full'>{children}</main>
            </div>
        </div>
    )
}

export default MainLayout
