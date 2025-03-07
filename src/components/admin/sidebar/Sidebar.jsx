import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faHome,
	faCar,
	faUsers,
	faCarOn,
	faFile,
} from "@fortawesome/free-solid-svg-icons";
import { useLocation, useNavigate } from "react-router-dom";

export default function Sidebar() {
	// UseNavigate + UseLocation
	const navigate = useNavigate();
	const location = useLocation();
	// Check Location
	const isHome = location.pathname.includes("/home");
	const isCars = location.pathname.includes("/cars");
	const isClients = location.pathname.includes("/clients");
	const isContracts = location.pathname.includes("/contracts");
	// Handle Aside Width
	const handleEnter = () => {
		document.getElementById("admin").classList.add("grid-cols-[250px_1fr]");
		document.getElementById("admin").classList.remove("delay-100");
	};
	const handleLeave = () => {
		document.getElementById("admin").classList.remove("grid-cols-[250px_1fr]");
		document.getElementById("admin").classList.add("delay-100");
	};
	// Return
	return (
		<aside
			onMouseEnter={handleEnter}
			onMouseLeave={handleLeave}
			className="dark:bg-gray-900 bg-white h-full row-span-2"
		>
			<table className="dark:text-gray-100 text-gray-900 w-screen cursor-pointer">
				<tbody>
					{/* Logo */}
					<tr
						onClick={() => {
							navigate("/admin/cars");
						}}
						className="h-[73px]"
					>
						<td className="w-4 p-3 text-center">
							<FontAwesomeIcon
								className="text-blue-600"
								icon={faCarOn}
								size="xl"
							/>
						</td>
						<td className="links text-2xl">
							<span>Location</span>
						</td>
					</tr>
					{/* Home*/}
					<tr
						onClick={() => {
							navigate("/admin/home");
						}}
						className={
							isHome
								? "bg-slate-300 dark:bg-slate-600"
								: "hover:bg-slate-300 dark:hover:bg-slate-600"
						}
					>
						<td className="w-4 p-3 text-center">
							<FontAwesomeIcon icon={faHome} />
						</td>
						<td className="links">
							<span>Home</span>
						</td>
					</tr>
					{/* Clients*/}
					<tr
						onClick={() => {
							navigate("/admin/clients");
						}}
						className={
							isClients
								? "bg-slate-300 dark:bg-slate-600"
								: "hover:bg-slate-300 dark:hover:bg-slate-600"
						}
					>
						<td className="w-4 p-3 text-center">
							<FontAwesomeIcon icon={faUsers} />
						</td>
						<td className="links">
							<span>Clients</span>
						</td>
					</tr>
					{/* Cars*/}
					<tr
						onClick={() => {
							navigate("/admin/cars");
						}}
						className={
							isCars
								? "bg-slate-300 dark:bg-slate-600"
								: "hover:bg-slate-300 dark:hover:bg-slate-600"
						}
					>
						<td className="w-4 p-3 text-center">
							<FontAwesomeIcon icon={faCar} />
						</td>
						<td className="links">
							<span>Cars</span>
						</td>
					</tr>
					{/* Contracts*/}
					<tr
						onClick={() => {
							navigate("/admin/contracts");
						}}
						className={
							isContracts
								? "bg-slate-300 dark:bg-slate-600"
								: "hover:bg-slate-300 dark:hover:bg-slate-600"
						}
					>
						<td className="w-4 p-3 text-center">
							<FontAwesomeIcon icon={faFile} />
						</td>
						<td className="links">
							<span>Contracts</span>
						</td>
					</tr>
				</tbody>
			</table>
		</aside>
	);
}
