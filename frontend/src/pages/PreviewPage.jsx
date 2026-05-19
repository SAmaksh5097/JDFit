import HeaderMin from "../components/HeaderMin"
import LaTeX from "../components/LaTeX"
import PdfView from "../components/PdfView"
import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { useAuth } from "@clerk/clerk-react"
import { Loader2Icon } from "lucide-react"

const PreviewPage = ({ initialLatexCode = "" }) => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { userId, isLoaded } = useAuth()
  
  const [documentName, setDocumentName] = useState("Untitled Document")
  const [companyName, setCompanyName] = useState("Untitled company")
  const [summary, setSummary] = useState("")
  const [latexCode, setLatexCode] = useState(initialLatexCode)
  const [loading, setLoading] = useState(!!id)
  const [error, setError] = useState(null)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    // If there's an ID in the URL, fetch it from DB
    if (id && isLoaded) {
      if (!userId) {
        navigate('/') // redirect if not logged in
        return
      }

      const fetchResume = async () => {
        try {
          // Pass userId in query params so backend can verify ownership
          const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/resume/${id}?userId=${userId}`);
          if (!response.ok) {
            if (response.status === 404) throw new Error("Resume not found or unauthorized");
            throw new Error("Failed to fetch resume");
          }
          
          const data = await response.json();
          setDocumentName(data.resume_name);
          setCompanyName(data.company_name);
          setSummary(data.summary || '');
          setLatexCode(data.latex_code);
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      }

      fetchResume()
    }
  }, [id, isLoaded, userId, navigate])

  const handleSave = async () => {
    if (!id || !userId) {
      alert('Resume ID or User ID not found.')
      return
    }

    setSaving(true)
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/resume/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId,
          resumeName: documentName,
          companyName,
          jobDescription: summary,
          latexCode
        })
      })

      if (!response.ok) {
        throw new Error('Failed to save resume.')
      }

      alert('Resume saved successfully!')
    } catch (err) {
      alert('Error saving resume: ' + (err.message || 'Unknown error'))
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <>
        <HeaderMin />
        <div className="flex justify-center items-center h-[80vh]">
          <Loader2Icon className="h-10 w-10 animate-spin text-blue-500" />
        </div>
      </>
    )
  }

  if (error) {
    return (
      <>
        <HeaderMin />
        <div className="flex flex-col justify-center items-center h-[80vh] text-white">
          <h2 className="text-2xl font-bold text-red-500 mb-2">Error</h2>
          <p>{error}</p>
          <button onClick={() => navigate('/dashboard')} className="mt-4 text-blue-400 hover:text-blue-300">
            Return to Dashboard
          </button>
        </div>
      </>
    )
  }

  return (
    <>
      <HeaderMin/>
      <div className="min-h-screen bg-black text-white px-3 sm:px-4 md:px-6 py-4 sm:py-6 md:py-8 flex flex-col max-w-full lg:max-w-7xl lg:mx-auto">
        <div className="mb-4 sm:mb-6 md:mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 pb-4 sm:pb-6 border-b border-gray-700/50">
          <div className="flex-1 flex flex-col gap-1 sm:gap-2 w-full sm:w-auto">
            <label className="text-xs text-gray-400 font-semibold uppercase tracking-wider">Document Name</label>
            <input 
              type="text" 
              value={documentName} 
              onChange={(e) => setDocumentName(e.target.value)} 
              className="text-xl sm:text-2xl md:text-3xl font-bold border border-gray-600 hover:border-blue-500/50 focus:border-blue-500 p-2 sm:p-3 rounded-lg bg-gray-900/50 focus:bg-gray-900 transition-all w-full outline-none focus:ring-2 focus:ring-blue-500/30" 
              placeholder="Document name..."
            />
            <label className="text-xs text-gray-400 font-semibold uppercase tracking-wider mt-3 sm:mt-4">Company</label>
            <input 
              type="text" 
              value={companyName} 
              onChange={(e) => setCompanyName(e.target.value)} 
              className="text-base sm:text-lg font-semibold text-gray-300 border border-gray-600 hover:border-blue-500/50 focus:border-blue-500 p-2 sm:p-3 rounded-lg bg-gray-900/50 focus:bg-gray-900 transition-all w-full outline-none focus:ring-2 focus:ring-blue-500/30" 
              placeholder="Company name..."
            />
          </div>
          <button 
            onClick={handleSave}
            disabled={saving}
            className="bg-gradient-to-br from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-2 sm:py-3 px-4 sm:px-6 rounded-lg transition-all whitespace-nowrap w-full sm:w-auto hover:shadow-lg hover:shadow-blue-500/25"
          >
            {saving ? 'Saving...' : 'Save'}
          </button>
        </div>

        {/* Job Description Summary */}
        <div className="mb-4 sm:mb-6 md:mb-8 pb-4 sm:pb-6 border-b border-gray-700/50">
          <label className="text-xs text-gray-400 font-semibold uppercase tracking-wider block mb-2 sm:mb-3">Job Description Summary</label>
          <p className="text-xs sm:text-sm text-gray-400 leading-relaxed whitespace-pre-wrap bg-gray-900/30 p-3 sm:p-4 rounded-lg border border-gray-700/30 max-h-32 sm:max-h-40 overflow-y-auto">
            {summary || 'No job description provided'}
          </p>
        </div>

        <section className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4 md:gap-6 flex-1 min-h-[50vh] sm:min-h-[60vh] md:min-h-[75vh]">
            <div className="rounded-lg sm:rounded-xl overflow-hidden border border-gray-700/50 min-h-[300px] sm:min-h-[400px]">
              <LaTeX value={latexCode} onChange={setLatexCode} />
            </div>
            <div className="rounded-lg sm:rounded-xl overflow-hidden border border-gray-700/50 min-h-[300px] sm:min-h-[400px]">
              <PdfView latexCode={latexCode} />
            </div>
        </section>
      </div>
    </>
  )
}

export default PreviewPage
