import { Route, Routes } from 'react-router-dom'
import './App.css'
import HomePage from './pages/HomePage'
import AddPlace from './pages/AddPlace'
import AuthPage from './pages/AuthPage'
import PlaceDetails from './pages/placeDetails'

function App() {
  return (
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/auth' element={<AuthPage />} />
      <Route path='/place/:id' element={<PlaceDetails />} />
      <Route path='/add-place' element={<AddPlace />} />
    </Routes>
  )
}

export default App
