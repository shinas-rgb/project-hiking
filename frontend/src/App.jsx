import { Route, Routes } from 'react-router-dom'
import './App.css'
import HomePage from './pages/HomePage'
import AddPlacePage from './pages/AddPlacePage'
import AuthPage from './pages/AuthPage'
import PlacePage from './pages/PlacePage.jsx'
import ProfilePage from './pages/ProfilePage'
import AdminPage from './pages/AdminPage.jsx'
import SearchPage from './pages/SearchPage.jsx'
import ProtectedRoute from './route/ProtectedRoute'
import Account from './pages/profile/Account.jsx'
import Reviews from './pages/profile/Reviews.jsx'
import Profile from './pages/profile/Profile.jsx'
import Admin from './pages/admin/Admin.jsx'
import Users from './pages/admin/Users.jsx'
import Places from './pages/admin/Places.jsx'
import TestPage from './pages/TestPage.jsx'
import ContactPage from './pages/ContactPage.jsx'

function App() {
  return (
    <Routes>
      <Route element={<ProtectedRoute />}>
        <Route path='/profile' element={<ProfilePage />}>
          <Route index element={<Profile />} />
          <Route path='account' element={<Account />} />
          <Route path='reviews' element={<Reviews />} />
          <Route path='reviews' element={<Reviews />} />
        </Route>
        <Route path='/admin' element={<AdminPage />} >
          <Route index element={<Admin />} />
          <Route path='users/:id' element={<Users />} />
          <Route path='place/:id' element={<Places />} />
        </Route>
        <Route path='/add-place' element={<AddPlacePage />} />
      </Route>
      <Route path='/place/:id' element={<PlacePage />} />
      <Route path='/' element={<HomePage />} />
      <Route path='/auth' element={<AuthPage />} />
      <Route path='/search' element={<SearchPage />} />
      <Route path='/test' element={<TestPage />} />
      <Route path='/contact' element={<ContactPage />} />
    </Routes>
  )
}

export default App
