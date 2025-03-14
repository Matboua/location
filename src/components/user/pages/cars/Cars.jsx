import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCar } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import Pagination from "../../../admin/pagination/Pagination";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../../../context/AppContext";
import BookLogin from "./BookLogin";

export default function Main() {
	const { user } = useContext(AppContext);
	const navigate = useNavigate();
	const [showLoginPopup, setShowLoginPopup] = useState(false);
	// Start Pagination
	const [currentPage, setCurrentPage] = useState(1);
	const recordsPerPage = 8;
	const lastIndex = currentPage * recordsPerPage;
	const firstIndex = lastIndex - recordsPerPage;
	const cars = useSelector((state) => state.cars);
	const records = cars.slice(firstIndex, lastIndex + 1);
	const npage = Math.ceil(cars.length / recordsPerPage);
	const handlePageChange = (pageNumber) => {
		setCurrentPage(pageNumber);
	};
	// End Pagination
	return (
		<section className="flex flex-col items-center gap-10 w-full">
			<div className=" px-5 pb-5 rounded-2xl bg-gray-200 dark:bg-gray-800 w-10/12">
				<h1 className="text-center font-medium text-3xl my-3 mb-7 p-10 dark:text-gray-200 text-gray-900">
					Cars & Vehicles
				</h1>
				<div className="grid gap-5 grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 justify-items-center">
					{records &&
						records.map(
							(item) =>
								item.available && (
									<div
										key={item.id}
										className="relative flex max-w-[280px] flex-col overflow-hidden rounded-lg dark:border-gray-800 dark:bg-gray-900 bg-white	 shadow-md"
									>
										<button
											className="relative mx-3 mt-3 flex h-48 overflow-hidden rounded-xl"
											onClick={() => {
												if (user) {
													navigate(`/car/${item.id}`);
												} else {
													setShowLoginPopup(true);
												}
											}}
										>
											<img
												className="object-cover"
												src={item.image}
												alt="product image"
											/>
											<span className="absolute top-0 left-0 m-2 rounded-full bg-black px-2 text-center text-xs font-medium text-white">
												39% OFF
											</span>
										</button>

										<div className="mt-3 px-4 pb-4">
											<button
												onClick={() => {
													if (user) {
														navigate(`/car/${item.id}`);
													} else {
														setShowLoginPopup(true);
													}
												}}
											>
												<h5 className="text-lg tracking-tight text-gray-900 dark:text-gray-100">
													{item.name}
												</h5>
											</button>
											<div className="mt-2 mb-4 flex justify-between">
												<p className="flex flex-col gap-1">
													<span className="text-2xl font-bold text-blue-600">
														${item.price_now}
													</span>
													<span className="text-sm text-gray-900 dark:text-gray-300 line-through">
														${item.price_before}
													</span>
												</p>
												<div className="flex items-center">
													{Array(5)
														.fill(null)
														.map((_, i) => (
															<svg
																key={i}
																aria-hidden="true"
																className="h-4.5 w-4.5 text-yellow-300"
																fill="currentColor"
																viewBox="0 0 20 20"
																xmlns="http://www.w3.org/2000/svg"
															>
																<path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
															</svg>
														))}
													<span className="ml-2 rounded text-gray-100 dark:text-gray-900 bg-yellow-200 px-2 py-0.5 text-xs font-semibold">
														5.0
													</span>
												</div>
											</div>
											<button
												className="flex cursor-pointer w-full items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-center text-sm font-medium text-gray-100 hover:bg-blue-500 focus:outline-none"
												onClick={() => {
													if (user) {
														navigate(`/car/${item.id}`);
													} else {
														setShowLoginPopup(true);
													}
												}}
											>
												<svg
													xmlns="http://www.w3.org/2000/svg"
													className="mr-2 h-5 w-5"
													fill="none"
													viewBox="0 0 24 24"
													stroke="currentColor"
													strokeWidth="2"
												>
													<FontAwesomeIcon icon={faCar} />
												</svg>
												Book now
											</button>
										</div>
									</div>
								)
						)}
				</div>
				<Pagination
					currentPage={currentPage}
					npage={npage}
					handlePageChange={handlePageChange}
				/>
			</div>
			{showLoginPopup && <BookLogin setShowLoginPopup={setShowLoginPopup} />}
		</section>
	);
}
