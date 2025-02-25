import { BrowserRouter, Routes, Route } from "react-router-dom";
import Admin from "./components/admin/Admin";
import User from "./components/user/User";
import DetailContract from "./components/admin/pages/contracts/DetailContract";
function App() {
	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route path="/admin/*" element={<Admin />} />
					<Route path="/*" element={<User />} />
					<Route
						path="/DetailContract/:contractid"
						element={<DetailContract />}
					/>
				</Routes>
			</BrowserRouter>
		</>
	);
}

export default App;
