import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import Steps from "./Steps"
const HeroSection = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: -50, x: -50 },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      transition: { 
        duration: 0.8,
        repeat: Infinity,
        repeatDelay: 3,
        ease: "easeOut",
      },
    },
  }

  const itemVariantsRight = {
    hidden: { opacity: 0, y: -50, x: 50 },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      transition: { 
        duration: 0.8,
        repeat: Infinity,
        repeatDelay: 3,
        ease: "easeOut",
      },
    },
  }

  const pulseVariants = {
    pulse: {
      opacity: [0.6, 1, 0.6],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  }

  return (
    <section className="w-full min-h-screen flex flex-col justify-evenly">
        <div className="flex flex-col lg:flex-row justify-center lg:justify-around items-center min-h-screen gap-6 lg:gap-0 px-4 py-8 lg:py-0">
            <div className="w-full lg:w-auto flex flex-col justify-center">
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-bold leading-tight">
                    One place to
                    <br></br>
                    manage all your 
                    <br></br>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600">
                        Résumés
                    </span>
                    <br></br>

                    
                </h1>
                <Link to="/dashboard">
                    <button className="text-lg sm:text-xl md:text-2xl mt-5 bg-gradient-to-r from-blue-400 to-blue-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg transition duration-300 hover:shadow-lg w-fit">
                        Try Now
                    </button>
                </Link>
            </div>
            <motion.div
              className="w-full sm:w-80 md:w-96 bg-white border border-gray-300 rounded-lg shadow-xl p-4 sm:p-6"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              {/* Resume Template */}
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="space-y-4"
              >
                {/* Header/Name Section */}
                <motion.div variants={itemVariants} className="space-y-2">
                  <motion.div className="h-6 w-32 bg-gray-300 rounded" animate="pulse" variants={pulseVariants}></motion.div>
                  <motion.div className="h-3 w-48 bg-gray-200 rounded" animate="pulse" variants={pulseVariants}></motion.div>
                  <motion.div className="h-3 w-40 bg-gray-200 rounded" animate="pulse" variants={pulseVariants}></motion.div>
                </motion.div>

                {/* Contact Info Section */}
                <motion.div variants={itemVariantsRight} className="border-t pt-3">
                  <div className="space-y-2">
                    <motion.div className="h-2 w-24 bg-gray-300 rounded" animate="pulse" variants={pulseVariants}></motion.div>
                    <motion.div className="h-2 w-32 bg-gray-200 rounded" animate="pulse" variants={pulseVariants}></motion.div>
                    <motion.div className="h-2 w-28 bg-gray-200 rounded" animate="pulse" variants={pulseVariants}></motion.div>
                  </div>
                </motion.div>

                {/* Summary/About Section */}
                <motion.div variants={itemVariants} className="border-t pt-3">
                  <motion.div className="h-3 w-20 bg-gray-300 rounded mb-2" animate="pulse" variants={pulseVariants}></motion.div>
                  <div className="space-y-1">
                    <motion.div className="h-2 w-full bg-gray-200 rounded" animate="pulse" variants={pulseVariants}></motion.div>
                    <motion.div className="h-2 w-full bg-gray-200 rounded" animate="pulse" variants={pulseVariants}></motion.div>
                    <motion.div className="h-2 w-3/4 bg-gray-200 rounded" animate="pulse" variants={pulseVariants}></motion.div>
                  </div>
                </motion.div>

                {/* Experience/Skills Section */}
                <motion.div variants={itemVariantsRight} className="border-t pt-3">
                  <motion.div className="h-3 w-24 bg-gray-300 rounded mb-2" animate="pulse" variants={pulseVariants}></motion.div>
                  <div className="space-y-2">
                    <motion.div className="h-2 w-full bg-gray-200 rounded" animate="pulse" variants={pulseVariants}></motion.div>
                    <motion.div className="h-2 w-full bg-gray-200 rounded" animate="pulse" variants={pulseVariants}></motion.div>
                  </div>
                </motion.div>

                {/* Skills Points */}
                <motion.div variants={itemVariants} className="border-t pt-3">
                  <motion.div className="h-3 w-16 bg-gray-300 rounded mb-2" animate="pulse" variants={pulseVariants}></motion.div>
                  <div className="flex flex-wrap gap-2">
                    <motion.div className="h-6 w-16 bg-gray-300 rounded-full" animate="pulse" variants={pulseVariants}></motion.div>
                    <motion.div className="h-6 w-20 bg-gray-300 rounded-full" animate="pulse" variants={pulseVariants}></motion.div>
                    <motion.div className="h-6 w-14 bg-gray-300 rounded-full" animate="pulse" variants={pulseVariants}></motion.div>
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
        </div>
        <div>
            <Steps/>
        </div>

        
    </section>
  )
}

export default HeroSection
