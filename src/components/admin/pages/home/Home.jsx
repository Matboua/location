import { useSelector } from "react-redux";
import {
	BarChart,
	XAxis,
	YAxis,
	Tooltip,
	ResponsiveContainer,
	Bar,
	PieChart,
	Pie,
	Cell,
	Legend,
	LineChart,
	Line,
} from "recharts";
import { Card, CardContent } from "@/components/ui/card";
import {
	Table,
	TableHead,
	TableRow,
	TableCell,
	TableBody,
} from "@/components/ui/table";
import { Car, Users, FileText, DollarSign } from "lucide-react";

const Home = () => {
	const cars = useSelector((state) => state.cars);
	const clients = useSelector((state) => state.clients);
	const contracts = useSelector((state) => state.contracts);

	// Calculate total revenue
	const totalRevenue = contracts.reduce(
		(sum, contract) => sum + Number.parseFloat(contract.amount),
		0
	);

	// Calculate monthly revenue data
	const monthNames = [
		"Jan",
		"Feb",
		"Mar",
		"Apr",
		"May",
		"Jun",
		"Jul",
		"Aug",
		"Sep",
		"Oct",
		"Nov",
		"Dec",
	];
	const currentYear = new Date().getFullYear();

	const monthlyRevenue = monthNames.map((month, index) => {
		const monthContracts = contracts.filter((contract) => {
			const contractDate = new Date(contract.start_date);
			return (
				contractDate.getMonth() === index &&
				contractDate.getFullYear() === currentYear
			);
		});

		const revenue = monthContracts.reduce(
			(sum, contract) => sum + Number.parseFloat(contract.amount),
			0
		);

		return {
			month,
			revenue: revenue.toFixed(2),
		};
	});

	// Calculate car types distribution
	const carTypes = cars.reduce((acc, car) => {
		acc[car.type] = (acc[car.type] || 0) + 1;
		return acc;
	}, {});

	const carTypeData = Object.keys(carTypes).map((type) => ({
		name: type,
		value: carTypes[type],
	}));

	// Colors for pie chart
	const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"];

	// Calculate active vs inactive cars
	const activeCars = cars.filter((car) => car.available).length;
	const inactiveCars = cars.length - activeCars;

	const carStatusData = [
		{ name: "Available", value: activeCars },
		{ name: "Unavailable", value: inactiveCars },
	];

	// Get recent contracts
	const recentContracts = [...contracts]
		.sort((a, b) => new Date(b.start_date) - new Date(a.start_date))
		.slice(0, 5);

	// Calculate weekly booking trend (last 7 days)
	const today = new Date();
	const last7Days = Array.from({ length: 7 }, (_, i) => {
		const date = new Date(today);
		date.setDate(date.getDate() - i);
		return date.toISOString().split("T")[0];
	}).reverse();

	const weeklyBookingTrend = last7Days.map((date) => {
		const count = contracts.filter(
			(contract) => contract.start_date === date
		).length;
		return {
			date: date.split("-")[2], // Just show the day
			bookings: count,
		};
	});

	return (
		<div className="p-6 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white min-h-screen w-full">
			<h1 className="text-2xl font-bold mb-6">Dashboard Overview</h1>

			{/* Summary Cards */}
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
				<Card className="bg-white dark:bg-gray-800">
					<CardContent className="p-6 flex items-center justify-between">
						<div>
							<p className="text-sm font-medium text-gray-500 dark:text-gray-400">
								Total Clients
							</p>
							<h2 className="text-3xl font-bold">{clients.length}</h2>
							<p className="text-xs text-green-500 mt-1">
								+12% from last month
							</p>
						</div>
						<div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-full">
							<Users className="h-6 w-6 text-blue-600 dark:text-blue-400" />
						</div>
					</CardContent>
				</Card>

				<Card className="bg-white dark:bg-gray-800">
					<CardContent className="p-6 flex items-center justify-between">
						<div>
							<p className="text-sm font-medium text-gray-500 dark:text-gray-400">
								Total Cars
							</p>
							<h2 className="text-3xl font-bold">{cars.length}</h2>
							<p className="text-xs text-green-500 mt-1">+5% from last month</p>
						</div>
						<div className="p-3 bg-purple-100 dark:bg-purple-900 rounded-full">
							<Car className="h-6 w-6 text-purple-600 dark:text-purple-400" />
						</div>
					</CardContent>
				</Card>

				<Card className="bg-white dark:bg-gray-800">
					<CardContent className="p-6 flex items-center justify-between">
						<div>
							<p className="text-sm font-medium text-gray-500 dark:text-gray-400">
								Total Contracts
							</p>
							<h2 className="text-3xl font-bold">{contracts.length}</h2>
							<p className="text-xs text-green-500 mt-1">
								+18% from last month
							</p>
						</div>
						<div className="p-3 bg-amber-100 dark:bg-amber-900 rounded-full">
							<FileText className="h-6 w-6 text-amber-600 dark:text-amber-400" />
						</div>
					</CardContent>
				</Card>

				<Card className="bg-white dark:bg-gray-800">
					<CardContent className="p-6 flex items-center justify-between">
						<div>
							<p className="text-sm font-medium text-gray-500 dark:text-gray-400">
								Total Revenue
							</p>
							<h2 className="text-3xl font-bold">${totalRevenue.toFixed(2)}</h2>
							<p className="text-xs text-green-500 mt-1">+8% from last month</p>
						</div>
						<div className="p-3 bg-green-100 dark:bg-green-900 rounded-full">
							<DollarSign className="h-6 w-6 text-green-600 dark:text-green-400" />
						</div>
					</CardContent>
				</Card>
			</div>

			{/* Charts Row */}
			<div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
				{/* Monthly Revenue Chart */}
				<Card className="bg-white dark:bg-gray-800">
					<CardContent className="p-6">
						<h3 className="text-lg font-semibold mb-4">Monthly Revenue</h3>
						<ResponsiveContainer width="100%" height={300}>
							<BarChart data={monthlyRevenue}>
								<XAxis dataKey="month" stroke="currentColor" />
								<YAxis stroke="currentColor" />
								<Tooltip
									contentStyle={{
										backgroundColor: "rgba(255, 255, 255, 0.8)",
										borderRadius: "8px",
										border: "none",
										color: "#333",
									}}
									formatter={(value) => [`$${value}`, "Revenue"]}
								/>
								<Bar dataKey="revenue" fill="#4F46E5" radius={[4, 4, 0, 0]} />
							</BarChart>
						</ResponsiveContainer>
					</CardContent>
				</Card>

				{/* Car Types Distribution */}
				<Card className="bg-white dark:bg-gray-800">
					<CardContent className="p-6">
						<h3 className="text-lg font-semibold mb-4">
							Car Types Distribution
						</h3>
						<ResponsiveContainer width="100%" height={300}>
							<PieChart>
								<Pie
									data={carTypeData}
									cx="50%"
									cy="50%"
									labelLine={false}
									outerRadius={100}
									fill="#8884d8"
									dataKey="value"
									label={({ name, percent }) =>
										`${name} ${(percent * 100).toFixed(0)}%`
									}
								>
									{carTypeData.map((entry, index) => (
										<Cell
											key={`cell-${index}`}
											fill={COLORS[index % COLORS.length]}
										/>
									))}
								</Pie>
								<Tooltip formatter={(value, name) => [`${value} cars`, name]} />
								<Legend />
							</PieChart>
						</ResponsiveContainer>
					</CardContent>
				</Card>
			</div>

			{/* Second Row of Charts */}
			<div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
				{/* Car Status Chart */}
				<Card className="bg-white dark:bg-gray-800">
					<CardContent className="p-6">
						<h3 className="text-lg font-semibold mb-4">
							Car Availability Status
						</h3>
						<ResponsiveContainer width="100%" height={300}>
							<PieChart>
								<Pie
									data={carStatusData}
									cx="50%"
									cy="50%"
									labelLine={false}
									outerRadius={100}
									fill="#8884d8"
									dataKey="value"
									label={({ name, percent }) =>
										`${name} ${(percent * 100).toFixed(0)}%`
									}
								>
									<Cell fill="#4ade80" />
									<Cell fill="#f87171" />
								</Pie>
								<Tooltip formatter={(value, name) => [`${value} cars`, name]} />
								<Legend />
							</PieChart>
						</ResponsiveContainer>
					</CardContent>
				</Card>

				{/* Weekly Booking Trend */}
				<Card className="bg-white dark:bg-gray-800">
					<CardContent className="p-6">
						<h3 className="text-lg font-semibold mb-4">Weekly Booking Trend</h3>
						<ResponsiveContainer width="100%" height={300}>
							<LineChart data={weeklyBookingTrend}>
								<XAxis dataKey="date" stroke="currentColor" />
								<YAxis stroke="currentColor" />
								<Tooltip
									contentStyle={{
										backgroundColor: "rgba(255, 255, 255, 0.8)",
										borderRadius: "8px",
										border: "none",
										color: "#333",
									}}
								/>
								<Line
									type="monotone"
									dataKey="bookings"
									stroke="#4F46E5"
									strokeWidth={2}
									dot={{ r: 4 }}
								/>
							</LineChart>
						</ResponsiveContainer>
					</CardContent>
				</Card>
			</div>

			{/* Recent Contracts Table */}
			<Card className="bg-white dark:bg-gray-800">
				<CardContent className="p-6">
					<div className="flex justify-between items-center mb-4">
						<h3 className="text-lg font-semibold">Recent Contracts</h3>
						<button className="text-sm text-blue-600 dark:text-blue-400 hover:underline">
							View All
						</button>
					</div>
					<Table>
						<TableHead>
							<TableRow>
								<TableCell className="font-bold">Client</TableCell>
								<TableCell className="font-bold">Car</TableCell>
								<TableCell className="font-bold">Start Date</TableCell>
								<TableCell className="font-bold">End Date</TableCell>
								<TableCell className="font-bold">Amount</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{recentContracts.map((contract, index) => {
								const client = clients.find((c) => c.id === contract.client_id);
								return (
									<TableRow key={index}>
										<TableCell>
											{client
												? `${client.first_name} ${client.last_name}`
												: "Unknown"}
										</TableCell>
										<TableCell>{contract.car_name}</TableCell>
										<TableCell>{contract.start_date}</TableCell>
										<TableCell>{contract.end_date}</TableCell>
										<TableCell>
											${Number.parseFloat(contract.amount).toFixed(2)}
										</TableCell>
									</TableRow>
								);
							})}
						</TableBody>
					</Table>
				</CardContent>
			</Card>
		</div>
	);
};

export default Home;
