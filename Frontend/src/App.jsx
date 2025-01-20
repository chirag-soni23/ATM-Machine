import React from 'react'
import { Routes,Route, BrowserRouter } from 'react-router-dom'
import Register from './pages/Register'
import Login from './pages/Login'
import Home from './pages/Home'
import Navbar from './components/Navbar'
import { UserData } from './context/UserContext'
import { Loading } from './components/Loading'
import Settings from './pages/Settings'
import { useThemeStore } from './context/useThemeStore'
import Profile from './pages/Profile'
import TransHistory from './pages/TransHistory'

const App = () => {
  const {isAuth,loading} = UserData()
    const { theme } = useThemeStore();
  
  return (

    <div data-theme={theme} className='h-full p-4'>
    {loading ? <Loading/> : <BrowserRouter> 
    {isAuth && <Navbar/>}
    <Routes>
      <Route path='/' element={isAuth ? <Home/> : <Login/>}/>
      <Route path='/profile' element={isAuth ? <Profile/> : <Login/>}/>
      <Route path='/settings' element={isAuth ? <Settings/> : <Login/>}/>
      <Route path='/transaction-history' element={isAuth ? <TransHistory/> : <Login/>}/>
      <Route path='/login' element={isAuth ? <Home/> : <Login/>}/>
      <Route path='/register' element={<Register/>}/>
    </Routes>
    </BrowserRouter>}
    </div>
  )
}

export default App