import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addClient } from "../../../../redux/clients/clientsReducer";

export default function CreateClient() {
	// Set New Client Data
	const [first_name, setFirst_name] = useState("");
	const [cin, setCin] = useState("");
	const [last_name, setLast_name] = useState("");
	const [phone, setPhone] = useState("");
	const [email, setEmail] = useState("");
	const [city, setCity] = useState("");
	const navigate = useNavigate();
	const dispatch = useDispatch();
	// Get Next Id
	const clients = useSelector((state) => state.clients);
	const nextId =
		clients.reduce((max, client) => Math.max(max, client.id), 0) + 1;
	// Post New Client
	const handleSubmit = (e) => {
		e.preventDefault();
		const clientData = {
			id: nextId,
			cin: cin.toLowerCase(),
			first_name: first_name.toLowerCase(),
			last_name: last_name.toLowerCase(),
			phone,
			email: email.toLowerCase(),
			city: city.toLowerCase(),
		};
		dispatch(addClient(clientData));
		navigate("/admin/clients");
	};
	return (
		<form className="w-full" onSubmit={handleSubmit}>
			<div className="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0">
				<div className="w-full bg-white dark:bg-gray-900 rounded-lg shadow dark:border-gray-700 border-gray-300 border md:mt-0 sm:max-w-md xl:p-0">
					<div className="p-6 space-y-4 md:space-y-6 sm:p-8">
						<p className="text-xl font-bold leading-tight tracking-tight dark:text-gray-100 text-gray-900 md:text-2xl">
							Add new client
						</p>
						<div>
							<label
								htmlFor="id"
								className="block mb-2 text-sm font-medium dark:text-gray-100 text-gray-900"
							>
								Id
							</label>
							<input
								placeholder="10"
								className="dark:bg-gray-700 bg-gray-200 dark:border-gray-700  border border-gray-300 dark:text-green-500 font-medium text-green-900 sm:text-sm rounded-lg block w-full p-2.5"
								id="id"
								name="id"
								type="text"
								value={nextId}
								disabled
							/>
						</div>
						<div>
							<label
								htmlFor="cin"
								className="block mb-2 text-sm font-medium dark:text-gray-100 text-gray-900"
							>
								CIN
							</label>
							<input
								placeholder="JB520335"
								className="dark:bg-gray-800 dark:border-gray-700 bg-gray-50 border border-gray-300 dark:text-gray-100 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
								id="cin"
								name="cin"
								type="text"
								value={cin}
								onChange={(e) => {
									setCin(e.target.value);
								}}
							/>
						</div>
						<div>
							<label
								htmlFor="first_name"
								className="block mb-2 text-sm font-medium dark:text-gray-100 text-gray-900"
							>
								First Name
							</label>
							<input
								placeholder="Oussama"
								className="dark:bg-gray-800 dark:border-gray-700 bg-gray-50 border border-gray-300 dark:text-gray-100 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
								id="first_name"
								name="first_name"
								type="text"
								value={first_name}
								onChange={(e) => {
									setFirst_name(e.target.value);
								}}
							/>
						</div>
						<div>
							<label
								htmlFor="last_name"
								className="block mb-2 text-sm font-medium dark:text-gray-100 text-gray-900"
							>
								Last Name
							</label>
							<input
								placeholder="Matboua"
								className="dark:bg-gray-800 dark:border-gray-700 bg-gray-50 border border-gray-300 dark:text-gray-100 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
								id="last_name"
								name="last_name"
								type="text"
								value={last_name}
								onChange={(e) => {
									setLast_name(e.target.value);
								}}
							/>
						</div>
						<div>
							<label
								htmlFor="phone"
								className="block mb-2 text-sm font-medium dark:text-gray-100 text-gray-900"
							>
								Phone
							</label>
							<input
								placeholder="0605776855"
								className="dark:bg-gray-800 dark:border-gray-700 bg-gray-50 border border-gray-300 dark:text-gray-100 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
								id="phone"
								name="phone"
								type="text"
								value={phone}
								onChange={(e) => {
									setPhone(e.target.value);
								}}
							/>
						</div>
						<div>
							<label
								htmlFor="email"
								className="block mb-2 text-sm font-medium dark:text-gray-100 text-gray-900"
							>
								Email
							</label>
							<input
								placeholder="matbouaoussama@gmail.com"
								className="dark:bg-gray-800 dark:border-gray-700 bg-gray-50 border border-gray-300 dark:text-gray-100 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
								id="email"
								name="email"
								type="text"
								value={email}
								onChange={(e) => {
									setEmail(e.target.value);
								}}
							/>
						</div>
						<div>
							<label
								htmlFor="city"
								className="block mb-2 text-sm font-medium dark:text-gray-100 text-gray-900"
							>
								City
							</label>
							<input
								placeholder="Inezgane"
								className="dark:bg-gray-800 dark:border-gray-700 bg-gray-50 border border-gray-300 dark:text-gray-100 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
								id="city"
								name="city"
								type="text"
								value={city}
								onChange={(e) => {
									setCity(e.target.value);
								}}
							/>
						</div>

						<button
							className=" cursor-pointer w-full bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center  focus:ring-blue-800 text-white"
							type="submit"
						>
							Add Client
						</button>
					</div>
				</div>
			</div>
		</form>
	);
}
