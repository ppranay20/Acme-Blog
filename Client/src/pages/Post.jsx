import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import {toast} from 'react-toastify'

const Post = () => {
    const [data,setData] = useState({
        title : "",
        content : "",
        category : ""
    });

    const navigate = useNavigate();

    const submitHandler = async (e) => {
        e.preventDefault()
        const res = await axios.post("http://localhost:8787/api/blog/create",{data},{
            headers : {
                Authorization : localStorage.getItem("token")
            }
        })

        console.log(res.data)

        if(res.data.success){
            navigate("/")
        }else{
            alert(res.data.message);
        }
    }


  return (
    <div className='w-[520px] h-full mt-20 m-auto'>
        <h1 className='text-center text-4xl font-bold'>Create A New Blog Post</h1>
        <p className='text-center text-gray-500 py-1 pr-8'>Fill out the form below to publish a new blog post.</p>
        <form onSubmit={submitHandler}>
            <div className='py-3 px-3 pl-3'>
                <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900">Title</label>
                <input type="text" onChange={(e) => {setData({...data,[e.target.name] : e.target.value})}} name='title' id="title" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Enter a title" required />
            </div>
            <div className='py-2 pb-6 px-3 pl-3'>
                <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-900">Category</label>
                <input type="text" onChange={(e) => {setData({...data,[e.target.name] : e.target.value})}} name='category' id="category" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Enter a category" required />
            </div>
            <div className='px-3'>
                <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900">Content</label>
                <textarea id="message" rows="4" onChange={(e) => {setData({...data,[e.target.name] : e.target.value})}} name='content'  className="block p-2.5 w-full text-sm text-gray-900 h-36 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500" placeholder="Write your blog post content here..."></textarea>
            </div>
            <button className='border bg-black text-white rounded-md py-3 px-5 text-sm mx-4 my-8'>Publish Post</button>
        </form>

    </div>
  )
}

export default Post