import HeaderMin from "../components/HeaderMin"
import LaTeX from "../components/LaTeX"
import PdfView from "../components/PdfView"
import { useState } from "react"
const PreviewPage = () => {
  const [documentName, setDocumentName] = useState("Untitled Document")
  return (
    <>
      <HeaderMin/>
      <div className="min-h-screen bg-black text-white p-6 max-w-[1600px] mx-auto flex flex-col">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <input type="text" value={documentName} onChange={(e) => setDocumentName(e.target.value)} className="text-3xl font-bold mb-3 border p-0.5 rounded" />
            <h2 className="text-xl font-semibold text-gray-300 mb-2">Company Name</h2>
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
            <LaTeX/>
            <PdfView/>
        </section>
      </div>
    </>
  )
}

export default PreviewPage
