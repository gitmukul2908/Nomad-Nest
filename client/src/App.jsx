import { Routes, Route } from 'react-router-dom'
import './App.css'
import Login from './components/Login'
import Layout from './components/Layout'
import Home from './components/Home'
import Register from './components/Register'
import axios from 'axios'
import UserContextProvider from './contexts/UserContext'
import Account from './components/Account'
import Places from './components/Places'
import PlacesForm from './components/PlacesForm'
import PlacePage from './components/PlacePage'
import Bookings from './components/Bookings'
import BookingPage from './components/BookingPage'

axios.defaults.baseURL = 'https://nomad-nest-api.vercel.app'
axios.defaults.withCredentials = true

function App() {
  return (
    <div>
      <UserContextProvider>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route index element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/account' element={<Account />} />
            <Route path='/account/places' element={<Places />} />
            <Route path='/account/places/new' element={<PlacesForm />} />
            <Route path='/account/places/:id' element={<PlacesForm />} />
            <Route path='/places/:id' element={<PlacePage />} />
            <Route path='/account/bookings' element={<Bookings />} />
            <Route path='/account/bookings/:id' element={<BookingPage />} />
          </Route>
        </Routes>
      </UserContextProvider>
    </div>

  )
}

export default App
