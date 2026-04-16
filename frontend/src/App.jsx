import { Route, Routes } from 'react-router-dom'
import './App.css'
import HomePage from './pages/HomePage'
import AddPlace from './pages/AddPlace'
import AuthPage from './pages/AuthPage'
import PlaceDetails from './pages/placeDetails'
import UserProfile from './components/UserProfile'
import AdminPanel from './pages/AdminPanel'
import ProtectedRoute from './route/ProtectedRoute'
import SearchPlaces from './components/SearchPlaces.jsx'

function App() {
  return (
    <Routes>
      <Route element={<ProtectedRoute />}>
        <Route path='/profile' element={<UserProfile />} />
        <Route path='/admin' element={<AdminPanel />} />
        <Route path='/place/:id' element={<PlaceDetails />} />
        <Route path='/add-place' element={<AddPlace />} />
      </Route>
      <Route path='/' element={<HomePage />} />
      <Route path='/auth' element={<AuthPage />} />
      <Route path='/search' element={<SearchPlaces />} />
    </Routes>
  )
}

export default App
