import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom'
import Signup from './pages/Signup'
import Signin from './pages/Signin'
import Blogs from './pages/Blogs'
import Blog from './pages/Blog'
import Post from './pages/Post'
import { ToastContainer } from 'react-toastify'
import { useEffect } from 'react'

const App = ()=> {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  
  useEffect(() => {
    if(!token){
      navigate("/signup")
  }},[])

  return (
    <>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/" element={<Blogs />} />
          <Route path="/blog/:id" element={<Blog />} />
          <Route path='/post' element={<Post />}></Route>
        </Routes>
        <ToastContainer />
    </>
  )
}

export default App