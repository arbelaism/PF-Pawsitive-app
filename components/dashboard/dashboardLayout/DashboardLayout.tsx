import Header from './Header'
import LeftNavbar from './LeftNavbar'
import Head from 'next/head'

type DashBoardLayoutProps = {
    children: React.ReactNode
    title: string
}

const MainLayout = ({ children, title }: DashBoardLayoutProps) => {
    return (
        <>
            <Head>
                <title>{title} - Dashboard</title>
                <meta name="description" content="Pawsitive admin dashboard" />
            </Head>
            <div className="w-full h-screen flex overflow-hidden">
                <div className="relative transition-all lg:overflow-y-scroll lg:w-1/5">
                    <div
                        id="leftNav"
                        className="absolute shadow-2xl -left-60 top-[5rem] inset-y-0 transition-all z-40 lg:shadow-none lg:static">
                        <LeftNavbar />
                    </div>
                </div>
                <div className="w-full flex flex-col bg-pwgreen-100 overflow-y-scroll z-30 lg:w-4/5">
                    <Header title={title} />
                    <main className="w-full flex justify-center items-center">
                        {children}
                    </main>
                </div>
            </div>
        </>
    )
}

export default MainLayout
