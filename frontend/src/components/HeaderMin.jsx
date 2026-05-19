import logo from '../assets/logo.png'
import {Link} from "react-router-dom"
import UserProfile from './UserProfile'
const HeaderMin = () => {
  return (
    <header className="w-full top-0 z-50 shadow-lg bg-gray-900 backdrop-blur-md border-b border-white/10" >
        <div className="flex justify-between items-center px-3 sm:px-4 md:px-6 py-2.5 sm:py-3" >
          <Link to='/' className="flex items-center gap-2 sm:gap-3 group" >
            <div className="flex items-center gap-1.5 sm:gap-2" >
              <img src={logo} alt="logo" className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 object-contain" />
              <h1 className="text-xs sm:text-sm md:text-base font-bold text-white hidden sm:block group-hover:text-blue-400 transition-colors duration-300">JDFit</h1>
            </div>
          </Link>
          <UserProfile />
        </div>
    </header>
  )
}

export default HeaderMin
