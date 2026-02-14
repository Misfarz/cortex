import './App.css'

import { Routes, Route } from "react-router-dom";
import Moderate from './Pages/Moderate/Moderate';
import Landing from './Pages/Landing/Landing';
import Mainboard from './Pages/Mainboard/Mainboard';
import PublicRoute from './Utilities/guards/PublicRoute';
import ProtectedRoute from './Utilities/guards/ProtectedRoute';
import Documentation from './Pages/Mainboard/pages/Documentation';
import { Toaster } from "react-hot-toast";


function App() {


  return (
    <>

      <Toaster position="top-right" />
      <Routes>
        <Route path="/" element={<PublicRoute><Landing/></PublicRoute>} />
        <Route path="/moderate" element={<Moderate />} />
        <Route path='/cortex/dashboard' element={<ProtectedRoute><Mainboard/></ProtectedRoute>}/>
        <Route path='/cortex/docs' element={<ProtectedRoute><Documentation/></ProtectedRoute>}/>
      </Routes>
    

    </>
  )
}

export default App
