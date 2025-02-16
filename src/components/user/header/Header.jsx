import { faCarOn, faCartPlus, faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
export default function Header() {
    // Dark Mode
    const [dark, setDark] = useState(false);
    const darkModeHandler = () => {
        setDark(!dark);
        document.documentElement.classList.toggle("dark");
    }
    // useLocation
    const isUser = useLocation().pathname.includes('/');
    return (
        <header className="dark:text-gray-100 text-gray-900 dark:bg-gray-900 bg-white p-4 min-h-[73px] flex items-center">
            {isUser && (
                <div className="relative flex items-center justify-between w-full px-10">
                    <a href="#" className="dark:text-gray-100 text-gray-900 text-2xl font-medium"><FontAwesomeIcon icon={faCarOn} /><span> Carvoy</span></a>
                    <ul className="flex gap-15 absolute left-[50%] font-medium text-" style={{transform:"translateX(-50%)"}}>
                        <li><Link>Home</Link></li>
                        <li><Link>Cars & Vehicles</Link></li>
                        <li><Link>Services</Link></li>
                        <li><Link>About Us</Link></li>
                        <li><Link>Contact Us</Link></li>
                    </ul>
                    <div>
                        <FontAwesomeIcon icon={faCartPlus} size="xl" className="cursor-pointer"/>
                        {/* Dark Mode Button */}
                        <button className=" w-10 h-10 py-2 px-3 ml-3 cursor-pointer rounded-xl dark:bg-gray-800 hover:dark:bg-gray-700 dark:text-gray-100 bg-gray-300 hover:bg-gray-400 font-medium" onClick={()=> darkModeHandler()}>
                            { !dark && <FontAwesomeIcon icon={faSun} /> }
                            { dark && <FontAwesomeIcon icon={faMoon} /> }
                        </button>
                    </div>
                </div>
            )}
            
        </header>
    )
}