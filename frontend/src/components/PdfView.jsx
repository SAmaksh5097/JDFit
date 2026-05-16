const PdfView = () => {
  return (
    <div className="w-full h-full rounded-xl overflow-hidden border border-gray-800 shadow-card bg-white">
      <iframe title="PDF View" src="https://latexonline.cc/compile?text=%5Cdocumentclass%7Barticle%7D%5Cbegin%7Bdocument%7DHello%20World%5Cend%7Bdocument%7D" style={{ width: "100%", height: "100%", border: "none", background:"white" }}   />

    </div>
  )
}

export default PdfView
