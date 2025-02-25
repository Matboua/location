import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

export default function EditClient() {
	// Get Id
	const { clientid } = useParams();
	// Get Client
	const client = useSelector((state) =>
		state.clients.find((client) => client.id == clientid)
	);
	// Update Client Data
	const [first_name, setFirst_name] = useState(client.first_name);
	const [last_name, setLast_name] = useState(client.last_name);
	const [phone, setPhone] = useState(client.phone);
	const [email, setEmail] = useState(client.email);
	const [city, setCity] = useState(client.city);
	const navigate = useNavigate();
	// PUT Client (handleSubmit)
	const handleSubmit = (e) => {
		e.preventDefault();
		const clientData = {
			id: clientid,
			first_name: first_name.at(0).toUpperCase() + first_name.slice(1),
			last_name: last_name.at(0).toUpperCase() + last_name.slice(1),
			phone,
			email: email.toLowerCase(),
			city,
		};
		fetch("https://json-server-api-q84y.onrender.com/clients/" + clientid, {
			method: "PUT",
			headers: {
				"content-type": "application/json",
			},
			body: JSON.stringify(clientData),
		})
			.then(() => {
				navigate("/admin/clients");
			})
			.catch((err) => console.log(err.message));
	};
	return (
		<form className="w-full" onSubmit={handleSubmit}>
			<div className="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0">
				<div className="w-full bg-white dark:bg-gray-900 rounded-lg shadow dark:border-gray-700 border-gray-300 border md:mt-0 sm:max-w-md xl:p-0">
					<div className="p-6 space-y-4 md:space-y-6 sm:p-8">
						<p className="text-xl font-bold leading-tight tracking-tight dark:text-gray-100 text-gray-900 md:text-2xl">
							Edit Client
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
								value={clientid}
								disabled
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
								placeholder="matboua@gmail.com"
								className="dark:bg-gray-800 dark:border-gray-700 bg-gray-50 border border-gray-300 dark:text-gray-100 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
								id="email"
								name="email"
								type="email"
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
							Edit Client
						</button>
					</div>
				</div>
			</div>
		</form>
	);
}
