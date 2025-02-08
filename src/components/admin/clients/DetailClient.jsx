import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

export default function DetailClient() {
    const {clientid} = useParams()
    const [client, setClient] = useState('')
    useEffect(() => {
        fetch('http://localhost:8000/clients/' + clientid)
        .then(res => res.json())
            .then(data => {
                setClient(data)
            });
        }, [clientid]);
    return(
            <div className="max-w-sm mx-auto bg-white dark:bg-gray-900 rounded-lg overflow-hidden shadow-lg">
                <div className="px-4 py-6">
                    <div className="text-center my-4">
                            <FontAwesomeIcon className="px-7 p-6 rounded-full border-4 border-white dark:border-gray-500 mx-auto my-4 text-blue-800" icon={faUser} size="5x"/>
                        <div className="py-2">
                            <table className="border-3 dark:border-gray-700">
                                <tbody>
                                    <tr>
                                    <th className="py-2 px-5 text-left border-3 dark:border-gray-700">Id</th>
                                    <td className="py-2 px-5 border-3 dark:border-gray-700">{client.id}</td>
                                </tr>
                                <tr>
                                    <th className="py-2 px-5 text-left border-3 dark:border-gray-700">First Name</th>
                                    <td className="py-2 px-5 border-3 dark:border-gray-700">{client.first_name}</td>
                                </tr>
                                <tr>
                                    <th className="py-2 px-5 text-left border-3 dark:border-gray-700">last Name</th>
                                    <td className="py-2 px-5 border-3 dark:border-gray-700">{client.last_name}</td>
                                </tr>
                                <tr>
                                    <th className="py-2 px-5 text-left border-3 dark:border-gray-700">Phone</th>
                                    <td className="py-2 px-5 border-3 dark:border-gray-700">{client.phone}</td>
                                </tr>
                                <tr>
                                    <th className="py-2 px-5 text-left border-3 dark:border-gray-700">Email</th>
                                    <td className="py-2 px-5 border-3 dark:border-gray-700">{client.email}</td>
                                </tr>
                                <tr>
                                    <th className="py-2 px-5 text-left border-3 dark:border-gray-700">City</th>
                                    <td className="py-2 px-5 border-3 dark:border-gray-700">{client.city}</td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
    )
}