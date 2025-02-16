import Header from './header/Header'
import Footer from './footer/Footer'
import Main from './main/Main'
function Client() {
    return(
        <>
            <div className="grid h-screen grid-rows-[73px_1fr] grid-cols-1 overflow-hidden">
                <div className='flex flex-col min-h-screen overflow-y-auto'>
                    <Header />
                    <Main />
                    <Footer />
                </div>
            </div>
        </>
    )
}

export default Client;