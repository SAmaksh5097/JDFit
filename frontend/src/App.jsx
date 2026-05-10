import Footer from "./components/Footer"
import Header from "./components/Header"
import Homepage from "./pages/Homepage"
import {Routes, Route} from "react-router-dom"
const App = () => {
  return (
    <div className="bg-black min-h-screen text-white relative flex flex-col">
      <Header/>
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Homepage/>} />
        </Routes>
      </main>
      <Footer/>
    </div>
  )
}

export default App
