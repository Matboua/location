import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Card({ icon, title, value }) {
	return (
		<div className="dark:bg-gray-900 hover:bg-blue-600 hover:text-white hover:dark:bg-blue-900 bg-white border border-gray-300 dark:border-gray-700 rounded-2xl flex flex-col items-center justify-center gap-4 py-6 px-10 group transition-all duration-300">
			<FontAwesomeIcon
				icon={icon}
				size="xl"
				className=" bg-blue-600 group-hover:bg-white group-hover:dark:bg-gray-100  text-white group-hover:text-blue-600 group-hover:dark:text-blue-900  p-5 rounded-full w-fit"
			/>
			<h3 className="font-medium text-xl">{title}</h3>
			<p>{value}</p>
		</div>
	);
}
