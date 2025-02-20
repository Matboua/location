import { faCircleChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Question({ title, description }) {
	return (
		<div className="dark:bg-gray-900 bg-white dark:text-gray-100 border dark:border-gray-700 border-gray-300 rounded-lg shadow-lg overflow-hidden">
			<input type="checkbox" id={title} className="peer hidden" />
			<label
				htmlFor={title}
				className="flex items-center justify-between p-4 dark:bg-[#03071230] bg-gray-50 cursor-pointer hover:bg-blue-100 dark:hover:bg-[#03071250] dark:peer-checked:bg-[#03071260] transition-colors peer-checked:bg-blue-100"
			>
				<span className="text-lg font-semibold">{title}</span>
				<FontAwesomeIcon
					icon={faCircleChevronDown}
					size="lg"
					className="text-blue-600"
				/>
			</label>
			<div className="max-h-0 overflow-hidden transition-all duration-300 peer-checked:max-h-screen dark:bg-[#172032]">
				<p className="p-4 leading-relaxed">{description}</p>
			</div>
		</div>
	);
}
