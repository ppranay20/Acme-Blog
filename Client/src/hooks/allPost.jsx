import axios from 'axios';
import { useEffect, useState } from 'react';

const useBlogs = () => {
    const [loading,setLoading] = useState(true);
    const [blogs,setBlogs] = useState([]);

    useEffect(() => {
        const res = axios.get("http://localhost:8787/api/blog/posts",{
            headers : {
                Authorization : localStorage.getItem("token")
            }
        })
        .then((res) => {
            setBlogs(res.data.posts);
            setLoading(false);
        })

    },[])

    return {
        loading,
        blogs
    }
}

export default useBlogs;