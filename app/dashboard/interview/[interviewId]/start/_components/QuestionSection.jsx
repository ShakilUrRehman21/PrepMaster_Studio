"use client";
import React, { useState, useEffect } from "react";
import { Volume2, VolumeX, Lightbulb, CheckCircle2, HelpCircle, ChevronRight } from "lucide-react";

function QuestionSection({
  mockInterviewQuestion,
  activeQuestionIndex,
  setActiveQuestionIndex,
  answeredQuestions = {},
}) {
  const [isSpeaking, setIsSpeaking] = useState(false);

  // Stop any ongoing speech when question changes
  useEffect(() => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  }, [activeQuestionIndex]);

  const handleTextToSpeech = (text) => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
      alert("Text-to-speech is not supported by your current browser.");
      return;
    }

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    const speech = new SpeechSynthesisUtterance(text);
    speech.rate = 0.95;
    speech.pitch = 1.0;

    speech.onend = () => setIsSpeaking(false);
    speech.onerror = () => setIsSpeaking(false);

    setIsSpeaking(true);
    window.speechSynthesis.speak(speech);
  };

  const currentQuestion = mockInterviewQuestion?.[activeQuestionIndex];

  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6 flex flex-col justify-between h-full space-y-6">
      <div className="space-y-6">
        {/* Question Selector Tabs */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
              Interview Questions
            </span>
            <span className="text-xs text-zinc-500">
              {activeQuestionIndex + 1} of {mockInterviewQuestion?.length || 0}
            </span>
          </div>

          <div className="flex flex-wrap gap-2">
            {mockInterviewQuestion?.map((_, index) => {
              const isActive = activeQuestionIndex === index;
              const isAnswered = Boolean(answeredQuestions[index]);

              return (
                <button
                  key={index}
                  type="button"
                  onClick={() => setActiveQuestionIndex(index)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all flex items-center gap-1.5 ${
                    isActive
                      ? "bg-blue-600 text-white shadow-md shadow-blue-600/30 ring-2 ring-blue-500/40"
                      : isAnswered
                      ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/20"
                      : "bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800"
                  }`}
                >
                  {isAnswered && <CheckCircle2 className="h-3 w-3 text-emerald-400 shrink-0" />}
                  Question #{index + 1}
                </button>
              );
            })}
          </div>
        </div>

        {/* Active Question Display */}
        <div className="rounded-xl border border-zinc-800/80 bg-zinc-950/70 p-5 space-y-4">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-blue-500" />
              <span className="text-xs font-semibold text-blue-400 uppercase tracking-wide">
                Prompt #{activeQuestionIndex + 1}
              </span>
            </div>

            {/* Audio narration button */}
            <button
              type="button"
              onClick={() => handleTextToSpeech(currentQuestion?.Question)}
              className={`p-2 rounded-lg border transition-all flex items-center gap-1.5 text-xs font-medium ${
                isSpeaking
                  ? "bg-blue-600 text-white border-blue-500 animate-pulse"
                  : "bg-zinc-900 border-zinc-800 text-zinc-300 hover:text-white hover:bg-zinc-800"
              }`}
              title={isSpeaking ? "Stop audio" : "Listen to question"}
            >
              {isSpeaking ? (
                <>
                  <VolumeX className="h-4 w-4" />
                  <span>Stop</span>
                </>
              ) : (
                <>
                  <Volume2 className="h-4 w-4 text-blue-400" />
                  <span>Listen</span>
                </>
              )}
            </button>
          </div>

          <p className="text-base sm:text-lg font-medium text-white leading-relaxed">
            {currentQuestion?.Question || "Loading question..."}
          </p>
        </div>
      </div>

      {/* STAR Framework Guidance Accordion/Card */}
      <div className="rounded-xl border border-zinc-800/80 bg-zinc-950/40 p-4 space-y-2 mt-auto">
        <div className="flex items-center gap-2 text-xs font-semibold text-zinc-300">
          <Lightbulb className="h-4 w-4 text-amber-400 shrink-0" />
          <span>Structuring Your Answer (STAR Method)</span>
        </div>
        <p className="text-xs text-zinc-400 leading-relaxed">
          <strong>Situation & Task:</strong> Contextualize the challenge. <br />
          <strong>Action:</strong> What specific steps, architectural choices, or tools did you use? <br />
          <strong>Result:</strong> Quantify the outcome (latency reduction, reliability, team impact).
        </p>
      </div>
    </div>
  );
}

export default QuestionSection;
