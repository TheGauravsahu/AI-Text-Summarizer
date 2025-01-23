"use client";

import { useState } from "react";
import { Sparkles, Wand2, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export default function Page() {
  const [text, setText] = useState("");
  const [summary, setSummary] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch("/api/summarize", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }),
      });

      const data = await response.json();
      setSummary(data.summary);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const { setTheme } = useTheme();

  // Toggle dark mode
  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => {
      const newMode = !prevMode;
      setTheme(newMode ? "dark" : "light");
      return newMode;
    });
  };

  return (
    <div className={`${isDarkMode ? "dark" : ""} relative min-h-screen`}>
      {/* Beam Light Effect */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div
          className="absolute top-0 left-0 right-0 h-96 
          bg-gradient-to-b from-purple-500/30 via-purple-500/10 to-transparent 
          dark:from-purple-900/40 dark:via-purple-900/10 dark:to-transparent 
          blur-[100px] animate-beam-pulse"
        ></div>
      </div>

      <div className="relative z-10 min-h-screen bg-white dark:bg-black p-8">
        {/* Dark Mode Toggle */}
        <div className="absolute top-4 right-4 z-20">
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-full bg-purple-100 dark:bg-purple-800 text-purple-600 dark:text-purple-200 
              hover:bg-purple-200 dark:hover:bg-purple-700 
              transition-all duration-300 shadow-md hover:shadow-lg"
          >
            {isDarkMode ? (
              <Sun className="w-6 h-6" />
            ) : (
              <Moon className="w-6 h-6" />
            )}
          </button>
        </div>

        <div className="max-w-xl mx-auto relative z-10 space-y-8">
          {/* Header with Subtle Glow */}
          <div className="text-center">
            <h1
              className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r 
              from-purple-600 to-purple-400 
              dark:from-purple-400 dark:to-purple-600 
              mb-2 animate-gradient-text font-[geist]"
            >
              AI Text Summarizer
            </h1>
            <p className="text-purple-600 dark:text-purple-300 opacity-70">
              Distill complex text into concise insights
            </p>
          </div>

          {/* Input Form with Modern Design */}
          <form
            onSubmit={handleSubmit}
            className="bg-white/70 dark:bg-black/60 backdrop-blur-lg 
              border border-purple-100 dark:border-purple-800/50 
              rounded-2xl p-6 
              shadow-2xl shadow-purple-200/30 dark:shadow-purple-900/30 
              transition-all duration-300 
              hover:shadow-2xl hover:shadow-purple-300/40 dark:hover:shadow-purple-800/40"
          >
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Enter text to summarize..."
              className="w-full p-4 bg-transparent 
                text-purple-900 dark:text-purple-100 
                placeholder-purple-400 dark:placeholder-purple-500 
                border-none focus:outline-none resize-none 
                transition-all duration-300 text-lg leading-relaxed outline-none"
              rows="6"
              required
            />
            <div className="mt-4 flex items-center justify-between">
              <div className="text-xs text-purple-500 dark:text-purple-300 opacity-60">
                {text.length > 0
                  ? `${text.length} characters`
                  : "Start typing..."}
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className="flex items-center gap-2 px-6 py-3 
                  bg-gradient-to-r from-purple-600 to-purple-500 
                  dark:from-purple-500 dark:to-purple-600 
                  text-white rounded-xl 
                  transition-all duration-300 
                  hover:scale-105 hover:shadow-xl 
                  hover:shadow-purple-500/30 
                  disabled:opacity-50 disabled:cursor-not-allowed group"
              >
                {isLoading ? (
                  <>
                    <Sparkles className="w-5 h-5 animate-pulse" />
                    Summarizing...
                  </>
                ) : (
                  <>
                    <Wand2 className="w-5 h-5 group-hover:animate-spin" />
                    Summarize
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Summary Section with Elegant Reveal */}
          {summary && (
            <div
              className="bg-white/70 dark:bg-black/60 backdrop-blur-lg 
              border border-purple-100 dark:border-purple-800/50 
              rounded-2xl p-6 
              shadow-2xl shadow-purple-200/30 dark:shadow-purple-900/30 
              animate-fade-in-up"
            >
              <h2 className="text-2xl font-bold text-purple-800 dark:text-purple-200 mb-4 flex items-center gap-2">
                <Sparkles className="w-6 h-6 text-purple-500 animate-pulse" />
                Summary
              </h2>
              <p className="text-purple-900 dark:text-purple-100 leading-relaxed">
                {summary}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
