import { Link } from "react-router-dom";
import { useState } from "react";

export default function BookLogin({ setShowLoginPopup }) {
	const [isOpen, setIsOpen] = useState(true);

	const closeModal = () => {
		setShowLoginPopup(false);
	};

	if (!isOpen) return null;

	return (
		<div className="fixed z-10 inset-0 overflow-y-auto">
			<div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
				<div className="fixed inset-0 transition-opacity">
					<div className="absolute inset-0 bg-gray-500/40"></div>
				</div>
				<span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>
				<div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6 relative">
					<div className="sm:flex sm:items-start">
						<div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-10  border border-blue-600">
							<svg
								className="h-6 w-6 text-blue-600"
								stroke="currentColor"
								fill="none"
								viewBox="0 0 24 24"
							>
								<path fill="currentColor" d="M12 2L2 22h20L12 2z"></path>
								<path
									stroke="white"
									strokeWidth="2"
									strokeLinecap="round"
									d="M12 8v4"
								></path>
								<circle cx="12" cy="16" r="1.5" fill="white"></circle>
							</svg>
						</div>
						<div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
							<h3 className="text-lg leading-6 font-medium text-gray-900">
								🚀 Please Login
							</h3>
							<div className="mt-2">
								<p className="text-sm leading-5 text-gray-500">
									Quick heads-up! Please log in now to secure your booking
									before it is too late!
								</p>
							</div>
						</div>
					</div>
					<button
						onClick={closeModal}
						className="absolute top-0 right-0 mt-4 mr-4 text-gray-400 hover:text-gray-600 bg-white rounded-full border border-red-300 p-1 focus:outline-none focus:ring-2 focus:ring-offset-2 cursor-pointer focus:ring-gray-500"
					>
						<svg
							className="h-4 w-4 text-red-600"
							stroke="currentColor"
							fill="none"
							viewBox="0 0 24 24"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="M6 6l12 12M18 6l-12 12"
							></path>
						</svg>
					</button>
					<div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
						<span className="flex w-full rounded-md shadow-sm sm:ml-3 sm:w-auto">
							<Link
								to="/login"
								className="inline-flex justify-center w-full rounded-md border border-transparent px-4 py-2 bg-blue-600 text-base leading-6 font-medium text-white shadow-sm hover:bg-blue-500 focus:outline-none focus:shadow-outline-green transition ease-in-out duration-150 sm:text-sm sm:leading-5"
							>
								Login
							</Link>
						</span>
						<span className="mt-3 flex w-full rounded-md shadow-sm sm:mt-0 sm:w-auto">
							<Link
								to="/register"
								className="inline-flex justify-center w-full rounded-md border border-gray-300 px-4 py-2 bg-white text-base leading-6 font-medium text-gray-700 shadow-sm hover:text-gray-600 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue transition ease-in-out duration-150 sm:text-sm sm:leading-5"
							>
								Register
							</Link>
						</span>
					</div>
				</div>
			</div>
		</div>
	);
}
