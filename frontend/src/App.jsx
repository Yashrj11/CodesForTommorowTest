
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';


import ForgetPassword from './pages/ForgetPassword'
import ResetPassword from './pages/ResetPassword'

const App = () => {
  return (

    <>

      <Router>



        <Routes>


          <Route path="/forget-password" element={< ForgetPassword />} />
          <Route path="/reset-password/:token" element={< ResetPassword />} />
          <Route path="*" element={< Navigate to="/forget-password" />} />


        </Routes>

      </ Router>


    </>

  )
}

export default App