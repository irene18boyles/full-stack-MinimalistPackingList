import './App.css'
import { Routes, Route } from 'react-router-dom'
import LandingPage from './components/LandingPage'
import Auth from './components/Auth'
import Dashboard from './components/Dashboard'
import TripDetails from './components/TripDetails'
import AddItem from './components/AddItem'

const App = () => {

  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path='/auth' element={<Auth />} />
        <Route path='/home' element={<Dashboard />} />
        <Route path='/trip/:tripName' element={<TripDetails />} />
        <Route path='/add-item/:tripName' element={<AddItem />} />
      </Routes>
    </>
  )
}

export default App
