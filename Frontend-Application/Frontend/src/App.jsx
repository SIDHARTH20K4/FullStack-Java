import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './Layout/Navbar'
import Home from './Pages/Home'
import AddUser from './Users/AddUser'
import EditUser from './Users/EditUser'
import ViewUser from './Users/ViewUser'

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/users" element={<Home />} />
        <Route path="/add-user" element={<AddUser />} />
        <Route path="/edit-user" element={<EditUser />} />
        <Route path="/view-user" element={<ViewUser />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
