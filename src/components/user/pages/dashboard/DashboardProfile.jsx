"use client";

import { useContext, useState } from "react";
import { AppContext } from "../../../../context/AppContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faUser } from "@fortawesome/free-solid-svg-icons";

export default function DashboardProfile() {
	const { user, setUser } = useContext(AppContext);

	const [formData, setFormData] = useState({
		first_name: user.first_name,
		last_name: user.last_name,
		email: user.email,
		phone: user.phone,
		city: user.city,
	});

	const [isEditing, setIsEditing] = useState(false);
	const [successMessage, setSuccessMessage] = useState("");

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		// In a real app, you would send this to your API
		// For now, we'll just update the local state
		setUser({
			...user,
			...formData,
		});

		setIsEditing(false);
		setSuccessMessage("Profile updated successfully!");

		// Clear success message after 3 seconds
		setTimeout(() => {
			setSuccessMessage("");
		}, 3000);
	};

	return (
		<div>
			<div className="mb-6">
				<h1 className="text-2xl font-bold mb-2">My Profile</h1>
				<p className="text-gray-600 dark:text-gray-400">
					View and update your personal information
				</p>
			</div>

			{successMessage && (
				<div className="mb-6 bg-green-100 dark:bg-green-900 border border-green-400 dark:border-green-800 text-green-700 dark:text-green-300 px-4 py-3 rounded relative">
					<FontAwesomeIcon icon={faCheck} className="mr-2" />
					{successMessage}
				</div>
			)}

			<div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm overflow-hidden">
				<div className="p-6 border-b border-gray-200 dark:border-gray-800 flex justify-between items-center">
					<div className="flex items-center">
						<div className="bg-blue-100 dark:bg-blue-900 rounded-full p-3 mr-3">
							<FontAwesomeIcon
								icon={faUser}
								className="text-blue-600 dark:text-blue-400"
							/>
						</div>
						<h2 className="text-lg font-semibold">Personal Information</h2>
					</div>

					{!isEditing && (
						<button
							onClick={() => setIsEditing(true)}
							className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm"
						>
							Edit Profile
						</button>
					)}
				</div>

				<div className="p-6">
					<form onSubmit={handleSubmit}>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
							<div>
								<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
									First Name
								</label>
								<input
									type="text"
									name="first_name"
									value={formData.first_name}
									onChange={handleChange}
									disabled={!isEditing}
									className="bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 disabled:bg-gray-100 disabled:dark:bg-gray-700 disabled:cursor-not-allowed"
								/>
							</div>

							<div>
								<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
									Last Name
								</label>
								<input
									type="text"
									name="last_name"
									value={formData.last_name}
									onChange={handleChange}
									disabled={!isEditing}
									className="bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 disabled:bg-gray-100 disabled:dark:bg-gray-700 disabled:cursor-not-allowed"
								/>
							</div>

							<div>
								<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
									Email Address
								</label>
								<input
									type="email"
									name="email"
									value={formData.email}
									onChange={handleChange}
									disabled={!isEditing}
									className="bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 disabled:bg-gray-100 disabled:dark:bg-gray-700 disabled:cursor-not-allowed"
								/>
							</div>

							<div>
								<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
									Phone Number
								</label>
								<input
									type="text"
									name="phone"
									value={formData.phone}
									onChange={handleChange}
									disabled={!isEditing}
									className="bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 disabled:bg-gray-100 disabled:dark:bg-gray-700 disabled:cursor-not-allowed"
								/>
							</div>

							<div>
								<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
									City
								</label>
								<input
									type="text"
									name="city"
									value={formData.city}
									onChange={handleChange}
									disabled={!isEditing}
									className="bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 disabled:bg-gray-100 disabled:dark:bg-gray-700 disabled:cursor-not-allowed"
								/>
							</div>

							<div>
								<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
									CIN
								</label>
								<input
									type="text"
									value={user.cin}
									disabled
									className="bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100 text-sm rounded-lg block w-full p-2.5 cursor-not-allowed"
								/>
								<p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
									CIN cannot be changed
								</p>
							</div>
						</div>

						{isEditing && (
							<div className="mt-6 flex justify-end space-x-3">
								<button
									type="button"
									onClick={() => {
										setIsEditing(false);
										setFormData({
											first_name: user.first_name,
											last_name: user.last_name,
											email: user.email,
											phone: user.phone,
											city: user.city,
										});
									}}
									className="px-4 py-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 rounded-lg text-sm"
								>
									Cancel
								</button>
								<button
									type="submit"
									className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm"
								>
									Save Changes
								</button>
							</div>
						)}
					</form>
				</div>
			</div>
		</div>
	);
}
