import Footer from "./components/Footer"
import Dashboard from "./pages/Dashboard"
import Homepage from "./pages/Homepage"
import ProfilePage from "./pages/ProfilePage"
import Create from "./pages/Create"
import PreviewPage from "./pages/PreviewPage"
import {Routes, Route} from "react-router-dom"
import {Analytics} from "@vercel/analytics/react"
const App = () => {
  return (
    <div className="bg-black min-h-screen text-white relative flex flex-col overflow-x-hidden">
      <Analytics/>
      <main className="flex-1 w-full">
        <Routes>
          <Route path="/" element={<Homepage/>} />
          <Route path="/profile" element={<ProfilePage/>} />
          <Route path="/dashboard" element={<Dashboard/>}/>
          <Route path="/create" element={<Create/>}/>
          <Route path="/preview/:id" element={<PreviewPage/>}/>
        </Routes>
      </main>
      <Footer/>
    </div>
  )
}

export default App
