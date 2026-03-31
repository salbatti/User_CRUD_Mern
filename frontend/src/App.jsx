import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'


const App = () => {
  return (
    <>
        {/* <h1>Main Page</h1> */}
        <Routes>
          <Route path='/home' element={<Home />} />
        </Routes>
    </>
  )
}

export default App