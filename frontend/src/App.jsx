import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import './App.css'
import Login from './pages/Login'
import { Signup } from './pages/Signup'
import Catalog from './pages/Catalog'
import CreateProduct from './pages/CreateProducts'
import UpdateProduct from './pages/UpdateProduct'
import { useAuthStore } from '../store/auth'
import { useEffect } from 'react'

function App() {
  const{verify ,  isAuthenticated} = useAuthStore();
    useEffect(() => {
    verify();
    }, [])

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={isAuthenticated ? (<Catalog/>):(<Login />) } />
        <Route path="/create" element={isAuthenticated ? (<CreateProduct/>):(<Login />) } />
        <Route path="/update/:id" element={isAuthenticated ? (<UpdateProduct/>):(<Login />) } />
      </Routes>
    </Router>
    
  )
}

export default App
