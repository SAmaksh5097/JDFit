const Footer = () => {
  return (
    <footer className="w-full">
        <div className='border-t border-white/10 px-4 sm:px-6 p-4 text-center' >
        <p className="text-sm sm:text-base text-white/70 mb-3 sm:mb-4">© {new Date().getFullYear()} JDFit.</p>
        <p className="text-sm sm:text-base text-white/70">WebApp made with ❤️ by <a href="https://samaksh-arzare.vercel.app" target="_blank" rel="noopener noreferrer" className='text-blue-400 font-semibold hover:text-blue-300 transition-colors duration-300'>Samaksh</a></p>
      </div>
    </footer>
  )
}

export default Footer
