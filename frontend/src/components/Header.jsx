import logo from '../assets/logo.png'
import {Link} from "react-router-dom"
import UserProfile from './UserProfile'
const Header = () => {
  return (
    <header className="sticky top-1 z-50 shadow-2xl bg-gray-900 backdrop-blur-md border border-white/10 w-[75%] self-center rounded-full px-5 py-3 " >
        <div className="flex justify-between items-center" >
          <Link to='/' className="flex items-center gap-3 sm:gap-4 group" >
            <div className="flex items-center gap-2 sm:gap-3" >
              <img src={logo} alt="logo" className="h-10 w-10 sm:h-12 sm:w-12 object-contain" />
              <h1 className="text-xl sm:text-2xl font-bold text-white hidden sm:block group-hover:text-blue-400 transition-colors duration-300">JDFit</h1>
            </div>
          </Link>
          <UserProfile/>
        </div>
    </header>
  )
}

export default Header
