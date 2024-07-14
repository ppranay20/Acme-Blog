import { Link, useNavigate } from "react-router-dom"
import { LuMountain } from "react-icons/lu";
import { useState } from "react";

const Appbar = () => {
    const [showLogout,setShowLogout] = useState(false);
    const navigate = useNavigate()

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("authorName");
        navigate('/signup')
    }

    return <div className="border-b flex justify-between px-10 py-3 items-center">
        <Link to={"/"} className="flex items-center gap-2 font-bold" prefetch={false}>
            <LuMountain className="h-6 w-6" />
            <span>Acme Blog</span>
        </Link>
        <div className="mx-6">
            <Link to={`/post`}>
                <button type="button" className="mr-4 text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 ">Publish</button>
            </Link>
            <div onClick={() => setShowLogout(!showLogout)} className="relative inline-flex items-center justify-center overflow-hidden bg-gray-600 rounded-full w-10 h-10 cursor-pointer">
                <span className={"text-md font-extralight text-gray-600 dark:text-gray-300"}>
                    {localStorage.getItem("authorName")[0]}
                </span>
            </div> 
            {
                showLogout ? <button onClick={handleLogout} type="button" class="absolute top-14 right-12 text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-3 py-1.5  mb-2  dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">Logout</button>
                : <></>
            }
        </div>
    </div>
}

export default Appbar;