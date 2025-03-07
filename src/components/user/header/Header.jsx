import { faCarOn, faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AppContext } from "../../../context/AppContext";
export default function Header() {
	const { user, token, setToken, setUser } = useContext(AppContext);
	const navigate = useNavigate();
	async function handleLogout(e) {
		e.preventDefault();
		const res = await fetch("/api/logout", {
			method: "post",
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		if (res.ok) {
			setUser(null);
			setToken(null);
			localStorage.removeItem("token");
			navigate("/");
		}
	}
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
					<div className="flex gap-3">
						{/* Authentication */}
						{user ? (
							<form onSubmit={handleLogout}>
								<button className="flex items-center justify-center dark:text-white text-blue-600 cursor-pointer dark:bg-gray-800 dark:hover:bg-blue-600 bg-blue-100 hover:bg-blue-200  py-2 w-20 border-2 border-blue-600 rounded-xl">
									Logout
								</button>
							</form>
						) : (
							<>
								<Link
									className="flex items-center justify-center text-white cursor-pointer dark:bg-blue-700 bg-blue-600 dark:hover:bg-blue-600 hover:bg-blue-700 py-1 w-20 rounded-xl"
									to="/login"
								>
									<button className="cursor-pointer">Login</button>
								</Link>
								<Link
									className="flex items-center justify-center text-white cursor-pointer dark:bg-gray-800 bg-gray-900 dark:hover:bg-gray-700 hover:bg-gray-800  py-1 w-20 rounded-xl"
									to="/register"
								>
									<button className="cursor-pointer">Register</button>
								</Link>
							</>
						)}
						{/* Dark Mode Button */}
						<button
							className="cursor-pointer w-11 py-2 px-3cursor-pointer rounded-xl dark:bg-gray-800 hover:dark:bg-gray-700 text-blue-600 bg-blue-100 hover:bg-blue-200 font-medium border-2 border-blue-600"
							onClick={() => darkModeHandler()}
						>
							{!dark && <FontAwesomeIcon icon={faSun} />}
							{dark && <FontAwesomeIcon icon={faMoon} />}
						</button>
					</div>
				</div>
			</div>
		</header>
	);
}
