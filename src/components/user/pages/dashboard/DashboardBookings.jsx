"use client";

import { useContext, useState } from "react";
import { AppContext } from "../../../../context/AppContext";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCar, faSearch } from "@fortawesome/free-solid-svg-icons";

export default function DashboardBookings() {
	const { user } = useContext(AppContext);
	const contracts = useSelector((state) => state.contracts);
	const cars = useSelector((state) => state.cars);

	// Get user's contracts
	const userContracts = contracts.filter(
		(contract) => contract.client_id === user.id
	);

	// Filter states
	const [searchTerm, setSearchTerm] = useState("");

	// Apply filters
	const filteredBookings = userContracts
		.filter((booking) => {
			// Search filter
			return booking.car_name.toLowerCase().includes(searchTerm.toLowerCase());
		})
		.sort((a, b) => new Date(b.start_date) - new Date(a.start_date)); // Sort by date, newest first

	return (
		<div>
			<div className="mb-6">
				<h1 className="text-2xl font-bold mb-2">My Bookings</h1>
				<p className="text-gray-600 dark:text-gray-400">
					View all your car rental bookings
				</p>
			</div>

			{/* Simple Search */}
			<div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm p-4 mb-6">
				<div className="relative">
					<div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
						<FontAwesomeIcon icon={faSearch} className="text-gray-400" />
					</div>
					<input
						type="text"
						className="bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5"
						placeholder="Search by car name..."
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
					/>
				</div>
			</div>

			{/* Bookings List */}
			{filteredBookings.length > 0 ? (
				<div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm overflow-hidden">
					<div className="overflow-x-auto">
						<table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
							<thead className="bg-gray-50 dark:bg-gray-800">
								<tr>
									<th
										scope="col"
										className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
									>
										Car
									</th>
									<th
										scope="col"
										className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
									>
										Booking Period
									</th>
									<th
										scope="col"
										className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
									>
										Amount
									</th>
								</tr>
							</thead>
							<tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-800">
								{filteredBookings.map((booking, index) => {
									const startDate = new Date(booking.start_date);
									const endDate = new Date(booking.end_date);
									const duration = Math.ceil(
										(endDate - startDate) / (1000 * 60 * 60 * 24)
									);

									return (
										<tr key={index}>
											<td className="px-6 py-4 whitespace-nowrap">
												<div className="flex items-center">
													<div className="flex-shrink-0 h-10 w-10">
														<img
															className="h-10 w-10 rounded-md object-cover"
															src={booking.image || "/placeholder.svg"}
															alt={booking.car_name}
														/>
													</div>
													<div className="ml-4">
														<div className="text-sm font-medium text-gray-900 dark:text-gray-100">
															{booking.car_name}
														</div>
													</div>
												</div>
											</td>
											<td className="px-6 py-4 whitespace-nowrap">
												<div className="text-sm text-gray-900 dark:text-gray-100">
													{new Date(booking.start_date).toLocaleDateString()} -{" "}
													{new Date(booking.end_date).toLocaleDateString()}
												</div>
												<div className="text-sm text-gray-500 dark:text-gray-400">
													{duration} days
												</div>
											</td>
											<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
												${booking.amount}
											</td>
										</tr>
									);
								})}
							</tbody>
						</table>
					</div>
				</div>
			) : (
				<div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm p-8 text-center">
					<FontAwesomeIcon
						icon={faCar}
						className="text-gray-400 text-4xl mb-4"
					/>
					<h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-1">
						No bookings found
					</h3>
					<p className="text-gray-500 dark:text-gray-400 mb-4">
						{searchTerm
							? "Try adjusting your search to see more results"
							: "You haven't made any bookings yet"}
					</p>
					<a
						href="/cars"
						className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
					>
						Browse Cars
					</a>
				</div>
			)}
		</div>
	);
}
