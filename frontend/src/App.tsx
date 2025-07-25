import { BrowserRouter,Routes,Route } from "react-router-dom"
import {Home} from "./pages/Home"
import {Signup} from "./pages/Signup"
import {Signin} from "./pages/Signin"
import { Toaster } from 'react-hot-toast'


function App() {
  return (
    <BrowserRouter>
    <Toaster/>
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/signup" element={<Signup/>} />
      <Route path="/signin" element={<Signin/>} />
    </Routes>
    </BrowserRouter>
  )
}

export default App
