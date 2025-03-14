import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import Profile from './pages/Profile'
import AboutUs from './pages/AboutUs'
import Header from './components/Header'
import PrivateRoute from './components/PrivateRoute'

export default function App() {
  return <BrowserRouter>
    <Header/>
    <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/sign-in' element={<SignIn/>} />
      <Route path='/sign-up' element={<SignUp/>} />
      <Route element={<PrivateRoute/>}>
      <Route path='/profile' element={<Profile/>} />
      </Route>
      <Route path='/about-us' element={<AboutUs/>} />
    </Routes>
  </BrowserRouter>
}
