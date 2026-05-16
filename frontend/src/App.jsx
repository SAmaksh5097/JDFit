import Footer from "./components/Footer"
import Dashboard from "./pages/Dashboard"
import Homepage from "./pages/Homepage"
import ProfilePage from "./pages/ProfilePage"
import Create from "./pages/Create"
import PreviewPage from "./pages/PreviewPage"
import {Routes, Route} from "react-router-dom"
const App = () => {
  return (
    <div className="bg-black min-h-screen text-white relative flex flex-col">
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Homepage/>} />
          <Route path="/profile" element={<ProfilePage/>} />
          <Route path="/dashboard" element={<Dashboard/>}/>
          <Route path="/create" element={<Create/>}/>
          <Route path="/preview" element={<PreviewPage/>}/>
        </Routes>
      </main>
      <Footer/>
    </div>
  )
}

export default App
