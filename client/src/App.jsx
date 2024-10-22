import React from 'react'
import {BrowserRouter as Router , Routes , Route} from "react-router-dom"
import { useSelector } from 'react-redux'
import HeroSection from './components/Home/HomePage'
import PublicNavbar from './components/Navbar/PublicNavbar'
import RegistrationForm from './components/Users/RegistrationForm'
import LoginForm from './components/Users/LoginForm'
import PrivateNavbar from './components/Navbar/PrivateNavbar'


const App = () => {

  const {token} = useSelector((state) => state.auth)

  return (
    <Router>

      {/* will always showed on the screen as a layout */}
      {token ? <PrivateNavbar/> : <PublicNavbar/>}  

      <Routes>

        <Route path='/' element={<HeroSection/>}/>
        <Route path='/register' element={<RegistrationForm/>}/>
        <Route path='/login' element={<LoginForm/>}/>

      </Routes>

    </Router>
  )
}

export default App