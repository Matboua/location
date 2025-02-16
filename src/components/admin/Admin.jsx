import Header from './header/Header'
import Footer from './footer/Footer'
import Sidebar from './sidebar/Sidebar';
import Main from './main/Main';

function Admin() {
    return(
        <>
            <div id='admin' className="grid h-screen grid-rows-[73px_1fr] grid-cols-[48px_1fr] transition-all duration-500 ease">
                    <Sidebar />
                <div className='flex flex-col min-h-screen overflow-y-auto'>
                    <Header />
                    <Main />
                    <Footer />
                </div>
            </div>
        </>
    )
}

export default Admin;