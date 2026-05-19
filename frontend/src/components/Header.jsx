import logo from '../assets/logo.png'
import {Link} from "react-router-dom"
import UserProfile from './UserProfile'
const Header = () => {
  return (
    <header className="sticky top-2 z-50 shadow-2xl bg-gray-900 backdrop-blur-md border border-white/10 rounded-full px-4 sm:px-5 py-2 sm:py-3 mx-2 sm:mx-auto sm:w-[90%] md:w-[85%] lg:w-[75%]" >
        <div className="flex justify-between items-center" >
          <Link to='/' className="flex items-center gap-2 sm:gap-3 md:gap-4 group" >
            <div className="flex items-center gap-1 sm:gap-2 md:gap-3" >
              <img src={logo} alt="logo" className="h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 object-contain" />
              <h1 className="text-sm sm:text-lg md:text-xl lg:text-2xl font-bold text-white hidden sm:block group-hover:text-blue-400 transition-colors duration-300">JDFit</h1>
            </div>
          </Link>
          <UserProfile/>
        </div>
    </header>
  )
}

export default Header
