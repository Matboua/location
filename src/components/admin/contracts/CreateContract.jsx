import { differenceInDays } from 'date-fns';
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

export default function CreateContract() {

// To fetch the next id
        // useState
            const [id, setId] = useState("")
        // Function
            useEffect(() => {
                fetch('http://localhost:8000/contracts')
                    .then(response => response.json())
                    .then(data => {
                        const maxId = data.reduce((max, contract) => Math.max(max, contract.id), 0);
                        setId((maxId + 1).toString());
                    })
                    .catch(err => console.log(err.message));
            }, []);
// To POST contract on submit
        // useState
            const [car_name, setCar_name] = useState("")
            const [image, setImage] = useState("")
            const [car_id, setCar_id] = useState("")
            const [client_id, setClient_id] = useState("")
            const [start_date, setStart_date] = useState("")
            const [end_date, setEnd_date] = useState("")
            const [amount, setAmount] = useState("0")
            const navigate = useNavigate()
        // function
            const handleSubmit = (e) => {
            e.preventDefault()
            const contractData = {
                id,
                car_name,
                image,
                car_id,
                client_id,
                start_date,
                end_date,
                amount:parseFloat(amount).toFixed(2)}
            fetch('http://localhost:8000/contracts', {
                method:'POST',
                headers:{
                    'content-type':'application/json'
                },
                body:JSON.stringify(contractData)
            })
            .then(()=>{
                navigate('/admin/contracts')
            })
            .catch(err=>console.log(err.message))
            }
// To fetch cars info in select
        // useState
            const [cars, setCars] = useState([])
        // Function
            useEffect(()=>{
                fetch('http://localhost:8000/cars')
                .then(res=>res.json())
                .then(data=>setCars(data))
                .catch(err=>console.log(err))
            })
// To fetch clients info in select
        // useState
            const [clients, setClients] = useState([])
        // Function
            useEffect(()=>{
        fetch('http://localhost:8000/clients')
        .then(res=>res.json())
        .then(data=>setClients(data))
        .catch(err=>console.log(err))
        })
// Start Date and Amount Calc
        const handleStartDate = (e)=> {
            setStart_date(e.target.value)
            setAmount(car_price && end_date ? (car_price * differenceInDays(new Date(end_date), new Date(e.target.value))) : "0")
        }
// End Date and Amount Calc
        const handleEndDate = (e)=> {
            setEnd_date(e.target.value)
            setAmount(car_price && start_date ? (car_price * differenceInDays(new Date(e.target.value), new Date(start_date))) : "0")
        }
// Car Info and Amount Calc
        // useState
            const [car_price, setCar_price] = useState("")
        // Function
            const handleCar = (e)=> {
        setCar_id(e.target.value)
        const selectedCar = cars.find(car => car.id === e.target.value);
        setCar_price(selectedCar.price_now)
        setImage(selectedCar.image)
        setCar_name(selectedCar.name)
        setAmount(start_date && end_date ? (selectedCar.price_now * differenceInDays(new Date(end_date), new Date(start_date))) : "0")
            }
// Client Info
        const handleClient = (e) => {
            setClient_id(e.target.value)
        }
    return(
        <form className="w-full" onSubmit={handleSubmit}>
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0">
                <div className="w-full bg-white dark:bg-gray-900 rounded-lg shadow dark:border-gray-700 border-gray-300 border md:mt-0 sm:max-w-md xl:p-0">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <p className="text-xl font-bold leading-tight tracking-tight dark:text-gray-100 text-gray-900 md:text-2xl">
                            Add new Contract
                        </p>
                        {/* Contract Id */}
                        <div>
                            <label htmlFor="id" className="block mb-2 text-sm font-medium dark:text-gray-100 text-gray-900">
                            Id
                            </label>
                            <input placeholder="10" className="dark:bg-gray-700 bg-gray-200 dark:border-gray-700  border border-gray-300 dark:text-green-500 font-medium text-green-900 sm:text-sm rounded-lg block w-full p-2.5" id="id" name="id" type="text" value={id} disabled/>
                        </div>
                        {/* Client Name */}
                        <div>
                            <label htmlFor="client_name">Client Name</label>
                            <select name="client_name" id="client_name" className="dark:bg-gray-800 dark:border-gray-700 bg-gray-50 border border-gray-300 dark:text-gray-100 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5" onChange={(e)=>handleClient(e)}>
                            <option value="">Please Select a Client</option>
                            {
                                clients.map((client,key)=>(
                                    <option key={key} value={client.id}>{client.first_name} {client.last_name}</option>
                                ))
                            }
                        </select>
                        </div>
                        {/* Car Name */}
                        <div>
                            <label htmlFor="car_name">Car Name</label>
                            <select name="car_name" id="car_name" className="dark:bg-gray-800 dark:border-gray-700 bg-gray-50 border border-gray-300 dark:text-gray-100 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5" 
                            onChange={(e) => handleCar(e)}>
                                <option value="">Please Select a Car</option>
                                {
                                    cars.map((car,key)=>(
                                        <option key={key} value={car.id}>{car.name}</option>
                                    ))
                                }
                            </select>
                        </div>
                        {/* Start Date */}
                        <div>
                            <label htmlFor="start_date" className="block mb-2 text-sm font-medium dark:text-gray-100 text-gray-900">
                            Start Date
                            </label>
                            <input placeholder="10" className="dark:bg-gray-800 dark:border-gray-700 bg-gray-50 border border-gray-300 dark:text-gray-100 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5" id="start_date" name="start_date" type="date" value={start_date} onChange={(e)=>handleStartDate(e)}/>
                        </div>
                        {/* End Date */}
                        <div>
                            <label htmlFor="end_date" className="block mb-2 text-sm font-medium dark:text-gray-100 text-gray-900">
                            End Date
                            </label>
                            <input placeholder="10" className="dark:bg-gray-800 dark:border-gray-700 bg-gray-50 border border-gray-300 dark:text-gray-100 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5" id="end_date" name="end_date" type="date" value={end_date} onChange={(e)=>handleEndDate(e)}/>
                        </div>
                        {/* Amount */}
                        <div>
                            <label htmlFor="amount" className="block mb-2 text-sm font-medium dark:text-gray-100 text-gray-900">
                            Amount ($)
                            </label>
                            <input placeholder="Auto Calc" className="dark:bg-gray-800 dark:border-gray-700 bg-gray-50 border border-gray-300 dark:text-gray-100 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5" id="amount" name="amount" type="text" value={amount>0 ? amount : 'Please choose a valid date'} disabled/>
                        </div>

                        <button className=" cursor-pointer w-full bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center  focus:ring-blue-800 text-white" type="submit">
                            Add Contract
                        </button>
                        
                    </div>
                </div>
            </div>
        </form>
    )
}
