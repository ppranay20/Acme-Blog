import React, { useState } from 'react'
import BlogCard from '../components/BlogCard'
import Appbar from '../components/Appbar'
import useBlogs from '../hooks/allPost'
import BlogsSkeleton from '../components/BlogsSkeleton'

const Blogs = () => {
  const {loading,blogs} = useBlogs();
  const [categories,setCategories] = useState("")

  if(loading){
    return(  
      <div>
        <Appbar></Appbar>
        <div className='mt-2'>
          <BlogsSkeleton></BlogsSkeleton>
          <BlogsSkeleton></BlogsSkeleton>
          <BlogsSkeleton></BlogsSkeleton>
        </div>
      </div>
    )
  }

  console.log(categories);

  return (
            
    <div>
        <Appbar></Appbar>
        <div className='flex'>
          <div className='w-[250px] border-r h-[100vh]'>
            <h1 className='text-center text-xl pb-5 mt-10'>Categories</h1>
            <div className='flex flex-col'>
              <button onClick={() => setCategories("")} className='text-sm bg-gray-200 rounded-lg py-2 px-2 mx-10 my-2 hover:bg-black hover:text-white focus:bg-black focus:text-white'>All</button>
              <button onClick={() => setCategories("Marketing")} className='text-sm bg-gray-200 rounded-lg py-2 px-2 mx-10 my-2 hover:bg-black hover:text-white focus:bg-black focus:text-white'>Marketing</button>
              <button onClick={() => setCategories("Finance")} className='text-sm bg-gray-200 rounded-lg py-2 px-2 mx-10 my-2 hover:bg-black hover:text-white focus:bg-black focus:text-white'>Finance</button>
              <button onClick={() => setCategories("Web Development")} className='text-sm bg-gray-200 rounded-lg py-2 px-2 mx-10 my-2 hover:bg-black hover:text-white focus:bg-black focus:text-white'>Web Devlopment</button>
              <button onClick={() => setCategories("IT")} className='text-sm bg-gray-200 rounded-lg py-2 px-2 mx-10 my-2 hover:bg-black hover:text-white focus:bg-black focus:text-white'>IT</button>
            </div>
          </div>
          <div className='mx-10 my-6'>
            {
              blogs.map((item,index) => {
                if(categories.length>0){
                  return(
                    item.category === categories ?
                    <BlogCard key={index} id={item.id} content={item.content} authorName={item.Author.username} title={item.title} publishedDate={item.PublishedOn}></BlogCard> : <></>
                  )
                }
                else{
                  return(
                    <BlogCard key={index} id={item.id} content={item.content} authorName={item.Author.username} title={item.title} publishedDate={item.PublishedOn}></BlogCard>
                  )
                }
              })
            }
          </div>
        </div>
    </div>
  )
}

export default Blogs