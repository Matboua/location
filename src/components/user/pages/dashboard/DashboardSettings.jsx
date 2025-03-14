"use client";

import { useContext, useState } from "react";
import { AppContext } from "../../../../context/AppContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faBell,
	faCheck,
	faGlobe,
	faMoon,
	faShieldAlt,
	faSun,
} from "@fortawesome/free-solid-svg-icons";

export default function DashboardSettings() {
	const { user } = useContext(AppContext);
	const [successMessage, setSuccessMessage] = useState("");

	// Notification settings
	const [emailNotifications, setEmailNotifications] = useState(true);
	const [smsNotifications, setSmsNotifications] = useState(false);
	const [bookingReminders, setBookingReminders] = useState(true);
	const [promotionalEmails, setPromotionalEmails] = useState(false);

	// Appearance settings
	const [darkMode, setDarkMode] = useState(
		document.documentElement.classList.contains("dark")
	);
	const [language, setLanguage] = useState("english");

	// Privacy settings
	const [shareBookingHistory, setShareBookingHistory] = useState(false);
	const [shareProfileInfo, setShareProfileInfo] = useState(false);

	const handleSaveNotifications = () => {
		// In a real app, you would send this to your API
		setSuccessMessage("Notification preferences saved successfully!");

		// Clear success message after 3 seconds
		setTimeout(() => {
			setSuccessMessage("");
		}, 3000);
	};

	const handleToggleDarkMode = () => {
		const newDarkMode = !darkMode;
		setDarkMode(newDarkMode);

		if (newDarkMode) {
			document.documentElement.classList.add("dark");
		} else {
			document.documentElement.classList.remove("dark");
		}
	};

	return (
		<div>
			<div className="mb-6">
				<h1 className="text-2xl font-bold mb-2">Settings</h1>
				<p className="text-gray-600 dark:text-gray-400">
					Manage your account preferences and settings
				</p>
			</div>

			{/* Appearance Settings */}
			<div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm overflow-hidden mb-8">
				<div className="p-6 border-b border-gray-200 dark:border-gray-800 flex items-center">
					<div className="bg-purple-100 dark:bg-purple-900 rounded-full p-3 mr-3">
						<FontAwesomeIcon
							icon={faGlobe}
							className="text-purple-600 dark:text-purple-400"
						/>
					</div>
					<h2 className="text-lg font-semibold">Appearance & Language</h2>
				</div>

				<div className="p-6">
					<div className="space-y-6">
						<div>
							<h3 className="font-medium mb-3">Theme</h3>
							<div className="flex space-x-4">
								<button
									onClick={() => handleToggleDarkMode(false)}
									className={`flex cursor-pointer flex-col items-center p-4 rounded-lg border ${
										!darkMode
											? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
											: "border-gray-200 dark:border-gray-700"
									}`}
								>
									<div className="bg-white border border-gray-200 rounded-full p-3 mb-2">
										<FontAwesomeIcon icon={faSun} className="text-yellow-500" />
									</div>
									<span className="text-sm font-medium">Light</span>
								</button>

								<button
									onClick={() => handleToggleDarkMode(true)}
									className={`flex cursor-pointer flex-col items-center p-4 rounded-lg border ${
										darkMode
											? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
											: "border-gray-200 dark:border-gray-700"
									}`}
								>
									<div className="bg-gray-900 border border-gray-700 rounded-full p-3 mb-2">
										<FontAwesomeIcon icon={faMoon} className="text-gray-100" />
									</div>
									<span className="text-sm font-medium">Dark</span>
								</button>
							</div>
						</div>

						<div>
							<h3 className="font-medium mb-3">Language</h3>
							<select
								value={language}
								onChange={(e) => setLanguage(e.target.value)}
								className="bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
							>
								<option value="english">English</option>
							</select>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
