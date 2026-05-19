import { Link } from "react-router-dom"

const HeroSection = () => {
  return (
    <section className="w-full min-h-screen flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/10 via-transparent to-transparent"></div>
        <div className="h-screen mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-32 lg:py-40 text-center relative z-10 ">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-black leading-tight tracking-tight mb-8">
                <span className="text-white">Tailor your resume</span>

                <br className="hidden sm:block" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600 mt-2 inline-block">in one click</span>
            </h1>

            <p className="max-w-3xl mx-auto mb-12">
                <span className="text-lg sm:text-xl text-gray-300">
                    Just upload the JD & save your resume from getting rejected
                </span>
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link to="/dashboard">
                    <button className="p-4 bg-blue-600 text-white rounded-xl font-semibold text-base sm:text-lg transition-all duration-300 hover:bg-blue-700 hover:shadow-2xl hover:shadow-blue-500/40 ">
                        Try Now
                    </button>
                </Link>
            </div>
        </div>
    </section>
  )
}

export default HeroSection
