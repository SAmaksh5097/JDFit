import { ArrowRightIcon } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import HeaderMin from "../components/HeaderMin";

const Create = () => {
  const { userId } = useAuth();
  const navigate = useNavigate();
  const [jdText, setJdText] = useState("");
  const [instructions, setInstructions] = useState("");
  const [error, setError] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [latexCode, setLatexCode] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!jdText) {
      setError("Please paste a JD before sending.");
      return;
    }
    if (!userId) {
      setError("User not authenticated.");
      return;
    }
    setError("");
    setIsGenerating(true);

    try {
      // Create JSON payload
      // TODO: Handle file extraction later as user said "leave pdf compile for now"
      const response = await fetch("http://localhost:5000/api/resume/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: userId,
          jobDescription: jdText,
          instructions: instructions
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate resume.");
      }

      const data = await response.json();
      setLatexCode(data.latexCode);

      // trigger fade out
      setIsSubmitted(true);
      
      // Navigate to the preview page with the new resume ID
      setTimeout(() => {
        navigate(`/preview/${data.resumeId}`);
      }, 400);

    } catch (err) {
      setError(err.message || "An error occurred during generation.");
    } finally {
      setIsGenerating(false);
    }
  };

  if (showPreview) {
    return null; // Navigation handles it now
  }

  return (
    <>
      <HeaderMin />
      <div className={`transition-opacity duration-400 ease-in-out ${isSubmitted ? "opacity-0" : "opacity-100"}`}>
        <section className="max-w-6xl mx-auto px-3 sm:px-4 md:px-6 py-6 sm:py-8 flex flex-col lg:flex-row gap-4 sm:gap-6 items-stretch">
          {/* Left Column for Inputs */}
          <div className="flex-1 flex flex-col gap-3 sm:gap-4 md:gap-6">
            <div className="bg-gray-900/80 backdrop-blur-sm p-4 sm:p-5 md:p-6 rounded-lg sm:rounded-xl shadow-md border border-gray-800/50 hover:border-gray-700/50 transition-colors">
              <form id="create-form" onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
                <label className="block text-xs sm:text-sm font-semibold text-gray-300 mb-2">Job Description</label>
                <textarea
                  placeholder="Paste the JD here..."
                  className="w-full min-h-32 sm:min-h-40 md:min-h-48 bg-gray-800/50 text-white p-3 sm:p-4 rounded-lg resize-y outline-none focus:ring-2 focus:ring-blue-500/50 border border-gray-700/50 focus:border-blue-500/50 text-sm sm:text-base"
                  value={jdText}
                  onChange={(e) => setJdText(e.target.value)}
                />
  
                {error && <p className="text-xs sm:text-sm text-red-400 flex items-center gap-2">⚠️ {error}</p>}
              </form>
            </div>

            <div className="bg-gray-900/80 backdrop-blur-sm p-4 sm:p-5 md:p-6 rounded-lg sm:rounded-xl shadow-md border border-gray-800/50 hover:border-gray-700/50 transition-colors">
              <label className="block text-xs sm:text-sm font-semibold text-gray-300 mb-2">Additional Instructions (Optional)</label>
              <textarea
                value={instructions}
                onChange={(e) => setInstructions(e.target.value)}
                placeholder="Any additional instructions or details..."
                className="w-full min-h-24 sm:min-h-32 bg-gray-800/50 text-white p-3 sm:p-4 rounded-lg resize-y outline-none focus:ring-2 focus:ring-blue-500/50 border border-gray-700/50 focus:border-blue-500/50 text-sm sm:text-base"
              />
            </div>
          </div>

          {/* Right Column for Submit Button */}
          <div className="flex flex-col gap-3 sm:gap-4 lg:w-28 lg:h-fit">
            <button
              onClick={handleSubmit}
              disabled={isGenerating}
              className={`w-full bg-gradient-to-br from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white font-semibold rounded-lg sm:rounded-xl shadow-md transition-all duration-300 flex flex-row lg:flex-col items-center justify-center gap-2 group py-3 sm:py-4 lg:py-6 px-4 sm:px-5 text-sm sm:text-base ${isGenerating ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-lg hover:shadow-blue-500/25'}`}
              title="Generate"
            >
              <ArrowRightIcon className={`h-5 w-5 sm:h-6 sm:w-6 lg:h-7 lg:w-7 transition-transform ${isGenerating ? 'animate-pulse' : 'group-hover:translate-x-1 lg:group-hover:translate-x-0 lg:group-hover:translate-y-1'}`} />
              <span className="whitespace-nowrap">{isGenerating ? 'Generating...' : 'Generate'}</span>
            </button>
          </div>
        </section>
      </div>
    </>
  );
};

export default Create;
