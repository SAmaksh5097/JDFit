const PdfView = ({ latexCode = '' }) => {
  const handleOpenInOverleaf = (e) => {
    e.preventDefault()
    
    const form = document.createElement('form')
    form.action = 'https://www.overleaf.com/docs'
    form.method = 'post'
    form.target = '_blank'
    
    const textarea = document.createElement('textarea')
    textarea.name = 'snip'
    textarea.value = latexCode || '\\documentclass{article}\n\\begin{document}\nNo LaTeX code provided\n\\end{document}'
    
    form.appendChild(textarea)
    document.body.appendChild(form)
    form.submit()
    document.body.removeChild(form)
  }

  return (
    <div className="w-full h-full rounded-xl overflow-hidden border border-gray-800 shadow-card bg-gray-900 flex items-center justify-center">
      <button
        onClick={handleOpenInOverleaf}
        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg shadow-md transition-all duration-300 flex items-center justify-center gap-2"
      >
        Open in Overleaf
      </button>
    </div>
  )
}

export default PdfView
