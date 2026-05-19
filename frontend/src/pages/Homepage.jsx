import Features from "../components/Features"
import Header from "../components/Header"
import HeroSection from "../components/HeroSection"

const Homepage = () => {
  return (
    <div className="min-h-screen w-full flex flex-col ">
        <Header/>
        <HeroSection/>
        <Features/>
    </div>
  )
}

export default Homepage
