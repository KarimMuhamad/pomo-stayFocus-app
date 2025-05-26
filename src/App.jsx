import { Route, Routes } from 'react-router'
import './App.css'
import Home from './pages/Home'
import Setting from './pages/Setting'
import Layout from './components/Layout'
import Statistics from './pages/Stats'
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

function App() {
  return (
    <Routes>
      <Route path='/login' element={<Login/>} />
      <Route path='/register' element={<Register/>} />

      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route element={<ProtectedRoute />} >
          <Route path="/setting" element={<Setting />} />
          <Route path="/stats" element={<Statistics />} />
        </Route>
      </Route>
    </Routes>
  )
}

export default App
