import { Link } from "react-router-dom";

export default function Footer() {
    return (
        <footer className="dark:text-gray-100 text-gray-900 dark:bg-gray-900 bg-white flex justify-between p-5">
            <p>&copy; {new Date().getFullYear()} All Rights Reserved | Location</p>
            <div className="flex gap-3">
                <Link to="/admin/cars">Admin</Link>
                <Link to="/">User</Link>
            </div>
        </footer>
    )
}