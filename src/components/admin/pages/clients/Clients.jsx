"use client";

import {
	faEdit,
	faInfoCircle,
	faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Pagination from "../../pagination/Pagination";
import { useDispatch, useSelector } from "react-redux";
import { deleteClientAsync } from "../../../../redux/clients/clientsReducer";

export default function Clients() {
	// Search and Filter States
	const [searchTerm, setSearchTerm] = useState("");
	const [filterCity, setFilterCity] = useState("");

	// Start Pagination
	const [currentPage, setCurrentPage] = useState(1);
	const recordsPerPage = 6;
	const clients = useSelector((state) => state.clients);

	// Apply filters
	const filteredClients = clients.filter((client) => {
		// Skip invalid client records
		if (
			!client ||
			!client.cin ||
			!client.first_name ||
			!client.last_name ||
			!client.city
		) {
			return false;
		}

		// Search by CIN
		const cinMatch = client.cin
			.toLowerCase()
			.includes(searchTerm.toLowerCase());

		// Filter by city
		const cityMatch =
			filterCity === "" ||
			client.city.toLowerCase() === filterCity.toLowerCase();

		return cinMatch && cityMatch;
	});

	// Ensure current page is valid when filtered results change
	useEffect(() => {
		const maxPage = Math.max(
			1,
			Math.ceil(filteredClients.length / recordsPerPage)
		);
		if (currentPage > maxPage) {
			setCurrentPage(maxPage);
		}
	}, [filteredClients, currentPage]);

	// Calculate pagination indices
	const lastIndex = currentPage * recordsPerPage;
	const firstIndex = lastIndex - recordsPerPage;

	// Ensure we don't try to access beyond the array bounds
	const records = filteredClients.slice(
		firstIndex,
		Math.min(lastIndex, filteredClients.length)
	);
	const npage = Math.max(1, Math.ceil(filteredClients.length / recordsPerPage));

	const handlePageChange = (pageNumber) => {
		// Ensure we don't set an invalid page number
		if (pageNumber >= 1 && pageNumber <= npage) {
			setCurrentPage(pageNumber);
		}
	};
	// End Pagination

	// Get unique cities for filter dropdown
	const cities = [
		...new Set(clients.map((client) => client.city.toLowerCase())),
	];

	// navigate + dispatch
	const navigate = useNavigate();
	const dispatch = useDispatch();

	// Delete Client (handleDelete)
	const handleDelete = (id) => {
		try {
			dispatch(deleteClientAsync(id))
				.then(() => {
					// Success notification could be added here
					console.log("Client deleted successfully");
				})
				.catch((error) => {
					console.error("Failed to delete client:", error);
					// Error notification could be added here
				});
		} catch (error) {
			console.error("Error in delete operation:", error);
		}
	};

	// Navigate To Client Detail
	const detailClient = (id) => {
		navigate("/admin/clients/detail/" + id);
	};

	// Navigate To Edit Client
	const editClient = (id) => {
		navigate("/admin/clients/edit/" + id);
	};

	// Reset filters
	const resetFilters = () => {
		setSearchTerm("");
		setFilterCity("");
		setCurrentPage(1);
	};

	return (
		<div className="relative flex flex-col min-h-[75vh] justify-between w-full overflow-x-auto shadow-md sm:rounded-lg">
			{/* Search and Filter Section */}
			<div className="p-4 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
				<div className="flex flex-col md:flex-row gap-4">
					{/* Search Input */}
					<div className="flex-1">
						<label htmlFor="search" className="sr-only">
							Search
						</label>
						<div className="relative">
							<div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
								<svg
									className="w-4 h-4 text-gray-500 dark:text-gray-400"
									aria-hidden="true"
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 20 20"
								>
									<path
										stroke="currentColor"
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="2"
										d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
									/>
								</svg>
							</div>
							<input
								type="text"
								id="search"
								className="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
								placeholder="Search by CIN..."
								value={searchTerm}
								onChange={(e) => setSearchTerm(e.target.value)}
							/>
						</div>
					</div>

					{/* Filter by City */}
					<div className="md:w-1/4">
						<select
							className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
							value={filterCity}
							onChange={(e) => setFilterCity(e.target.value)}
						>
							<option value="">Filter by City</option>
							{cities.map((city, index) => (
								<option key={index} value={city}>
									{city.charAt(0).toUpperCase() + city.slice(1)}
								</option>
							))}
						</select>
					</div>

					{/* Reset Filters Button */}
					<button
						onClick={resetFilters}
						className="px-4 py-2.5 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
					>
						Reset
					</button>
				</div>
			</div>

			<table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 border border-gray-300 dark:border-gray-700">
				<thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
					<tr>
						<th scope="col" className="px-6 py-3">
							Id
						</th>
						<th scope="col" className="px-6 py-3">
							CIN
						</th>
						<th scope="col" className="px-6 py-3">
							First Name
						</th>
						<th scope="col" className="px-6 py-3">
							Last Name
						</th>
						<th scope="col" className="px-6 py-3">
							Phone
						</th>
						<th scope="col" className="px-6 py-3">
							Email
						</th>
						<th scope="col" className="px-6 py-3">
							City
						</th>
						<th scope="col" className="px-6 py-3 text-center">
							Action
						</th>
					</tr>
				</thead>
				<tbody>
					{records.length > 0 ? (
						records.map((item, key) => (
							<tr
								key={key}
								className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600"
							>
								<td className="p-6 py-4">{item.id}</td>
								<td className="p-6 py-4">
									{item.cin ? item.cin.toUpperCase() : "N/A"}
								</td>
								<td className="px-6 py-4">
									{item.first_name
										? item.first_name[0].toUpperCase() +
										  item.first_name.slice(1).toLowerCase()
										: "N/A"}
								</td>
								<td className="px-6 py-4">
									{item.last_name
										? item.last_name[0].toUpperCase() +
										  item.last_name.slice(1).toLowerCase()
										: "N/A"}
								</td>
								<td className="px-6 py-4">{item.phone || "N/A"}</td>
								<td className="px-6 py-4">{item.email || "N/A"}</td>
								<td className="px-6 py-4">
									{item.city
										? item.city[0].toUpperCase() +
										  item.city.slice(1).toLowerCase()
										: "N/A"}
								</td>
								<td className="px-6 py-2 text-center whitespace-nowrap">
									<button
										onClick={() => detailClient(item.id)}
										className="py-1.5 px-4 text-blue-500 bg-blue-100 dark:bg-blue-700 dark:text-blue-100 hover:bg-blue-200 dark:hover:bg-blue-600 rounded-full cursor-pointer transition duration-300 ease-in-out"
									>
										<FontAwesomeIcon icon={faInfoCircle} size="lg" />
									</button>
									<button
										onClick={() => editClient(item.id)}
										className="mx-4 py-1.5 px-4 text-yellow-500 bg-yellow-100 dark:bg-yellow-700 dark:text-yellow-100 hover:bg-yellow-200 dark:hover:bg-yellow-600 rounded-full cursor-pointer transition duration-300 ease-in-out"
									>
										<FontAwesomeIcon icon={faEdit} size="lg" />
									</button>
									<button
										onClick={() => handleDelete(item.id)}
										className="py-1.5 px-4 text-red-500 bg-red-100 dark:bg-red-700 dark:text-red-100 hover:bg-red-200 dark:hover:bg-red-600 rounded-full cursor-pointer transition duration-300 ease-in-out"
									>
										<FontAwesomeIcon icon={faTrash} size="lg" />
									</button>
								</td>
							</tr>
						))
					) : (
						<tr>
							<td colSpan="8" className="px-6 py-4 text-center">
								No clients found matching your search criteria.
							</td>
						</tr>
					)}
				</tbody>
			</table>

			{filteredClients.length > 0 && (
				<Pagination
					currentPage={currentPage}
					npage={npage}
					handlePageChange={handlePageChange}
				/>
			)}
		</div>
	);
}
