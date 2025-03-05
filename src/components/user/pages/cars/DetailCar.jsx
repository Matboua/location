import { useParams } from "react-router-dom";

export default function DetailCar() {
	const { carid } = useParams();
	return (
		<div>
			<h1>Detail Car With Id: {carid}</h1>
		</div>
	);
}
