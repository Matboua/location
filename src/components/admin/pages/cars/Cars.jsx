"use client";

import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Pagination from "../../pagination/Pagination";
import {
	faEdit,
	faInfoCircle,
	faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch } from "react-redux";
import { deleteCarAsync } from "../../../../redux/cars/carsReducer";

export default function Cars() {
	// Search and Filter States
	const [searchTerm, setSearchTerm] = useState("");
	const [filterType, setFilterType] = useState("");
	const [filterAvailability, setFilterAvailability] = useState("");

	// Start Pagination
	const [currentPage, setCurrentPage] = useState(1);
	const recordsPerPage = 6;
	const cars = useSelector((state) => state.cars);

	// Apply filters
	const filteredCars = cars.filter((car) => {
		// Search by name
		const nameMatch = car.name.toLowerCase().includes(searchTerm.toLowerCase());

		// Filter by type
		const typeMatch = filterType === "" || car.type === filterType;

		// Filter by availability
		const availabilityMatch =
			filterAvailability === "" ||
			(filterAvailability === "Available" && car.available) ||
			(filterAvailability === "Not Available" && !car.available);

		return nameMatch && typeMatch && availabilityMatch;
	});

	// Ensure current page is valid when filtered results change
	useEffect(() => {
		const maxPage = Math.max(
			1,
			Math.ceil(filteredCars.length / recordsPerPage)
		);
		if (currentPage > maxPage) {
			setCurrentPage(maxPage);
		}
	}, [filteredCars, currentPage]);

	// Calculate pagination indices
	const lastIndex = currentPage * recordsPerPage;
	const firstIndex = lastIndex - recordsPerPage;

	// Ensure we don't try to access beyond the array bounds
	const records = filteredCars.slice(
		firstIndex,
		Math.min(lastIndex, filteredCars.length)
	);
	const npage = Math.max(1, Math.ceil(filteredCars.length / recordsPerPage));

	const handlePageChange = (pageNumber) => {
		// Ensure we don't set an invalid page number
		if (pageNumber >= 1 && pageNumber <= npage) {
			setCurrentPage(pageNumber);
		}
	};
	// End Pagination

	// Get unique car types for filter dropdown
	const carTypes = [...new Set(cars.map((car) => car.type))];

	// navigate + dispatch
	const navigate = useNavigate();
	const dispatch = useDispatch();

	// Delete Car (handleDelete)
	const handleDelete = (id) => {
		dispatch(deleteCarAsync(id));
	};

	// Navigate To Car Detail
	const detailCar = (id) => {
		navigate("/admin/cars/detail/" + id);
	};

	// Navigate To Edit Car
	const editCar = (id) => {
		navigate("/admin/cars/edit/" + id);
	};

	// Reset filters
	const resetFilters = () => {
		setSearchTerm("");
		setFilterType("");
		setFilterAvailability("");
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
								placeholder="Search by car name..."
								value={searchTerm}
								onChange={(e) => setSearchTerm(e.target.value)}
							/>
						</div>
					</div>

					{/* Filter by Type */}
					<div className="md:w-1/4">
						<select
							className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
							value={filterType}
							onChange={(e) => setFilterType(e.target.value)}
						>
							<option value="">Filter by Type</option>
							{carTypes.map((type, index) => (
								<option key={index} value={type}>
									{type}
								</option>
							))}
						</select>
					</div>

					{/* Filter by Availability */}
					<div className="md:w-1/4">
						<select
							className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
							value={filterAvailability}
							onChange={(e) => setFilterAvailability(e.target.value)}
						>
							<option value="">Filter by Availability</option>
							<option value="Available">Available</option>
							<option value="Not Available">Not Available</option>
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
							Image
						</th>
						<th scope="col" className="px-6 py-3">
							Name
						</th>
						<th scope="col" className="px-6 py-3">
							Price
						</th>
						<th scope="col" className="px-6 py-3">
							Brand
						</th>
						<th scope="col" className="px-6 py-3">
							Model
						</th>
						<th scope="col" className="px-6 py-3">
							Type
						</th>
						<th scope="col" className="px-6 py-3">
							Status
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
								<td className="px-6 py-4">{item.id}</td>
								<td className="px-6 py-4">
									<img
										src={item.image || "/placeholder.svg"}
										alt={item.name || "Car"}
										className="w-16 h-12 object-cover rounded"
									/>
								</td>
								<td className="px-6 py-4">{item.name || "N/A"}</td>
								<td className="px-6 py-4">${item.price_now || "0.00"}</td>
								<td className="px-6 py-4">{item.marc || "N/A"}</td>
								<td className="px-6 py-4">{item.model || "N/A"}</td>
								<td className="px-6 py-4">{item.type || "N/A"}</td>
								<td className="px-6 py-4">
									<span
										className={`px-2 py-1 rounded-full text-xs font-medium ${
											item.available
												? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
												: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
										}`}
									>
										{item.available ? "Available" : "Not Available"}
									</span>
								</td>
								<td className="px-6 py-2 text-center whitespace-nowrap">
									<button
										onClick={() => detailCar(item.id)}
										className="py-1.5 px-4 text-blue-500 bg-blue-100 dark:bg-blue-700 dark:text-blue-100 hover:bg-blue-200 dark:hover:bg-blue-600 rounded-full cursor-pointer transition duration-300 ease-in-out"
									>
										<FontAwesomeIcon icon={faInfoCircle} size="lg" />
									</button>
									<button
										onClick={() => editCar(item.id)}
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
							<td colSpan="9" className="px-6 py-4 text-center">
								No cars found matching your search criteria.
							</td>
						</tr>
					)}
				</tbody>
			</table>

			{filteredCars.length > 0 && (
				<Pagination
					currentPage={currentPage}
					npage={npage}
					handlePageChange={handlePageChange}
				/>
			)}
		</div>
	);
}
