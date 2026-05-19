import { UserPenIcon, Loader2Icon } from "lucide-react"
import ResumeCard from "../components/ResumeCard"
import { Link } from "react-router-dom"
import HeaderMin from "../components/HeaderMin"
import { useEffect, useState } from "react"
import { useAuth } from "@clerk/clerk-react"

const Dashboard = () => {
    const { userId } = useAuth()
    const [resumes, setResumes] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        if (!userId) return;

        const fetchResumes = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/resume/user/${userId}`);
                if (!response.ok) throw new Error('Failed to fetch resumes');
                const data = await response.json();
                setResumes(data);
            } catch (err) {
                console.error(err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchResumes();
    }, [userId])

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
                        {loading ? (
                            <div className="flex justify-center p-8 col-span-full">
                                <Loader2Icon className="h-8 w-8 animate-spin text-blue-500" />
                            </div>
                        ) : error ? (
                            <div className="text-red-500 col-span-full">{error}</div>
                        ) : resumes.length === 0 ? (
                            <div className="text-gray-400 col-span-full font-medium">No resumes found. Create one!</div>
                        ) : (
                            resumes.map((resume) => (
                                <ResumeCard key={resume.id} resume={{
                                    id: resume.id,
                                    name: resume.resume_name,
                                    company: resume.company_name,
                                    lastEdited: resume.created_at,
                                    match: resume.match || 0,
                                    status: "Ready to apply",
                                    jdSummary: "Generated Resume"
                                }} formatDate={formatDate} />
                            ))
                        )}
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Dashboard
