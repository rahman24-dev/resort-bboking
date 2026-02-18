import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './Pages/Home'
import Booking from './Pages/Booking'
import AdminLogin from "./Pages/AdminLogin"
import AdminDashboard from "./Pages/AdminDashboard"
import ProtectedRoute from "./Components/ProtectedRoute";
import StayDetails from "./pages/StayDetails";


function App() {
  return (
   <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/booking" element={<Booking />} />
      <Route path="/admin" element={<AdminLogin />} />
      <Route path="/admin/dashboard" element={<ProtectedRoute><AdminDashboard/></ProtectedRoute>} />
      <Route path='/stay/:id' element={<StayDetails/>}/>

    </Routes>
   </BrowserRouter>
  )
}

export default App