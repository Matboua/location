
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faCar, faUsers, faCarOn, faFile } from '@fortawesome/free-solid-svg-icons';
import { Link, useLocation } from 'react-router-dom';

export default function Sidebar() {
    const location = useLocation()
    const isHome = location.pathname.includes('/home')
    const isCars = location.pathname.includes('/cars')
    const isClients = location.pathname.includes('/clients')
    const isContracts = location.pathname.includes('/contracts')
    return(
        <aside className="dark:bg-gray-900 bg-white h-full row-span-2">
            <div className="logo h-[73px] flex items-center p-5">
                <a href="#" className="dark:text-gray-100 text-gray-900 text-2xl"><FontAwesomeIcon icon={faCarOn} /> <span>Location</span></a>
            </div>
            <nav>
                <ul className="dark:text-gray-100 text-gray-900 flex flex-col">
                    <li>
                        <Link className="w-full block py-3 hover:bg-slate-300 dark:hover:bg-slate-600 p-5" to="/admin/home">
                            <FontAwesomeIcon icon={faHome} />
                            <span className='p-2'>Home</span>
                        </Link>
                    </li>
                    <li>
                        <Link className="w-full block py-3 hover:bg-slate-300 dark:hover:bg-slate-600 p-5" to="/admin/clients">
                            <FontAwesomeIcon icon={faUsers} /> 
                            <span className='p-2'>Clients</span>
                        </Link>
                    </li>
                    <li>
                        <Link className="w-full block py-3 hover:bg-slate-300 dark:hover:bg-slate-600 p-5" to="/admin/cars">
                            <FontAwesomeIcon icon={faCar} /> 
                            <span className='p-2'>Cars</span>
                        </Link>
                    </li>
                    <li>
                        <Link  className="w-full block py-3 hover:bg-slate-300 dark:hover:bg-slate-600 p-5" to="/admin/contracts">
                            <FontAwesomeIcon icon={faFile }/> 
                            <span className='p-2'>Contract</span>
                        </Link>
                    </li>
                </ul>
            </nav>
        </aside>
    )
}