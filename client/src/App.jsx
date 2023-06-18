import { Routes, Route } from "react-router-dom"

import Landingpage from "./pages/Landingpage"

import Signup from "./pages/Signup"
import Login from "./pages/Login"

function App() {

    return (
        <div className="">
          <Routes>
            <Route path="/" element={<Landingpage />} />

            <Route path="/signup" element={<Signup />} />
            <Route path="/Login" element={<Login />} />
          </Routes>
        </div>
    )
}

export default App
