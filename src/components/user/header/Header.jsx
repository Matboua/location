import { faCarOn, faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
export default function Header() {
	// Dark Mode
	const [dark, setDark] = useState(false);
	const darkModeHandler = () => {
		setDark(!dark);
		document.documentElement.classList.toggle("dark");
	};
	// Urls
	const isHome = useLocation().pathname === "/";
	const isCars = useLocation().pathname.includes("/cars");
	const isArticles = useLocation().pathname.includes("/articles");
	const isAbout = useLocation().pathname.includes("/about");
	const isContact = useLocation().pathname.includes("/contact");
	return (
		<header
			className="sticky top-0 z-50 dark:text-gray-100 text-gray-900 dark:bg-gray-900 bg-white p-4 min-h-[73px] flex items-center"
			style={{ boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }}
		>
			<div className="relative flex items-center justify-between w-full px-10">
				<a
					href="#"
					className="dark:text-gray-100 text-gray-900 text-2xl font-medium"
				>
					<FontAwesomeIcon className="text-blue-600" icon={faCarOn} />
					<span> Carvoy</span>
				</a>
				<ul
					className="flex gap-15 absolute left-[50%] font-medium text-"
					style={{ transform: "translateX(-50%)" }}
				>
					<li className={isHome ? "text-blue-600" : "hover:text-blue-600"}>
						<Link to="/">Home</Link>
					</li>
					<li className={isCars ? "text-blue-600" : "hover:text-blue-600"}>
						<Link to="/cars">Cars & Vehicles</Link>
					</li>
					<li className={isArticles ? "text-blue-600" : "hover:text-blue-600"}>
						<Link to="/articles">Articles</Link>
					</li>
					<li className={isAbout ? "text-blue-600" : "hover:text-blue-600"}>
						<Link to="/about-us">About Us</Link>
					</li>
					<li className={isContact ? "text-blue-600" : "hover:text-blue-600"}>
						<Link to="/contact-us">Contact Us</Link>
					</li>
				</ul>
				<div>
					{/* Dark Mode Button */}
					<button
						className=" w-10 h-10 py-2 px-3 ml-3 cursor-pointer rounded-xl dark:bg-gray-800 hover:dark:bg-gray-700 text-blue-600 bg-blue-100 hover:bg-blue-200 font-medium"
						onClick={() => darkModeHandler()}
					>
						{!dark && <FontAwesomeIcon icon={faSun} />}
						{dark && <FontAwesomeIcon icon={faMoon} />}
					</button>
				</div>
			</div>
		</header>
	);
}
