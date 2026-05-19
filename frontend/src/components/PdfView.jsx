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
    <div className="w-full h-full bg-gray-900 flex flex-col">
      <div className="px-3 sm:px-4 py-2 border-b border-gray-700/50 bg-gray-900/50">
        <p className="text-xs sm:text-sm font-semibold text-gray-400 uppercase tracking-wider">PDF Preview</p>
      </div>
      <div className="flex-1 flex items-center justify-center p-4 sm:p-6">
        <button
          onClick={handleOpenInOverleaf}
          className="bg-gradient-to-br from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white font-bold py-2 sm:py-3 px-4 sm:px-6 rounded-lg shadow-md transition-all duration-300 flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-blue-500/25 text-sm sm:text-base"
        >
          <span>📄</span>
          <span className="whitespace-nowrap">Open in Overleaf</span>
        </button>
      </div>
    </div>
  )
}

export default PdfView
