import { UserPenIcon } from "lucide-react"
import ResumeCard from "../components/ResumeCard"
import { Link } from "react-router-dom"
import HeaderMin from "../components/HeaderMin"

const Dashboard = () => {
    const resumes = [
        {
            id: 1,
            name: "Samaksh Resume",
            company: "Google",
            lastEdited: "2026-06-01",
            match: 85,
            status: "Ready to apply",
            jdSummary: "Experienced software engineer with a strong background in full-stack development, specializing in React and Node.js."
        },
        {
            id: 2,
            name: "Jane Smith's Resume",
            company: "Innovate Inc",
            lastEdited: "2026-05-28",
            match: 90,
            status: "High impact",
            jdSummary: "Creative product designer with a passion for user experience and a proven track record of delivering innovative solutions." 
        },
        {
            id: 3,
            name: "Product Designer Resume",
            company: "Northstar Labs",
            lastEdited: "2026-05-23",
            match: 78,
            status: "Needs tailoring",
            jdSummary: "Skilled product designer with expertise in user-centered design, prototyping, and a strong portfolio of successful projects."
        },
    ]

    const formatDate = (value) =>
        new Date(value).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
        })

    return (
        <div>
            <HeaderMin/>

            <section className="relative overflow-hidden px-4 py-8 sm:px-6 lg:px-8">
                <div
                    className="pointer-events-none absolute inset-0 -z-10"
                    style={{
                        backgroundImage:
                            "radial-gradient(circle at top left, rgba(59,130,246,0.22), transparent 30%), radial-gradient(circle at top right, rgba(14,165,233,0.16), transparent 28%), linear-gradient(180deg, rgba(2,6,23,1) 0%, rgba(3,7,18,1) 100%)",
                    }}
                />

                <div className="mx-auto max-w-7xl space-y-8">
                    <div className="rounded-3xl border border-slate-800/80 bg-slate-950/80 p-6 shadow-2xl shadow-blue-950/30 backdrop-blur">
                        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
                            <div className="max-w-2xl space-y-4">
                                <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-blue-300">
                                    Dashboard
                                </div>
                                <div className="h-1" />
                            </div>

                            <div className="flex flex-wrap gap-3 items-center">
                                <Link to="/profile" title="Edit Profile">
                                    <UserPenIcon className="h-7 w-7 "/>
                                </Link>
                                <Link to="/create">
                                    <button className="rounded-full bg-blue-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-500/30 hover:bg-blue-400">
                                        New Resume
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                        {resumes.length === 0?(
                            <Skeleton variant="rectangular" width="100%" height="200px" />
                        ):(
                            resumes.map((resume)=>{
                                <ResumeCard key={resume.id} resume={resume} formatDate={formatDate} />
                            })
                        )}
                        {resumes.map((resume) => (
                            <ResumeCard key={resume.id} resume={resume} formatDate={formatDate} />
                        ))}
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Dashboard
