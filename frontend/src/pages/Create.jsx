import { ArrowRightIcon } from "lucide-react";
import { useState } from "react";
import HeaderMin from "../components/HeaderMin";
import PreviewPage from "./PreviewPage";

const Create = () => {
  const [jdText, setJdText] = useState("");
  const [instructions, setInstructions] = useState("");
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

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
    setError("");
    
    // trigger fade out
    setIsSubmitted(true);
    
    // wait for fade out to finish before mounting preview
    setTimeout(() => {
      setShowPreview(true);
    }, 400);
  };

  if (showPreview) {
    return (
      <div className="animate-in fade-in duration-500">
        <PreviewPage />
      </div>
    );
  }

  return (
    <>
      <HeaderMin />
      <div className={`transition-opacity duration-400 ease-in-out ${isSubmitted ? "opacity-0" : "opacity-100"}`}>
        <section className="max-w-5xl mx-auto p-6 flex flex-col md:flex-row gap-6 items-center">
          {/* Left Column for Inputs */}
          <div className="flex-1 flex flex-col gap-6">
            <div className="bg-gray-900 p-6 rounded-lg shadow-md">
              <form id="create-form" onSubmit={handleSubmit} className="space-y-4">
                <textarea
                  placeholder="Paste the JD here..."
                  className="w-full min-h-[10rem] bg-gray-800 text-white p-4 rounded-lg resize-y outline-none focus:ring-2 focus:ring-blue-500"
                  value={jdText}
                  onChange={(e) => setJdText(e.target.value)}
                />

                <div className="flex items-center gap-4 border-t border-gray-700 pt-4">
                  <label className="inline-flex items-center px-4 py-2 bg-gray-800 hover:bg-gray-700 transition-colors text-sm text-white rounded-md cursor-pointer border border-gray-600">
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
                      <div className="bg-gray-700 px-3 py-1 rounded truncate max-w-[200px]">{file.name}</div>
                      <button type="button" onClick={removeFile} className="text-xs text-red-400 hover:text-red-300 hover:underline">
                        Remove
                      </button>
                    </div>
                  ) : (
                    <div className="text-sm text-gray-400">No file attached (only one allowed)</div>
                  )}
                </div>

                {error && <p className="text-sm text-red-400">{error}</p>}
              </form>
            </div>

            <div className="bg-gray-900 p-6 rounded-lg shadow-md">
              <textarea
                value={instructions}
                onChange={(e) => setInstructions(e.target.value)}
                placeholder="Any additional instructions or details..."
                className="w-full min-h-[10rem] bg-gray-800 text-white p-4 rounded-lg resize-y outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Right Column for Submit Button */}
          <div className="md:w-32 h-fit flex">
            <button
              onClick={handleSubmit}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transition-all duration-300 flex flex-col items-center justify-center gap-2 group min-h-[120px] md:min-h-full p-1"
              title="Generate"
            >
              <ArrowRightIcon className="h-8 w-8 group-hover:translate-x-1 transition-transform" />
              <span className="text-lg">Generate</span>
            </button>
          </div>
        </section>
      </div>
    </>
  );
};

export default Create;
