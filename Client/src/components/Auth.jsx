import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Auth = ({type}) => {
    const navigate = useNavigate();
    const [data, setData] = useState({
        name: "",
        username: "",
        password: ""
    });

    const onChangeHandler = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        setData({...data,[name] : value});
    }

    const fetchData = async () => {
        try {
            const res = await axios.post(`http://localhost:8787/api/user/${type === "signup" ? "signup" : "signin"}`, data);
            const token = res.data.token;
            localStorage.setItem("token", token);
            localStorage.setItem("authorName",data.username);
            navigate("/");
        } catch(e) {
            alert("Error while signing up")
            // alert the user here that the request failed
        }
    }
    
    return <div className="h-screen flex justify-center flex-col pb-20">
        <div className="flex justify-center">
            <div>
                <div className="px-10 ">
                    <div className="text-3xl font-extrabold py-2">
                        {type === "signup" ? "Create An Account" : "Login to Access"}
                    </div>
                    <div className="text-slate-500">
                        {type === "signin" ? "Don't have an account?" : "Already have an account?" }
                        <Link className="pl-2 underline" to={type === "signin" ? "/signup" : "/signin"}>
                            {type === "signin" ? "Sign up" : "Sign in"}
                        </Link>
                    </div>
                </div>
                <div className="pt-4">
                    {type === "signup" ? <div>
                        <label className="block mb-2 text-sm text-black font-semibold pt-4">Username</label>
                        <input onChange={onChangeHandler} type="text" name="username" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Enter Your Username" required />
                        </div>
                     : <></>
                    }
                    <label className="block mb-2 text-sm text-black font-semibold pt-4">Email</label>
                    <input onChange={onChangeHandler} type="text" name="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Enter Your Email" required />
                    <label className="block mb-2 text-sm text-black font-semibold pt-4">Password</label>
                    <input onChange={onChangeHandler} type="password" name="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Enter Your Password" required />
                    <button onClick={fetchData} type="button" className="mt-8 w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">{type === "signup" ? "Sign up" : "Sign in"}</button>
                </div>
            </div>
        </div>
    </div>
}

export default Auth;