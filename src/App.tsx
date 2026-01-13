import { Route, Routes } from 'react-router';
import { Dashboard, Login, Register } from './pages';
import { getLoggedInUser } from './utilities';
import { AppContext } from './context/AppContext';
import './App.css'
import { useState } from 'react';



const App = () => {

  const isLoggedIn = getLoggedInUser()

  const [selectedPlace, setSelectedPlace] = useState<google.maps.places.PlaceResult | null>(null);
  const [start_date, setStartDate] = useState<number | null>(null);
  const [end_date, setEndDate] = useState<number | null>(null)
  const [range, setRange] = useState<number>(5);


  return (
    <AppContext.Provider value={{

      selectedPlace,
      setSelectedPlace,

      range,
      setRange,

      start_date,
      end_date,
      setStartDate,
      setEndDate,


    }} >
      <Routes>
        <Route index element={isLoggedIn ? <Dashboard /> : <Login />} />
        {/* <Route  path="dashboard"  element={<Dashboard />} /> */}
        <Route path="register" element={<Register />} />
        <Route path="login" element={<Login />} />
      </Routes>
    </AppContext.Provider>
  )

}

export default App
