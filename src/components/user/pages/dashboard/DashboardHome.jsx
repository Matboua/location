"use client";

import { useContext } from "react";
import { AppContext } from "../../../../context/AppContext";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
	faCalendarAlt,
	faCar,
	faCheckCircle,
	faClock,
	faMoneyBill,
	faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function DashboardHome() {
	const { user } = useContext(AppContext);
	const contracts = useSelector((state) => state.contracts);
	const cars = useSelector((state) => state.cars);

	// Get user's contracts
	const userContracts = contracts.filter(
		(contract) => contract.client_id === user.id
	);

	// Calculate statistics
	const totalBookings = userContracts.length;
	const activeBookings = userContracts.filter(
		(contract) => new Date(contract.end_date) >= new Date()
	).length;
	const totalSpent = userContracts
		.reduce((sum, contract) => sum + Number(contract.amount), 0)
		.toFixed(2);

	// Get recent bookings
	const recentBookings = [...userContracts]
		.sort((a, b) => new Date(b.start_date) - new Date(a.start_date))
		.slice(0, 3);

	// Get upcoming bookings
	const upcomingBookings = userContracts
		.filter((contract) => new Date(contract.start_date) >= new Date())
		.sort((a, b) => new Date(a.start_date) - new Date(b.start_date))
		.slice(0, 2);

	return (
		<div>
			<div className="mb-6">
				<h1 className="text-2xl font-bold mb-2">Dashboard</h1>
				<p className="text-gray-600 dark:text-gray-400">
					Welcome back, {user.first_name}! Here is an overview of your account.
				</p>
			</div>

			{/* Stats Cards */}
			<div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
				<div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm p-6 flex items-center">
					<div className="rounded-full bg-blue-100 dark:bg-blue-900 p-3 mr-4">
						<FontAwesomeIcon
							icon={faCalendarAlt}
							className="text-blue-600 dark:text-blue-400 text-xl"
						/>
					</div>
					<div>
						<p className="text-sm text-gray-500 dark:text-gray-400">
							Total Bookings
						</p>
						<h3 className="text-2xl font-bold">{totalBookings}</h3>
					</div>
				</div>

				<div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm p-6 flex items-center">
					<div className="rounded-full bg-green-100 dark:bg-green-900 p-3 mr-4">
						<FontAwesomeIcon
							icon={faCheckCircle}
							className="text-green-600 dark:text-green-400 text-xl"
						/>
					</div>
					<div>
						<p className="text-sm text-gray-500 dark:text-gray-400">
							Active Bookings
						</p>
						<h3 className="text-2xl font-bold">{activeBookings}</h3>
					</div>
				</div>

				<div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm p-6 flex items-center">
					<div className="rounded-full bg-purple-100 dark:bg-purple-900 p-3 mr-4">
						<FontAwesomeIcon
							icon={faMoneyBill}
							className="text-purple-600 dark:text-purple-400 text-xl"
						/>
					</div>
					<div>
						<p className="text-sm text-gray-500 dark:text-gray-400">
							Total Spent
						</p>
						<h3 className="text-2xl font-bold">${totalSpent}</h3>
					</div>
				</div>
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
				{/* Recent Bookings */}
				<div className="lg:col-span-2 bg-white dark:bg-gray-900 rounded-xl shadow-sm p-6">
					<div className="flex justify-between items-center mb-6">
						<h2 className="text-lg font-semibold">Recent Bookings</h2>
						<Link
							to="/dashboard/bookings"
							className="text-blue-600 dark:text-blue-400 text-sm hover:underline"
						>
							View All
						</Link>
					</div>

					{recentBookings.length > 0 ? (
						<div className="space-y-4">
							{recentBookings.map((booking, index) => {
								const car = cars.find((c) => c.id === booking.car_id);
								const isActive = new Date(booking.end_date) >= new Date();

								return (
									<div
										key={index}
										className="flex items-center border-b dark:border-gray-800 pb-4 last:border-0 last:pb-0"
									>
										<img
											src={booking.image || "/placeholder.svg"}
											alt={booking.car_name}
											className="w-16 h-12 object-cover rounded-md mr-4"
										/>
										<div className="flex-1">
											<h3 className="font-medium">{booking.car_name}</h3>
											<div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
												<span className="mr-3">
													{booking.start_date} - {booking.end_date}
												</span>
											</div>
										</div>
										<div className="text-right">
											<span className="font-medium">${booking.amount}</span>
											<div
												className={`text-xs mt-1 ${
													isActive
														? "text-green-600 dark:text-green-400"
														: "text-gray-500 dark:text-gray-400"
												}`}
											>
												{isActive ? "Active" : "Completed"}
											</div>
										</div>
									</div>
								);
							})}
						</div>
					) : (
						<div className="text-center py-8 text-gray-500 dark:text-gray-400">
							<FontAwesomeIcon icon={faCar} className="text-3xl mb-2" />
							<p>You have not made any bookings yet.</p>
							<Link
								to="/cars"
								className="text-blue-600 dark:text-blue-400 mt-2 inline-block hover:underline"
							>
								Browse Cars
							</Link>
						</div>
					)}
				</div>

				{/* Profile Summary & Upcoming Bookings */}
				<div className="space-y-6">
					{/* Profile Summary */}
					<div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm p-6">
						<div className="flex items-center mb-4">
							<div className="bg-blue-100 dark:bg-blue-900 rounded-full p-3 mr-3">
								<FontAwesomeIcon
									icon={faUser}
									className="text-blue-600 dark:text-blue-400"
								/>
							</div>
							<h2 className="text-lg font-semibold">Profile Summary</h2>
						</div>

						<div className="space-y-3">
							<div className="flex justify-between">
								<span className="text-gray-500 dark:text-gray-400">Name:</span>
								<span className="font-medium">
									{user.first_name} {user.last_name}
								</span>
							</div>
							<div className="flex justify-between">
								<span className="text-gray-500 dark:text-gray-400">Email:</span>
								<span className="font-medium">{user.email}</span>
							</div>
							<div className="flex justify-between">
								<span className="text-gray-500 dark:text-gray-400">Phone:</span>
								<span className="font-medium">{user.phone}</span>
							</div>
							<div className="flex justify-between">
								<span className="text-gray-500 dark:text-gray-400">City:</span>
								<span className="font-medium">{user.city}</span>
							</div>
						</div>

						<Link
							to="/dashboard/profile"
							className="mt-4 text-blue-600 dark:text-blue-400 text-sm hover:underline block text-right"
						>
							Edit Profile
						</Link>
					</div>

					{/* Upcoming Bookings */}
					<div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm p-6">
						<div className="flex items-center mb-4">
							<div className="bg-amber-100 dark:bg-amber-900 rounded-full p-3 mr-3">
								<FontAwesomeIcon
									icon={faClock}
									className="text-amber-600 dark:text-amber-400"
								/>
							</div>
							<h2 className="text-lg font-semibold">Upcoming Bookings</h2>
						</div>

						{upcomingBookings.length > 0 ? (
							<div className="space-y-4">
								{upcomingBookings.map((booking, index) => (
									<div
										key={index}
										className="border-b dark:border-gray-800 pb-3 last:border-0 last:pb-0"
									>
										<h3 className="font-medium">{booking.car_name}</h3>
										<p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
											Starts on{" "}
											{new Date(booking.start_date).toLocaleDateString()}
										</p>
										<div className="flex justify-between items-center mt-2">
											<span className="text-sm">${booking.amount}</span>
											<span className="text-xs bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 px-2 py-1 rounded-full">
												Upcoming
											</span>
										</div>
									</div>
								))}
							</div>
						) : (
							<p className="text-center py-4 text-gray-500 dark:text-gray-400">
								No upcoming bookings
							</p>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}
