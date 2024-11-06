import { useState } from 'react'
import './App.css'
import { Routes,Route } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import Landingpage from './Components/Landing/Landingpage'
import Dashh from './Components/DashBoard/Dashh'

function App() {

  return (
    <>
    <Routes>
      <Route path='/' element={<Landingpage/>}/>
      <Route path='/dash' element={<Dashh/>}/>
    </Routes>
    </>
  )
}

export default App
