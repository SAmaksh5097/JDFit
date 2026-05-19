import { Link } from "react-router-dom"

const ResumeCard = ({ resume, formatDate }) => {
  return (
    <article className="group relative overflow-hidden rounded-2xl sm:rounded-3xl border border-slate-800 bg-gradient-to-b from-slate-900/95 to-slate-950 p-4 sm:p-5 shadow-xl shadow-black/20 transition duration-300 hover:-translate-y-1 hover:border-blue-500/40 hover:shadow-blue-950/30 hover:shadow-lg flex flex-col h-full">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-500/80 to-transparent" />

      <div className="flex-1 flex flex-col">
        <div className="flex items-start justify-between gap-3">
          <div className="space-y-1 min-w-0 flex-1">
            <h3 className="text-base sm:text-lg font-semibold text-white truncate">{resume.name}</h3>
            <p className="text-xs sm:text-sm text-slate-400 truncate">{resume.company}</p>
          </div>
        </div>

        <div className="mt-4 sm:mt-5 text-sm text-slate-300">
          <div className="rounded-xl sm:rounded-2xl border border-slate-800 bg-slate-900/60 p-2.5 sm:p-3">
            <p className="text-xs uppercase tracking-widest text-slate-500 font-medium">Last edited</p>
            <p className="mt-1 font-medium text-white text-xs sm:text-sm">{formatDate(resume.lastEdited)}</p>
          </div>
        </div>
      </div>

      <div className="mt-4 sm:mt-5 pt-4 sm:pt-5 border-t border-slate-800/50">
        <Link to={`/preview/${resume.id}`} className="w-full block">
          <button className="w-full text-xs sm:text-sm font-semibold text-blue-300 transition hover:text-blue-200 hover:bg-blue-500/10 active:bg-blue-500/20 rounded-lg px-3 py-2 sm:py-2.5">
            Open resume
          </button>
        </Link>
      </div>
    </article>
  )
}

export default ResumeCard
