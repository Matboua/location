import {
	faEdit,
	faInfoCircle,
	faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Pagination from "../pagination/Pagination";
import { useDispatch, useSelector } from "react-redux";
import { deleteCar } from "../../redux/cars/carsReducer";

export default function Cars() {
	// Start Pagination
	const [currentPage, setCurrentPage] = useState(1);
	const recordsPerPage = 5;
	const lastIndex = currentPage * recordsPerPage;
	const firstIndex = lastIndex - recordsPerPage;
	const cars = useSelector((state) => state.cars);
	const records = cars.slice(firstIndex, lastIndex);
	const npage = Math.ceil(cars.length / recordsPerPage);
	const handlePageChange = (pageNumber) => {
		setCurrentPage(pageNumber);
	};
	// End Pagination
	// navigate + dispatch
	const navigate = useNavigate();
	const dispatch = useDispatch();
	// Delete Car (handleDelete)
	const handleDelete = (id) => {
		dispatch(deleteCar({ id: id }));
	};
	// Navigate To Car Detail
	const detailCar = (id) => {
		navigate("/admin/cars/detail/" + id);
	};
	// Navigate To Edit Car
	const editCar = (id) => {
		navigate("/admin/cars/edit/" + id);
	};
	return (
		<div className="relative flex flex-col min-h-[75vh] justify-between w-full overflow-x-auto shadow-md sm:rounded-lg">
			<table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 border border-gray-300 dark:border-gray-700">
				<thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
					<tr>
						<th scope="col" className="px-6 py-3">
							Id
						</th>
						<th scope="col" className="px-6 py-3">
							Name
						</th>
						<th scope="col" className="px-6 py-3">
							Price now
						</th>
						<th scope="col" className="px-6 py-3">
							Price before
						</th>
						<th scope="col" className="px-6 py-3">
							Marc
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
					{records &&
						records.map((item, key) => (
							<tr
								key={key}
								className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600"
							>
								<td className="p-6 py-4">{item.id}</td>
								<td className="px-6 py-4 flex gap-2 items-center ">
									<img
										className="w-13 border-2 border-white rounded-md"
										src={item.image}
										alt="Image"
									/>
									{item.name}
								</td>
								<td className="px-6 py-4">${item.price_now}</td>
								<td className="px-6 py-4">${item.price_before}</td>
								<td className="px-6 py-4">{item.marc}</td>
								<td className="px-6 py-4">{item.model}</td>
								<td className="px-6 py-4">{item.type}</td>
								<td className="px-6 py-4">
									<span
										className={` flex p-2 rounded-md justify-center ${
											item.available
												? "text-green-500 bg-green-600/25"
												: "text-red-500 bg-red-600/25"
										}`}
									>
										{item.available ? "Available" : "Unavailable"}
									</span>
								</td>
								<td className="px-6 py-2 text-center whitespace-nowrap">
									<button
										onClick={() => {
											detailCar(item.id);
										}}
										className="py-1.5 px-4 text-blue-500 bg-blue-100 dark:bg-blue-700 dark:text-blue-100 hover:bg-blue-200 dark:hover:bg-blue-600 rounded-full cursor-pointer transition duration-300 ease-in-out"
									>
										<FontAwesomeIcon icon={faInfoCircle} size="lg" />
									</button>
									<button
										onClick={() => {
											editCar(item.id);
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
						))}
				</tbody>
			</table>
			<Pagination
				currentPage={currentPage}
				npage={npage}
				handlePageChange={handlePageChange}
			/>
		</div>
	);
}
