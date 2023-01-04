import Head from 'next/head'
import { Navbar, Footer } from 'components'

type MainLayoutProps = {
    children: React.ReactNode
    title: String
}

const MainLayout = ({ children, title }: MainLayoutProps) => {
    return (
        <>
            <Head>
                <title>{title}</title>
                <meta
                    name="description"
                    content="App created for Henry focused on adoptions and many other services for your pets"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className="h-full">
                <Navbar />
                <main className="max-w-full bg-pwgreen-100 mx-auto min-h-screen">
                    {children}
                </main>
                <Footer />
            </div>
        </>
    )
}

export default MainLayout
