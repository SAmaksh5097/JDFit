import logo from '../assets/logo.png'
import {Link} from "react-router-dom"
import UserProfile from './UserProfile'
const Header = () => {
  return (
    <header className="sticky top-0 z-50 bg-black/80 backdrop-blur-md border-b border-white/10" >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4 sm:py-5" >
          <Link to='/' className="flex items-center gap-3 sm:gap-4 group" >
            <div className="flex items-center gap-2 sm:gap-3" >
              <img src={logo} alt="logo" className="h-10 w-10 sm:h-12 sm:w-12 object-contain" />
              <h1 className="text-xl sm:text-2xl font-bold text-white hidden sm:block group-hover:text-blue-400 transition-colors duration-300">JDFit</h1>
            </div>
          </Link>
          <UserProfile/>
        </div>
      </div>
    </header>
  )
}

export default Header
