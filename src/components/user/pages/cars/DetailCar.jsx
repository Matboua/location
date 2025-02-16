import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

export default function DetailCar() {
    const {carid} = useParams()
    console.log(carid)
    
    const [car, setCar] = useState('')
    const [mainImage, setMainImage] = useState(car.image);
    
    useEffect(() => {
        fetch('http://localhost:8000/cars/' + carid)
        .then(res => res.json())
            .then(data => {
                setCar(data);
                setMainImage(data.image);
            });
        }, [carid]);
        
    const thumbnails = [
        car.image,
        "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1698883157078-b7032ec657db?q=80&w=1870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    ];
    return(
            <div className="container mx-auto px-4 py-8">
                <div className="flex flex-wrap -mx-4">
                    <div className="w-full md:w-1/2 px-4 mb-8">
                        <img
                        src={mainImage}
                        alt="Product"
                        className="w-full h-auto rounded-lg shadow-md mb-4"
                        />
                        <div className="flex gap-4 py-4 justify-center overflow-x-auto">
                        {thumbnails.map((thumb, index) => (
                            <img
                            key={index}
                            src={thumb}
                            alt={`Thumbnail ${index + 1}`}
                            className="size-16 sm:size-20 object-cover rounded-md cursor-pointer opacity-60 hover:opacity-100 transition duration-300"
                            onClick={() => setMainImage(thumb)}
                            />
                        ))}
                        </div>
                    </div>
                    <div className="w-full md:w-1/2 px-4">
                        <h2 className="text-3xl font-bold mb-2">{car.name}</h2>
                        <p className=" text-gray-200 dark:text-gray-300 mb-4">Brand: {car.marc}</p>
                        <div className="mb-4">
                            <span className="text-2xl font-bold mr-2">$349.99</span>
                            <span className="text-gray-500 line-through">$399.99</span>
                        </div>
                        <p className=" text-gray-200 dark:text-gray-300 mb-6">
                        Experience premium sound quality and industry-leading noise cancellation with
                        these wireless headphones. Perfect for music lovers and frequent travelers.
                        </p>
                        {/* <div className="mb-6">
                            <h3 className="text-lg font-semibold mb-2">Color:</h3>
                            <div className="flex space-x-2">
                                <button className="w-8 h-8 bg-black rounded-full focus:ring-2 focus:ring-black"></button>
                                <button className="w-8 h-8 bg-gray-300 rounded-full focus:ring-2 focus:ring-gray-300"></button>
                                <button className="w-8 h-8 bg-blue-500 rounded-full focus:ring-2 focus:ring-blue-500"></button>
                            </div>
                        </div>
                        <div className="mb-6">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Quantity:</label>
                            <input
                                type="number"
                                min="1"
                                defaultValue="1"
                                className="w-12 text-center rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            />
                        </div> 
                        <div className="flex space-x-4 mb-6">
                            <button className="bg-indigo-600 flex gap-2 items-center text-white px-6 py-2 rounded-md hover:bg-indigo-700">
                                Add to Cart
                            </button>
                            <button className="bg-gray-200 flex gap-2 items-center text-gray-800 px-6 py-2 rounded-md hover:bg-gray-300">
                                Wishlist
                            </button>
                        </div>*/}
                        <h3 className="text-lg font-semibold mb-2">Key Features:</h3>
                        <ul className="list-disc list-inside text-gray-200 dark:text-gray-300">
                            <li><span className="font-bold">Marc</span> {car.marc}</li>
                            <li><span className="font-bold">Model</span> {car.model}</li>
                            <li><span className="font-bold">Feul</span> {car.type}</li>
                        </ul>
                    </div>
                </div>
            </div>
    )
}