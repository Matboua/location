import { useState, useEffect } from "react";

export default function Select() {
	const [isOpen, setIsOpen] = useState(false);
	const [searchTerm, setSearchTerm] = useState("");

	const toggleDropdown = () => {
		setIsOpen(!isOpen);
	};

	const handleSearch = (event) => {
		setSearchTerm(event.target.value.toLowerCase());
	};

	useEffect(() => {
		const items = document.querySelectorAll("#dropdown-menu a");
		items.forEach((item) => {
			const text = item.textContent.toLowerCase();
			if (text.includes(searchTerm)) {
				item.style.display = "block";
			} else {
				item.style.display = "none";
			}
		});
	}, [searchTerm]);

	return (
		<div>
			<div className="relative group">
				<button
					id="dropdown-button"
					className="dark:bg-gray-800 dark:border-gray-700 bg-gray-50 border border-gray-300 dark:text-gray-100 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
					onClick={toggleDropdown}
				>
					<span className="mr-2">Please Select a client</span>
				</button>
				<div
					id="dropdown-menu"
					className={`${
						isOpen ? "" : "hidden"
					} absolute right-0 mt-2 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 p-1 space-y-1`}
				>
					<input
						id="search-input"
						className="block w-full px-4 py-2 text-gray-800 border rounded-md border-gray-300 focus:outline-none"
						type="text"
						placeholder="Search items"
						autoComplete="off"
						value={searchTerm}
						onChange={handleSearch}
					/>
					<a
						href="#"
						className="block px-4 py-2 text-gray-700 hover:bg-gray-100 active:bg-blue-100 cursor-pointer rounded-md"
						onClick={(e) => e.preventDefault()}
					>
						Uppercase
					</a>
				</div>
			</div>
		</div>
	);
}
