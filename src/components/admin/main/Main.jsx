import { Route, Routes } from "react-router-dom";
// Cars
import Cars from "../pages/cars/Cars";
import CreateCar from "../pages/cars/CreateCar";
import DetailCar from "../pages/cars/DetailCar";
import EditCar from "../pages/cars/EditCar";
// Clients
import Clients from "../pages/clients/Clients";
import CreateClient from "../pages/clients/CreateClient";
import DetailClient from "../pages/clients/DetailClient";
import EditClient from "../pages/clients/EditClient";
// Contract
import Contracts from "../pages/contracts/Contracts";
import CreateContract from "../pages/contracts/CreateContract";
import EditContract from "../pages/contracts/EditContract";
import Home from "../pages/home/Home";
// Function
export default function Main() {
	return (
		<main className="dark:text-gray-100 text-gray-900 dark:bg-gray-800 bg-gray-200 flex flex-col items-center flex-grow p-5">
			<Routes>
				{/* Home */}
				<Route path="/home" element={<Home />} />
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
			</Routes>
		</main>
	);
}
