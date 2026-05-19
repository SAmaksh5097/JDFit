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
        <section className="max-w-5xl mx-auto p-6 flex flex-col md:flex-row gap-6 items-center">
          {/* Left Column for Inputs */}
          <div className="flex-1 flex flex-col gap-6">
            <div className="bg-gray-900 p-6 rounded-lg shadow-md">
              <form id="create-form" onSubmit={handleSubmit} className="space-y-4">
                <textarea
                  placeholder="Paste the JD here..."
                  className="w-full min-h-40 bg-gray-800 text-white p-4 rounded-lg resize-y outline-none focus:ring-2 focus:ring-blue-500"
                  value={jdText}
                  onChange={(e) => setJdText(e.target.value)}
                />
  
                {error && <p className="text-sm text-red-400">{error}</p>}
              </form>
            </div>

            <div className="bg-gray-900 p-6 rounded-lg shadow-md">
              <textarea
                value={instructions}
                onChange={(e) => setInstructions(e.target.value)}
                placeholder="Any additional instructions or details..."
                className="w-full min-h-40 bg-gray-800 text-white p-4 rounded-lg resize-y outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Right Column for Submit Button */}
          <div className="md:w-32 h-fit flex">
            <button
              onClick={handleSubmit}
              disabled={isGenerating}
              className={`w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transition-all duration-300 flex flex-col items-center justify-center gap-2 group min-h-30 md:min-h-full p-1 ${isGenerating ? 'opacity-50 cursor-not-allowed' : ''}`}
              title="Generate"
            >
              <ArrowRightIcon className={`h-8 w-8 transition-transform ${isGenerating ? 'animate-pulse' : 'group-hover:translate-x-1'}`} />
              <span className="text-lg">{isGenerating ? 'Generating...' : 'Generate'}</span>
            </button>
          </div>
        </section>
      </div>
    </>
  );
};

export default Create;
