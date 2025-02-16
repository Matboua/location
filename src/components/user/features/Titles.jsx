import { faHandsHolding } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Titles({title, description}) {
    
    return(
        <div className="text-center px-5 pb-5 flex flex-col gap-2">
            <h1 className="font-medium text-3xl p-10 dark:text-gray-200 text-gray-900 -mb-8">{title}</h1>
            <FontAwesomeIcon icon={faHandsHolding} size="2xl"/>
            <p>{description}</p>
        </div>
    )
};
