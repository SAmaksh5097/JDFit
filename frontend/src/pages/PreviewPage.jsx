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
  const [latexCode, setLatexCode] = useState(initialLatexCode)
  const [loading, setLoading] = useState(!!id)
  const [error, setError] = useState(null)

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
          const response = await fetch(`http://localhost:5000/api/resume/${id}?userId=${userId}`);
          if (!response.ok) {
            if (response.status === 404) throw new Error("Resume not found or unauthorized");
            throw new Error("Failed to fetch resume");
          }
          
          const data = await response.json();
          setDocumentName(data.resume_name);
          setCompanyName(data.company_name);
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
      <div className="min-h-screen bg-black text-white p-6 max-w-[1600px] mx-auto flex flex-col">
        <div className="mb-8 flex items-center justify-between">
          <div className="flex flex-col gap-2">
            <input type="text" value={documentName} onChange={(e) => setDocumentName(e.target.value)} className="text-3xl font-bold mb-3 border p-0.5 rounded bg-transparent w-fit" />
            <input type="text" value={companyName} onChange={(e) => setCompanyName(e.target.value)} className="text-xl font-semibold text-gray-300 mb-2 border p-0.5 rounded bg-transparent w-fit" />
            <p className="text-gray-400 text-base max-w-4xl leading-relaxed">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Impedit possimus laudantium nisi modi aspernatur recusandae repellendus assumenda, perferendis quae quasi. 2-3 line AI generated summary of JD
            </p>
          </div>
          <div>
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Compile
            </button>
          </div>
        </div>
        <section className="grid grid-cols-1 lg:grid-cols-2 flex-grow gap-6 min-h-[75vh]">
            <LaTeX value={latexCode} onChange={setLatexCode} />
            <PdfView/>
        </section>
      </div>
    </>
  )
}

export default PreviewPage
