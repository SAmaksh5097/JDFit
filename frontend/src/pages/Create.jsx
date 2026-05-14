import { ArrowUpIcon } from "lucide-react";
import { useState } from "react";

const Create = () => {
  const [jdText, setJdText] = useState("");
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");

  const handleFileChange = (e) => {
    setError("");
    const files = e.target.files;
    if (!files || files.length === 0) return;
    if (files.length > 1) {
      setError("Only one file is allowed.");
      return;
    }
    const f = files[0];
    const allowedTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];
    if (!allowedTypes.includes(f.type) && !/\.(pdf|doc|docx)$/i.test(f.name)) {
      setError("Unsupported file type. Use PDF or Word documents.");
      return;
    }
    setFile(f);
  };

  const removeFile = () => {
    setFile(null);
    setError("");
    // also reset the input value if needed (uncontrolled input)
    const input = document.getElementById("jd-file-input");
    if (input) input.value = "";
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!jdText && !file) {
      setError("Please paste a JD or attach a file before sending.");
      return;
    }
    // For now we just log the payload. Replace with real submit logic later.
    console.log("Submitting JD:", { jdText, file });
    setError("");
  };

  return (
    <section className="max-w-3xl mx-auto p-6">
      <div className="bg-gray-900 p-6 rounded-lg shadow-md">
        <form onSubmit={handleSubmit} className="space-y-4">
          <textarea
            placeholder="Paste the JD here..."
            className="w-full min-h-[10rem] bg-gray-800 text-white p-4 rounded-lg resize-y"
            value={jdText}
            onChange={(e) => setJdText(e.target.value)}
          />

          <div className="flex items-center gap-4">
            <label className="inline-flex items-center px-3 py-2 bg-gray-700 text-sm text-white rounded cursor-pointer">
              Attach file
              <input
                id="jd-file-input"
                type="file"
                accept=".pdf, .doc, .docx, application/pdf, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                onChange={handleFileChange}
                className="hidden"
              />
            </label>

            {file ? (
              <div className="flex items-center gap-3 text-sm text-gray-200">
                <div className="bg-gray-700 px-3 py-1 rounded">{file.name}</div>
                <button type="button" onClick={removeFile} className="text-xs text-red-400 hover:underline">
                  Remove
                </button>
              </div>
            ) : (
              <div className="text-sm text-gray-400">No file attached (only one allowed)</div>
            )}

            <div className="ml-auto">
              { (jdText || file) && (
                <button
                  type="submit"
                  className="p-1 rounded-full focus:outline-none"
                  title="Send"
                >
                  <ArrowUpIcon
                    className={`h-7 w-7 rounded-full border transition-all duration-300 ease-out opacity-100 translate-y-0 scale-100`}
                  />
                </button>
              )}
            </div>
          </div>

          {error && <p className="text-sm text-red-400">{error}</p>}
        </form>
      </div>
    </section>
  );
};

export default Create;
