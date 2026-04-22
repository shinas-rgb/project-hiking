import { Route, Routes } from 'react-router-dom'
import './App.css'
import HomePage from './pages/HomePage'
import AddPlace from './pages/AddPlace'
import AuthPage from './pages/AuthPage'
import PlaceDetails from './pages/placeDetails'
import UserProfile from './pages/UserProfile'
import AdminPanel from './pages/AdminPanel'
import SearchPlaces from './pages/SearchPlaces.jsx'
import ProtectedRoute from './route/ProtectedRoute'
import Account from './components/profile/Account.jsx'
import Reviews from './components/profile/Reviews.jsx'
import Profile from './components/profile/Profile.jsx'
import Admin from './components/admin/Admin.jsx'
import Users from './components/admin/Users.jsx'
import Places from './components/admin/Places.jsx'

function App() {
  return (
    <Routes>
      <Route element={<ProtectedRoute />}>
        <Route path='/profile' element={<UserProfile />}>
          <Route index element={<Profile />} />
          <Route path='account' element={<Account />} />
          <Route path='reviews' element={<Reviews />} />
          <Route path='reviews' element={<Reviews />} />
        </Route>
        <Route path='/admin' element={<AdminPanel />} >
          <Route index element={<Admin />} />
          <Route path='users/:id' element={<Users />} />
          <Route path='place/:id' element={<Places />} />
        </Route>
        <Route path='/add-place' element={<AddPlace />} />
      </Route>
      <Route path='/place/:id' element={<PlaceDetails />} />
      <Route path='/' element={<HomePage />} />
      <Route path='/auth' element={<AuthPage />} />
      <Route path='/search' element={<SearchPlaces />} />
    </Routes>
  )
}

export default App
