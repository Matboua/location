import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCar } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";

export default function Main() {
    const [cars, setCars] = useState('')
    useEffect(()=>{
        fetch('http://localhost:8000/cars')
        .then(res=>res.json())
        .then(data=>setCars(data))
        .catch(err=>console.log(err.message))
    }, [])
    return(
        <div className="grid gap-5 p-5 grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 justify-items-center">
            {
                cars && cars.map((item,key)=>(
                    
                    item.available && <div key={key} className="relative flex max-w-[280px] flex-col overflow-hidden rounded-lg border border-gray-100 dark:border-gray-800 dark:bg-gray-900 bg-white shadow-md">
                        <a className="relative mx-3 mt-3 flex h-48 overflow-hidden rounded-xl" href="#">
                            <img
                            className="object-cover"
                            src={item.image}
                            alt="product image"
                            />
                            <span className="absolute top-0 left-0 m-2 rounded-full bg-black px-2 text-center text-xs font-medium text-white">
                            39% OFF
                            </span>
                        </a>
                        <div className="mt-3 px-4 pb-4">
                            <a href="#">
                                <h5 className="text-lg tracking-tight text-gray-900 dark:text-gray-100">{item.name}</h5>
                            </a>
                            <div className="mt-2 mb-4 flex justify-between">
                                <p className="flex flex-col gap-1">
                                    <span className="text-2xl font-bold text-gray-900 dark:text-gray-100">${item.price_now}</span>
                                    <span className="text-sm text-gray-900 dark:text-gray-300 line-through">${item.price_before}</span>
                                </p>
                                <div className="flex items-center">
                                    {Array(5)
                                    .fill(null)
                                    .map((_, i) => (
                                        <svg
                                        key={i}
                                        aria-hidden="true"
                                        className="h-4.5 w-4.5 text-yellow-300"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                        xmlns="http://www.w3.org/2000/svg"
                                        >
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                                        </svg>
                                    ))}
                                    <span className="ml-2 rounded text-gray-100 dark:text-gray-900 bg-yellow-200 px-2 py-0.5 text-xs font-semibold">5.0</span>
                                </div>
                            </div>
                            <a
                                href="#"
                                className="flex items-center justify-center rounded-md dark:bg-slate-800 bg-slate-900 px-4 py-2 text-center text-sm font-medium text-gray-100 hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-300"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="mr-2 h-5 w-5"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                >
                                    {/* <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /> */}
                                    <FontAwesomeIcon icon={faCar} />
                                </svg>
                                Book now
                            </a>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}