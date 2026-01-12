import { Route, Routes } from 'react-router';
import { Dashboard, Login, Register } from './pages';
import { getLoggedInUser } from './utilities';
import './App.css'



const App = () => {

  const isLoggedIn = getLoggedInUser()
  
  return (
    <Routes>
      <Route index element={isLoggedIn ? <Dashboard /> : <Login />} />
      {/* <Route  path="dashboard"  element={<Dashboard />} /> */}
      <Route path="register" element={<Register />} />
      <Route path="login" element={<Login />} />
    </Routes>
  )

}

export default App
