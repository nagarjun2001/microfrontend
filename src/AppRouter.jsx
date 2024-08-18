import React from 'react'
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom'
import Homepage from './components/Homepage'
import UserRegister from './Registration/UserRegister'
import UserLogin from './Login/UserLogin'
import UserHomepage from './User/UserHomepage'
import Regtype from './components/Regtype'
import CreatorLogin from './Login/CreatorLogin'
import CreatorRegister from './Registration/CreatorRegister'
import Login from './Login/Login'
import AdminLogin from './Login/Adminlogin'
import Dashboard from './Admin/Dashboard'
import Status from './Admin/Status'
import CreatorHome from './Creator/CreatorHome'
import BlockedVid from './User/BlockedVid'
import BlockedCat from './User/BlockedCat'

function AppRouter() {
  return (
    <div>
      <Router>
        <Routes>
            <Route path='/' element={<Homepage />}></Route>
            <Route path='/regtype' element={<Regtype />}></Route>
            <Route path='/login' element={<Login />}></Route>
            <Route path='/adminlogin' element={<AdminLogin />}></Route>
            <Route path='/dashboard' element={<Dashboard />}></Route>
            <Route path='/status' element={<Status />}></Route>

            <Route path='/UserReg' element={<UserRegister />}></Route>
            <Route path='/UserLogin' element={<UserLogin />}></Route>
            <Route path='/UserHomepage' element={<UserHomepage />}></Route>
            <Route path='/userblockvid' element={<BlockedVid />}></Route>
            <Route path='/userblockcat' element={<BlockedCat />}></Route>


            <Route path='/creatorlogin' element={<CreatorLogin />}></Route>
            <Route path='/creatorreg' element={<CreatorRegister/>}></Route>
            <Route path='/CreatorHomepage' element={<CreatorHome/>}></Route>
        </Routes>
      </Router>
    </div>
  )
}

export default AppRouter
