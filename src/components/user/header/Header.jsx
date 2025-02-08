import { faCarOn, faCartPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useLocation } from "react-router-dom";
export default function Header() {
    const isUser = useLocation().pathname.includes('/user');
    return (
        <header className="dark:text-gray-100 text-gray-900 dark:bg-gray-900 bg-white p-4 min-h-[73px] flex items-center">
            {isUser && (
                <div className="flex items-center justify-between w-full px-10">
                    <a href="#" className="dark:text-gray-100 text-gray-900 text-2xl"><FontAwesomeIcon icon={faCarOn} /> <span>Location</span></a>
                    <FontAwesomeIcon icon={faCartPlus} size="xl" className="cursor-pointer"/>
                </div>
            )}
        </header>
    )
}