const Footer = () => {
  return (
    <footer className="w-full mt-auto">
        <div className='border-t border-white/10 px-3 sm:px-4 md:px-6 py-4 sm:py-5 md:py-6 text-center text-xs sm:text-sm md:text-base' >
        <p className="text-white/70 mb-2 sm:mb-3">© {new Date().getFullYear()} JDFit. All rights reserved.</p>
        <p className="text-white/70">WebApp made with ❤️ by <a href="https://samaksh-arzare.vercel.app" target="_blank" rel="noopener noreferrer" className='text-blue-400 font-semibold hover:text-blue-300 transition-colors duration-300'>SAmaksh</a></p>
      </div>
    </footer>
  )
}

export default Footer
