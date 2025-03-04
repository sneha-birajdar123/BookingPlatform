import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Signup from './components/public/Signup'
import Signin from './components/public/Signin'
import Parlour from './components/private/Parlour'

const App = () => {
  return (
    <>
    <Router>
      <Routes>
        <Route path='/signin' element={<Signin />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/dashboard' element={<Parlour />} />
      </Routes>
    </Router>
    </>
  )
}

export default App