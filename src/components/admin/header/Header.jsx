import { faCarAlt, faFileCirclePlus, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useLocation } from "react-router-dom";
export default function Header() {
    const isCars = useLocation().pathname.includes('/cars');
    const isClients = useLocation().pathname.includes('/clients');
    const isContracts = useLocation().pathname.includes('/contract');
    return (
        <header className="dark:text-gray-100 text-gray-900 dark:bg-gray-900 bg-white p-4 min-h-[73px] flex items-center">
            {isCars && (
                <div className="flex items-center justify-between w-full">
                    <h2 className="text-xl">Cars Page</h2>
                    <Link to="/admin/cars/create" className="py-2 px-6 rounded-xl dark:bg-gray-800 hover:dark:bg-gray-700 dark:text-gray-100 bg-gray-300 hover:bg-gray-400 font-medium"><FontAwesomeIcon icon={faCarAlt}/> Add Car</Link>
                </div>
            )}
            {isClients && (
                <div className="flex items-center justify-between w-full">
                    <h2 className="text-xl">Clients Page</h2>
                    <Link to="/admin/clients/create" className="py-2 px-6 rounded-xl dark:bg-gray-800 hover:dark:bg-gray-700 dark:text-gray-100 bg-gray-300 hover:bg-gray-400 font-medium"><FontAwesomeIcon icon={faUserPlus}/> Add Client</Link>
                </div>
            )}
            {isContracts && (
                <div className="flex items-center justify-between w-full">
                    <h2 className="text-xl">Contracts Page</h2>
                    <Link to="/admin/contracts/create" className="py-2 px-6 rounded-xl dark:bg-gray-800 hover:dark:bg-gray-700 dark:text-gray-100 bg-gray-300 hover:bg-gray-400 font-medium"><FontAwesomeIcon icon={faFileCirclePlus}/> Add Contract</Link>
                </div>
            )}
        </header>
    )
}