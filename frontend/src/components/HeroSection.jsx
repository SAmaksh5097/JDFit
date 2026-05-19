import { Link } from "react-router-dom"

const HeroSection = () => {
  return (
    <section className="w-full min-h-screen flex items-center justify-center relative overflow-hidden px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/10 via-transparent to-transparent"></div>
        <div className="w-full max-w-5xl py-16 sm:py-24 md:py-32 lg:py-40 text-center relative z-10">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-black leading-tight tracking-tight mb-6 sm:mb-8 lg:mb-10">
                <span className="text-white block">Tailor your resume</span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600 block mt-2 sm:mt-3">in one click</span>
            </h1>

            <p className="max-w-3xl mx-auto mb-8 sm:mb-10 lg:mb-12">
                <span className="text-base sm:text-lg md:text-xl text-gray-300 block leading-relaxed">
                    Just paste the JD & save your resume from getting rejected
                </span>
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link to="/dashboard" className="w-full sm:w-auto">
                    <button className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-br from-blue-600 to-blue-700 text-white rounded-lg sm:rounded-xl font-semibold text-base sm:text-lg transition-all duration-300 hover:from-blue-500 hover:to-blue-600 hover:shadow-2xl hover:shadow-blue-500/40 hover:-translate-y-1 active:translate-y-0">
                        Try Now
                    </button>
                </Link>
            </div>
        </div>
    </section>
  )
}

export default HeroSection
