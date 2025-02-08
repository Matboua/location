import Header from './header/Header'
import Footer from '../footer/Footer'
import Sidebar from './sidebar/Sidebar';
import Main from './main/Main';
function Admin() {
    return(
        <>
            <div className="grid h-screen grid-rows-[73px_1fr] grid-cols-[250px_1fr] overflow-hidden">
                <Sidebar />
                <div className='flex flex-col min-h-screen bg-red-500 overflow-y-auto'>
                    <Header />
                    <Main />
                    <Footer />
                </div>
            </div>
        </>
    )
}

export default Admin;