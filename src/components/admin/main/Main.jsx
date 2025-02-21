import { Route, Routes } from "react-router-dom";
// Cars
import Cars from "../cars/Cars";
import CreateCar from "../cars/CreateCar";
import DetailCar from "../cars/DetailCar";
import EditCar from "../cars/EditCar";
// Clients
import Clients from "../clients/Clients";
import CreateClient from "../clients/CreateClient";
import DetailClient from "../clients/DetailClient";
import EditClient from "../clients/EditClient";
// Contract
import Contracts from "../contracts/Contracts";
import CreateContract from "../contracts/CreateContract";
import EditContract from "../contracts/EditContract";
import Pagination from "../pagination/Pagination";
// Function
export default function Main() {
	return (
		<main className="dark:text-gray-100 text-gray-900 dark:bg-gray-800 bg-gray-200 flex flex-col items-center flex-grow p-5">
			<Routes>
				{/* Cars */}
				<Route path="cars" element={<Cars />} />
				<Route path="cars/create" element={<CreateCar />} />
				<Route path="cars/detail/:carid" element={<DetailCar />} />
				<Route path="cars/edit/:carid" element={<EditCar />} />
				{/* Clients */}
				<Route path="clients" element={<Clients />} />
				<Route path="clients/create" element={<CreateClient />} />
				<Route path="clients/detail/:clientid" element={<DetailClient />} />
				<Route path="clients/edit/:clientid" element={<EditClient />} />
				{/* Contracts */}
				<Route path="contracts" element={<Contracts />} />
				<Route path="contracts/create" element={<CreateContract />} />
				<Route path="contracts/edit/:contractid" element={<EditContract />} />
				<Route path="x" element={<Pagination />} />
			</Routes>
		</main>
	);
}
