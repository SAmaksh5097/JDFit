import React from 'react'
import { motion } from 'framer-motion'

const Steps = () => {
    const points = [
        "Maintain your profile with your skills, experience, and education.",
        "Upload job description.",
        "Let AI tailor a perfect Résumé using relevant things from profile.",
        "Generate 100% consistent LaTeX code."
    ]

    const cardVariants = (index) => ({
        hidden: { 
            opacity: 0, 
            x: index % 2 === 0 ? -100 : 100,
            y: 20
        },
        visible: {
            opacity: 1,
            x: 0,
            y: 0,
            transition: {
                duration: 0.7,
                ease: "easeOut"
            }
        }
    })

    return (
        <div className="w-full py-20">
            <div className="w-full relative">
                {/* Connecting Thread */}
                <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500/0 via-blue-500/40 to-cyan-500/0 transform -translate-x-1/2" />
                
                <div className="space-y-12">
                    {points.map((point, index) => (
                        <motion.div
                            key={index}
                            variants={cardVariants(index)}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-80px" }}
                            className={`flex ${index % 2 === 0 ? 'justify-start' : 'justify-end'} px-6`}
                        >
                            <motion.div
                                whileHover={{ 
                                    y: -5,
                                    boxShadow: "0 20px 40px rgba(59, 130, 246, 0.15)"
                                }}
                                className="relative group w-full max-w-2xl"
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-xl blur-xl group-hover:blur-2xl transition-all duration-300 opacity-0 group-hover:opacity-100" />
                                
                                <div className="relative bg-gradient-to-br from-slate-900/60 to-slate-800/40 border border-slate-700/50 rounded-xl p-8 backdrop-blur-sm hover:border-blue-500/50 transition-all duration-300">
                                    <motion.div
                                        className="absolute -left-4 top-8 w-3 h-3 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500"
                                        whileHover={{ scale: 1.5 }}
                                        transition={{ type: "spring", stiffness: 300 }}
                                    />
                                    <p className="text-slate-300 leading-relaxed text-xl">{point}</p>
                                </div>
                            </motion.div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Steps
