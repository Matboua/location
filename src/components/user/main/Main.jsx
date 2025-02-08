import { Route, Routes } from 'react-router-dom';
import UserCars from '../cars/Cars'
export default function Main() {

    return (
        <main className="dark:text-gray-100 text-gray-900 dark:bg-gray-800 bg-gray-200 flex flex-col items-center flex-grow p-5">
            {/* Cars */}
            <Routes>
                <Route path='/' element={<UserCars />}/>
            </Routes>
        </main>
    );
}