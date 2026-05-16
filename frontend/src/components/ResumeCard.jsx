import { PencilIcon } from "lucide-react"
import { Link } from "react-router-dom"

const ResumeCard = ({ resume, formatDate }) => {
  return (
    <article className="group relative overflow-hidden rounded-3xl border border-slate-800 bg-linear-to-b from-slate-900/95 to-slate-950 p-5 shadow-xl shadow-black/20 transition duration-300 hover:-translate-y-1 hover:border-blue-500/40 hover:shadow-blue-950/30">
      <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-blue-500/80 to-transparent" />

      <div className="flex items-start justify-between gap-4">
        <div className="space-y-2">
          <div>
            <h3 className="text-lg font-semibold text-white">{resume.name}</h3>
            <p className="mt-1 text-sm text-slate-400">{resume.company}</p>
          </div>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-3 text-sm text-slate-300">
        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-3">
          <p className="text-xs uppercase tracking-[0.22em] text-slate-500">Last edited</p>
          <p className="mt-1 font-medium text-white">{formatDate(resume.lastEdited)}</p>
        </div>
        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-3">
          <p className="text-xs uppercase tracking-[0.22em] text-green-400">Match</p>
          <p className="mt-1 font-medium text-green-400">{resume.match}%</p>
        </div>
      </div>

      <div className="mt-5 rounded-2xl border border-slate-800 bg-slate-900/60 p-4">
        <p className="text-sm text-slate-300">{resume.jdSummary}</p>
      </div>

      <div className="mt-5 flex items-center justify-between">
        <Link to="/preview">
          <button className="text-sm font-semibold text-blue-300 transition hover:text-blue-200 hover:bg-blue-500/10 rounded-lg px-3 py-1">
            Open resume
          </button>
        </Link>
        {/* <button title="Edit Resume" className="rounded-full border-slate-700 p-1 text-sm text-slate-300 transition hover:border-slate-500 hover:bg-slate-800">
            <PencilIcon/>
        </button> */}
      </div>
    </article>
  )
}

export default ResumeCard
