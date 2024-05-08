import React from 'react'
import {Route,Routes} from 'react-router-dom'
import Register from './pages/Register'
import Login from './pages/Login'
import Home from './pages/Home'
import Header from './components/header'
import AddBlog from './pages/AddBlog'
import AddCateg from './pages/AddCateg'
import SingleBlog from './pages/SingleBlog'
import ProtectedRoutes from './services/ProtectedRoutes'
import Fotter from './components/Fotter'

const App = () => {
  return (
    <>
    <Header />
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />

        // Protected Routes 
        <Route path='/' element={<ProtectedRoutes />}>
        <Route path='/add-blog' element={<AddBlog />} />
        <Route path='/add-category' element={<AddCateg />} />
        <Route path='/blog/:id' element={<SingleBlog />} />
        <Route path='/' element={<Home />} />
        </Route>
      </Routes>
      <Fotter />
    </>
  )
}

export default App
