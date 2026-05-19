import logo from '../assets/logo.png'
import {Link} from "react-router-dom"
import UserProfile from './UserProfile'
const HeaderMin = () => {
  return (
    <header className=" top-0 z-50 shadow-2xl bg-gray-900 backdrop-blur-md border-b border-white/10 self-center px-3 py-2 " >
        <div className="flex justify-between items-center" >
          <Link to='/' className="flex items-center gap-3 sm:gap-4 group" >
            <div className="flex items-center gap-2 sm:gap-3" >
              <img src={logo} alt="logo" className="h-7 w-7 sm:h-7 sm:w-7 object-contain" />
              <h1 className="text-md sm:text-lg font-bold text-white hidden sm:block group-hover:text-blue-400 transition-colors duration-300">JDFit</h1>
            </div>
          </Link>
          <UserProfile />
        </div>
    </header>
  )
}

export default HeaderMin
