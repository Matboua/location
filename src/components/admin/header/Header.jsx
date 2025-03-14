"use client";

import {
	faCarAlt,
	faFileCirclePlus,
	faMoon,
	faSignOutAlt,
	faSun,
	faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { useAdminAuth } from "../../../context/AdminAuthContext";

export default function Header() {
	// Dark Mode
	const [dark, setDark] = useState(false);
	const darkModeHandler = () => {
		setDark(!dark);
		document.documentElement.classList.toggle("dark");
	};

	// Admin Auth
	const { adminLogout } = useAdminAuth();

	// Urls
	const isHome = useLocation().pathname.includes("/home");
	const isCars = useLocation().pathname.includes("/cars");
	const isClients = useLocation().pathname.includes("/clients");
	const isContracts = useLocation().pathname.includes("/contract");

	return (
		<header className="dark:text-gray-100 text-gray-900 dark:bg-gray-900 bg-white p-4 min-h-[73px] flex items-center">
			{isHome && (
				<div className="flex items-center justify-between w-full">
					<h2 className="text-xl">Home Page</h2>
				</div>
			)}
			{isCars && (
				<div className="flex items-center justify-between w-full">
					<h2 className="text-xl">Cars Page</h2>
					<Link
						to="/admin/cars/create"
						className="py-2 px-6 rounded-xl dark:bg-gray-800 hover:dark:bg-gray-700 dark:text-gray-100 bg-gray-300 hover:bg-gray-400 font-medium"
					>
						<FontAwesomeIcon icon={faCarAlt} /> Add Car
					</Link>
				</div>
			)}
			{isClients && (
				<div className="flex items-center justify-between w-full">
					<h2 className="text-xl">Clients Page</h2>
					<Link
						to="/admin/clients/create"
						className="py-2 px-6 rounded-xl dark:bg-gray-800 hover:dark:bg-gray-700 dark:text-gray-100 bg-gray-300 hover:bg-gray-400 font-medium"
					>
						<FontAwesomeIcon icon={faUserPlus} /> Add Client
					</Link>
				</div>
			)}
			{isContracts && (
				<div className="flex items-center justify-between w-full">
					<h2 className="text-xl">Contracts Page</h2>
					<Link
						to="/admin/contracts/create"
						className="py-2 px-6 rounded-xl dark:bg-gray-800 hover:dark:bg-gray-700 dark:text-gray-100 bg-gray-300 hover:bg-gray-400 font-medium"
					>
						<FontAwesomeIcon icon={faFileCirclePlus} /> Add Contract
					</Link>
				</div>
			)}

			<div className="flex ml-auto">
				{/* Logout Button */}
				<button
					onClick={adminLogout}
					className="mr-3 py-2 px-3 cursor-pointer rounded-xl dark:bg-red-800 hover:dark:bg-red-700 text-white bg-red-600 hover:bg-red-700 font-medium flex items-center"
				>
					<FontAwesomeIcon icon={faSignOutAlt} className="mr-2" /> Logout
				</button>

				{/* Dark Mode Button */}
				<button
					className="w-10 h-10 py-2 px-3 cursor-pointer rounded-xl dark:bg-gray-800 hover:dark:bg-gray-700 text-blue-600 bg-blue-100 hover:bg-blue-200 font-medium"
					onClick={() => darkModeHandler()}
				>
					{!dark && <FontAwesomeIcon icon={faSun} />}
					{dark && <FontAwesomeIcon icon={faMoon} />}
				</button>
			</div>
		</header>
	);
}
