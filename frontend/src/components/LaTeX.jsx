import Editor from "@monaco-editor/react"
const LaTeX = () => {
  return (
    <div className="w-full h-full rounded-xl overflow-hidden border border-gray-800 shadow-card bg-[#1e1e1e]">
      <Editor
        height="100%" defaultLanguage="latex" defaultValue="Your LaTeX code" theme="vs-dark"
      />
      
    </div>
  )
}

export default LaTeX
