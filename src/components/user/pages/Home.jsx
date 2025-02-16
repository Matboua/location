import Slider from "../features/Slider";
import Cars from "./cars/Cars";

export default function Home() {
    
    return(
        <div className="flex flex-col gap-5">
            <Slider />
            <Cars />
        </div>
        
    )
};
