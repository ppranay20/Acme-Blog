import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import Appbar from '../components/Appbar';

const Blog = () => {
  const [data,setData] = useState();
  const {id} = useParams()
  const [loading,setLoading] = useState(true);

  useEffect(() => {
    const res = axios.get(`http://localhost:8787/api/blog/get/${id}`,{
      headers : {
        Authorization : localStorage.getItem("token")
      }
    }).then((res) => {
      setData(res.data.post);
      setLoading(false);
    })
  },[])

  if(loading){
    return(<div>loading</div>)
  }

  const dateObj = new Date(data.PublishedOn);
  const newDate = dateObj.toDateString().slice(4);

  return (
    <div>
      <Appbar></Appbar>
      <div className='w-[600px] m-auto mt-10'>
        <h2 className='font-bold text-4xl '>{data.title}</h2>
        <div className='flex gap-5 py-6 items-center text-gray-500'>
        <div className={"relative inline-flex items-center justify-center overflow-hidden bg-gray-600 rounded-full w-10 h-10"}>   
              <span className={"text-xl font-extralight text-gray-600 dark:text-gray-300"}>
                  {data.Author.username[0]}
              </span>
          </div>
          <div>
            <p>{data.Author.username}</p>
            <div className='flex gap-3 py-2 text-sm'>
              <p>{`${Math.ceil(data.content.length / 100)} minute(s) read`}</p>
              <div className="flex justify-center flex-col ">
                    <div className="h-1 w-1 rounded-full bg-slate-500"></div>
              </div>
              <p>Posted On {newDate}</p>
            </div>
          </div>
        </div>
        <hr />
        <div className='py-6'>
          <p>{data.content}</p>
        </div>
      </div>
    </div>
  )
}

export default Blog;