import { faEdit, faInfoCircle, faTrash } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

export default function CLients() {
    const [clients, setClients] = useState([])
    useEffect(()=>{
        fetch('https://json-server-api-q84y.onrender.com/clients')
        .then(res=>res.json())
        .then(data=>setClients(data))
        .catch(err=>console.log(err.message))
    }, [])
    const deleteClient = (id) => {
        if(confirm('Are You Sure?')) {
            fetch('https://json-server-api-q84y.onrender.com/clients/'+id,{
                method:'delete'
            }).then(() => {
                setClients(clients.filter((car)=>car.id !== id))
            }).catch(err=>console.log(err))
        }
    }
    const navigate = useNavigate()
    const detailClient = (id) => {
        navigate('/admin/clients/detail/'+id)
    }
    const editClient = (id) => {
        navigate('/admin/clients/edit/'+id)
    }
    return(
        <div className="relative flex justify-center w-full overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 border border-gray-300 dark:border-gray-700">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            Id
                        </th>
                        <th scope="col" className="px-6 py-3">
                            First Name
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Last Name
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Phone
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Email
                        </th>
                        <th scope="col" className="px-6 py-3">
                            City
                        </th>
                        <th scope="col" className="px-6 py-3 text-center">
                            Action
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        clients && clients.map((item,key)=>(
                            <tr key={key} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
                                <td className="p-6 py-4">
                                    {item.id}
                                </td>
                                <td className="px-6 py-4">
                                    {item.first_name}
                                </td>
                                <td className="px-6 py-4">
                                    {item.last_name}
                                </td>
                                <td className="px-6 py-4">
                                    {item.phone}
                                </td>
                                <td className="px-6 py-4">
                                    {item.email}
                                </td>
                                <td className="px-6 py-4">
                                    {item.city}
                                </td>
                                <td className="px-6 py-2 text-center whitespace-nowrap">
                                    <button onClick={()=>{detailClient(item.id)}} className="py-1.5 px-4 text-blue-500 bg-blue-100 dark:bg-blue-700 dark:text-blue-100 hover:bg-blue-200 dark:hover:bg-blue-600 rounded-full cursor-pointer transition duration-300 ease-in-out">
                                        <FontAwesomeIcon icon={faInfoCircle} size="lg"/>
                                    </button>
                                    <button onClick={()=>{editClient(item.id)}}  className="mx-4 py-1.5 px-4 text-yellow-500 bg-yellow-100 dark:bg-yellow-700 dark:text-yellow-100 hover:bg-yellow-200 dark:hover:bg-yellow-600 rounded-full cursor-pointer transition duration-300 ease-in-out">
                                        <FontAwesomeIcon icon={faEdit} size="lg"/>
                                    </button>
                                    <button onClick={()=>{deleteClient(item.id)}} className="py-1.5 px-4 text-red-500 bg-red-100 dark:bg-red-700 dark:text-red-100 hover:bg-red-200 dark:hover:bg-red-600 rounded-full cursor-pointer transition duration-300 ease-in-out">
                                        <FontAwesomeIcon icon={faTrash} size="lg"/>
                                    </button>
                                    
                                </td>
                            </tr>
                        ))
                    }
                    
                </tbody>
            </table>
        </div>
    )
}