"use client";

import { faEdit, faFilePdf, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Pagination from "../../pagination/Pagination";
import { useDispatch, useSelector } from "react-redux";
import { deleteContractAsync } from "../../../../redux/contracts/contractsReducer";

export default function Contracts() {
	// Search and Filter States
	const [searchTerm, setSearchTerm] = useState("");
	const [filterStartDate, setFilterStartDate] = useState("");
	const [filterEndDate, setFilterEndDate] = useState("");

	// Start Pagination
	const [currentPage, setCurrentPage] = useState(1);
	const recordsPerPage = 5;
	const contracts = useSelector((state) => state.contracts);
	const clients = useSelector((state) => state.clients);

	// Apply filters
	const filteredContracts = contracts.filter((contract) => {
		// Get client for CIN search
		const client = clients.find((c) => c.id === contract.client_id);
		const clientCin = client ? client.cin.toLowerCase() : "";

		// Search by client CIN
		const cinMatch =
			searchTerm === "" || clientCin.includes(searchTerm.toLowerCase());

		// Filter by date range
		let dateMatch = true;

		if (filterStartDate) {
			dateMatch =
				dateMatch && new Date(contract.start_date) >= new Date(filterStartDate);
		}

		if (filterEndDate) {
			dateMatch =
				dateMatch && new Date(contract.end_date) <= new Date(filterEndDate);
		}

		return cinMatch && dateMatch;
	});

	// Ensure current page is valid when filtered results change
	useEffect(() => {
		const maxPage = Math.max(
			1,
			Math.ceil(filteredContracts.length / recordsPerPage)
		);
		if (currentPage > maxPage) {
			setCurrentPage(maxPage);
		}
	}, [filteredContracts, currentPage]);

	// Calculate pagination indices
	const lastIndex = currentPage * recordsPerPage;
	const firstIndex = lastIndex - recordsPerPage;

	// Ensure we don't try to access beyond the array bounds
	const records = filteredContracts.slice(
		firstIndex,
		Math.min(lastIndex, filteredContracts.length)
	);
	const npage = Math.max(
		1,
		Math.ceil(filteredContracts.length / recordsPerPage)
	);

	const handlePageChange = (pageNumber) => {
		// Ensure we don't set an invalid page number
		if (pageNumber >= 1 && pageNumber <= npage) {
			setCurrentPage(pageNumber);
		}
	};
	// End Pagination

	// navigate + dispatch
	const navigate = useNavigate();
	const dispatch = useDispatch();

	// Delete Contract (handleDelete)
	const handleDelete = (id) => {
		dispatch(deleteContractAsync(id));
	};

	// Navigate To Contract Detail
	const detailContract = (id) => {
		window.open("/DetailContract/" + id, "_blank");
	};

	// Navigate To Edit Contract
	const editContract = (id) => {
		navigate("/admin/contracts/edit/" + id);
	};

	// Reset filters
	const resetFilters = () => {
		setSearchTerm("");
		setFilterStartDate("");
		setFilterEndDate("");
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
								placeholder="Search by client CIN..."
								value={searchTerm}
								onChange={(e) => setSearchTerm(e.target.value)}
							/>
						</div>
					</div>

					{/* Filter by Start Date */}
					<div className="md:w-1/4">
						<input
							type="date"
							className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
							placeholder="Filter by start date"
							value={filterStartDate}
							onChange={(e) => setFilterStartDate(e.target.value)}
						/>
					</div>

					{/* Filter by End Date */}
					<div className="md:w-1/4">
						<input
							type="date"
							className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
							placeholder="Filter by end date"
							value={filterEndDate}
							onChange={(e) => setFilterEndDate(e.target.value)}
						/>
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
							Car Name
						</th>
						<th scope="col" className="px-6 py-3">
							Car Id
						</th>
						<th scope="col" className="px-6 py-3">
							Client CIN
						</th>
						<th scope="col" className="px-6 py-3">
							Start Date
						</th>
						<th scope="col" className="px-6 py-3">
							End Date
						</th>
						<th scope="col" className="px-6 py-3">
							Amount
						</th>
						<th scope="col" className="px-6 py-3 text-center">
							Action
						</th>
					</tr>
				</thead>
				<tbody>
					{records.length > 0 ? (
						records.map((item, key) => {
							const client = clients.find((c) => c.id === item.client_id);
							return (
								<tr
									key={key}
									className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600"
								>
									<td className="p-6 py-4">{item.id}</td>
									<td className="px-6 py-4 flex gap-2 items-center ">
										<img
											className="w-13 border-2 border-white rounded-md"
											src={item.image || "/placeholder.svg"}
											alt="Image"
										/>
										{item.car_name || "N/A"}
									</td>
									<td className="px-6 py-4">{item.car_id || "N/A"}</td>
									<td className="px-6 py-4">
										{client && client.cin ? client.cin.toUpperCase() : "N/A"}
									</td>
									<td className="px-6 py-4">{item.start_date || "N/A"}</td>
									<td className="px-6 py-4">{item.end_date || "N/A"}</td>
									<td className="px-6 py-4">${item.amount || "0.00"}</td>
									<td className="px-6 py-2 text-center whitespace-nowrap">
										<button
											onClick={() => {
												detailContract(item.id);
											}}
											className="py-1.5 px-4 text-blue-500 bg-blue-100 dark:bg-blue-700 dark:text-blue-100 hover:bg-blue-200 dark:hover:bg-blue-600 rounded-full cursor-pointer transition duration-300 ease-in-out"
										>
											<FontAwesomeIcon icon={faFilePdf} size="lg" />
										</button>
										<button
											onClick={() => {
												editContract(item.id);
											}}
											className="mx-4 py-1.5 px-4 text-yellow-500 bg-yellow-100 dark:bg-yellow-700 dark:text-yellow-100 hover:bg-yellow-200 dark:hover:bg-yellow-600 rounded-full cursor-pointer transition duration-300 ease-in-out"
										>
											<FontAwesomeIcon icon={faEdit} size="lg" />
										</button>
										<button
											onClick={() => {
												handleDelete(item.id);
											}}
											className="py-1.5 px-4 text-red-500 bg-red-100 dark:bg-red-700 dark:text-red-100 hover:bg-red-200 dark:hover:bg-red-600 rounded-full cursor-pointer transition duration-300 ease-in-out"
										>
											<FontAwesomeIcon icon={faTrash} size="lg" />
										</button>
									</td>
								</tr>
							);
						})
					) : (
						<tr>
							<td colSpan="8" className="px-6 py-4 text-center">
								No contracts found matching your search criteria.
							</td>
						</tr>
					)}
				</tbody>
			</table>

			{filteredContracts.length > 0 && (
				<Pagination
					currentPage={currentPage}
					npage={npage}
					handlePageChange={handlePageChange}
				/>
			)}
		</div>
	);
}
