import Editor from "@monaco-editor/react"

const LaTeX = ({ value, onChange }) => {
  return (
    <div className="w-full h-full rounded-xl overflow-hidden border border-gray-800 shadow-card bg-[#1e1e1e]">
      <Editor
        height="100%" 
        defaultLanguage="latex" 
        value={value} 
        onChange={onChange}
        theme="vs-dark"
        options={{
          wordWrap: 'on',
          minimap: { enabled: false },
          fontSize: 14
        }}
      />
      
    </div>
  )
}

export default LaTeX
