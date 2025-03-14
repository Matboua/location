"use client";

import { useContext } from "react";
import { AppContext } from "../../../../context/AppContext";
import { Link, Navigate, Route, Routes, useLocation } from "react-router-dom";
import {
	faCalendarAlt,
	faCar,
	faCog,
	faHome,
	faSignOutAlt,
	faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import DashboardHome from "./DashboardHome";
import DashboardBookings from "./DashboardBookings";
import DashboardSettings from "./DashboardSettings";
import DashboardProfile from "./DashboardProfile";

export default function Dashboard() {
	const { user } = useContext(AppContext);
	const location = useLocation();

	// If user is not logged in, redirect to login
	if (!user) {
		return <Navigate to="/login" replace />;
	}

	return (
		<div className="w-full flex flex-col md:flex-row min-h-[calc(100vh-73px)]">
			{/* Sidebar */}
			<div className="w-full md:w-64 bg-white dark:bg-gray-900 border-r dark:border-gray-800 p-4">
				<div className="flex flex-col h-full">
					<div className="mb-6">
						<h2 className="text-xl font-bold mb-1">Client Dashboard</h2>
						<p className="text-sm text-gray-500 dark:text-gray-400">
							Welcome back, {user.first_name}!
						</p>
					</div>

					<nav className="flex-1">
						<ul className="space-y-2">
							<li>
								<Link
									to="/dashboard"
									className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
										location.pathname === "/dashboard"
											? "bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300"
											: "hover:bg-gray-100 dark:hover:bg-gray-800"
									}`}
								>
									<FontAwesomeIcon icon={faHome} />
									<span>Dashboard</span>
								</Link>
							</li>
							<li>
								<Link
									to="/dashboard/bookings"
									className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
										location.pathname === "/dashboard/bookings"
											? "bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300"
											: "hover:bg-gray-100 dark:hover:bg-gray-800"
									}`}
								>
									<FontAwesomeIcon icon={faCalendarAlt} />
									<span>My Bookings</span>
								</Link>
							</li>
							<li>
								<Link
									to="/dashboard/profile"
									className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
										location.pathname === "/dashboard/profile"
											? "bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300"
											: "hover:bg-gray-100 dark:hover:bg-gray-800"
									}`}
								>
									<FontAwesomeIcon icon={faUser} />
									<span>My Profile</span>
								</Link>
							</li>
							<li>
								<Link
									to="/dashboard/settings"
									className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
										location.pathname === "/dashboard/settings"
											? "bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300"
											: "hover:bg-gray-100 dark:hover:bg-gray-800"
									}`}
								>
									<FontAwesomeIcon icon={faCog} />
									<span>Settings</span>
								</Link>
							</li>
						</ul>
					</nav>

					<div className="mt-auto pt-6">
						<Link
							to="/cars"
							className="flex items-center gap-3 px-4 py-3 rounded-lg text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-gray-800 transition-colors"
						>
							<FontAwesomeIcon icon={faCar} />
							<span>Browse Cars</span>
						</Link>
						<button className="w-full cursor-pointer flex items-center gap-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 dark:hover:bg-gray-800 transition-colors mt-2">
							<FontAwesomeIcon icon={faSignOutAlt} />
							<span>Logout</span>
						</button>
					</div>
				</div>
			</div>

			{/* Main Content */}
			<div className="flex-1 p-6 bg-gray-50 dark:bg-gray-800">
				<Routes>
					<Route path="/" element={<DashboardHome />} />
					<Route path="/bookings" element={<DashboardBookings />} />
					<Route path="/profile" element={<DashboardProfile />} />
					<Route path="/settings" element={<DashboardSettings />} />
				</Routes>
			</div>
		</div>
	);
}
