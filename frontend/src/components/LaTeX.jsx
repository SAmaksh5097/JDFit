import Editor from "@monaco-editor/react"

const LaTeX = ({ value, onChange }) => {
  return (
    <div className="w-full h-full overflow-hidden bg-[#1e1e1e] flex flex-col">
      <div className="px-3 sm:px-4 py-2 border-b border-gray-700/50 bg-gray-900/50">
        <p className="text-xs sm:text-sm font-semibold text-gray-400 uppercase tracking-wider">LaTeX Editor</p>
      </div>
      <Editor
        height="100%" 
        defaultLanguage="latex" 
        value={value} 
        onChange={onChange}
        theme="vs-dark"
        options={{
          wordWrap: 'on',
          minimap: { enabled: false },
          fontSize: 12,
          lineNumbersMinChars: 2,
          padding: { top: 12, bottom: 12 }
        }}
      />
    </div>
  )
}

export default LaTeX
