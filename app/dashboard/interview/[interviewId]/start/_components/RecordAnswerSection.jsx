"use client";
import React, { useEffect, useState, useRef } from "react";
import useSpeechToText from "react-hook-speech-to-text";
import { Button } from "@/components/ui/button";
import Webcam from "react-webcam";
import { useUser } from "@clerk/nextjs";
import { 
  Mic, 
  Square, 
  Send, 
  Loader2, 
  Video, 
  VideoOff, 
  Sparkles, 
  Edit3, 
  RotateCcw,
  CheckCircle2,
  Volume2
} from "lucide-react";
import { toast } from "sonner";
import { chatSession } from "@/utils/GeminiAIModel";
import { db } from "@/utils/db";
import { v4 as uuidv4 } from "uuid";
import moment from "moment";
import { UseAnswer } from "@/utils/schema";

function RecordAnswerSection({
  mockInterviewQuestion,
  activeQuestionIndex,
  interviewData,
  onAnswerRecorded,
  isAlreadyAnswered = false,
}) {
  const [userAnswer, setUserAnswer] = useState("");
  const { user } = useUser();
  const [evaluating, setEvaluating] = useState(false);
  const [isWebcamActive, setIsWebcamActive] = useState(true);
  const [recordingSeconds, setRecordingSeconds] = useState(0);
  const timerRef = useRef(null);

  const {
    error,
    interimResult,
    isRecording,
    results,
    setResults,
    startSpeechToText,
    stopSpeechToText,
  } = useSpeechToText({
    continuous: true,
    useLegacyResults: false,
  });

  // Accumulate speech-to-text transcripts
  useEffect(() => {
    if (results && results.length > 0) {
      const fullTranscript = results.map((r) => r?.transcript || "").join(" ");
      setUserAnswer((prev) => {
        // If user already typed something custom, append
        if (!prev) return fullTranscript;
        return prev + " " + (results[results.length - 1]?.transcript || "");
      });
    }
  }, [results]);

  // Handle recording timer
  useEffect(() => {
    if (isRecording) {
      setRecordingSeconds(0);
      timerRef.current = setInterval(() => {
        setRecordingSeconds((sec) => sec + 1);
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isRecording]);

  // Reset answer when switching question
  useEffect(() => {
    setUserAnswer("");
    setResults([]);
    setRecordingSeconds(0);
  }, [activeQuestionIndex]);

  const toggleRecording = () => {
    if (isRecording) {
      stopSpeechToText();
    } else {
      startSpeechToText();
    }
  };

  const handleEvaluateAnswer = async () => {
    const trimmed = userAnswer.trim();
    if (trimmed.length < 5) {
      toast.error("Please articulate or type a response of at least a few sentences before submitting.");
      return;
    }

    if (isRecording) {
      stopSpeechToText();
    }

    setEvaluating(true);
    try {
      const currentQ = mockInterviewQuestion?.[activeQuestionIndex]?.Question;
      const correctAns = mockInterviewQuestion?.[activeQuestionIndex]?.Answer;

      const evaluationPrompt = `You are a principal technical interviewer at a top technology firm. Objectively evaluate the candidate's response to the following interview question:
- Question: "${currentQ}"
- Target / Benchmark Solution: "${correctAns}"
- Candidate's Given Response: "${trimmed}"

Please provide evaluation in strict JSON format with exactly two fields:
1. "rating": A concise rating between 1 and 10 based on technical accuracy, clarity, and completeness (e.g. "8/10").
2. "feedback": 3-4 professional, actionable sentences detailing what was answered well, key missing technical points or trade-offs, and constructive tips to improve for a hiring panel.
Do not output markdown code fences, backticks, or extraneous conversational text.`;

      const result = await chatSession.sendMessage(evaluationPrompt);
      const responseText = result.response.text();
      const cleaned = responseText
        .replace(/```json/gi, "")
        .replace(/```/g, "")
        .trim();

      const parsedFeedback = JSON.parse(cleaned);

      const recordId = uuidv4();
      await db.insert(UseAnswer).values({
        id: recordId,
        mockIdRef: interviewData?.mockId,
        question: currentQ,
        correctAns: correctAns,
        userAns: trimmed,
        feedback: parsedFeedback?.feedback || "Evaluation complete.",
        rating: parsedFeedback?.rating || "N/A",
        userEmail: user?.primaryEmailAddress?.emailAddress || "anonymous",
        createdAt: moment().format("DD-MM-YYYY"),
      });

      toast.success("Answer evaluated and saved to your scorecard!");
      if (onAnswerRecorded) {
        onAnswerRecorded(activeQuestionIndex);
      }
      setResults([]);
    } catch (err) {
      console.error("Evaluation Error:", err);
      toast.error("Failed to evaluate answer. Please try submitting again.");
    } finally {
      setEvaluating(false);
    }
  };

  const formatTime = (totalSeconds) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins < 10 ? "0" : ""}${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  return (
    <div className="flex flex-col space-y-6">
      {/* Video Viewport Card */}
      <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-4 relative overflow-hidden flex flex-col items-center">
        {/* Status bar */}
        <div className="w-full flex items-center justify-between pb-3 mb-2 border-b border-zinc-800/80 text-xs">
          <div className="flex items-center gap-2">
            <span
              className={`h-2 w-2 rounded-full ${
                isRecording
                  ? "bg-red-500 animate-ping"
                  : isWebcamActive
                  ? "bg-emerald-400"
                  : "bg-zinc-600"
              }`}
            />
            <span className="font-medium text-zinc-300">
              {isRecording
                ? `Recording: ${formatTime(recordingSeconds)}`
                : isWebcamActive
                ? "Live Video Active"
                : "Camera Paused"}
            </span>
          </div>

          <button
            type="button"
            onClick={() => setIsWebcamActive(!isWebcamActive)}
            className="flex items-center gap-1.5 text-zinc-400 hover:text-zinc-200 transition-colors"
          >
            {isWebcamActive ? (
              <>
                <VideoOff className="h-3.5 w-3.5" />
                <span>Hide Camera</span>
              </>
            ) : (
              <>
                <Video className="h-3.5 w-3.5 text-blue-400" />
                <span>Show Camera</span>
              </>
            )}
          </button>
        </div>

        {/* Viewport Frame */}
        <div className="w-full h-56 sm:h-64 rounded-xl overflow-hidden bg-zinc-900 border border-zinc-800/80 relative flex items-center justify-center">
          {isWebcamActive ? (
            <Webcam
              mirrored={true}
              className="w-full h-full object-cover"
              onUserMediaError={() => setIsWebcamActive(false)}
            />
          ) : (
            <div className="flex flex-col items-center text-zinc-500">
              <VideoOff className="h-10 w-10 text-zinc-600 mb-2" />
              <span className="text-xs">Camera view disabled</span>
            </div>
          )}

          {/* Soundwave animation overlay while recording */}
          {isRecording && (
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-zinc-950/80 backdrop-blur-md border border-zinc-700/80 flex items-center gap-2 shadow-lg">
              <span className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
              <div className="flex items-center gap-1 h-5">
                <div className="w-1 bg-red-400 soundwave-bar" />
                <div className="w-1 bg-red-500 soundwave-bar" />
                <div className="w-1 bg-rose-400 soundwave-bar" />
                <div className="w-1 bg-red-400 soundwave-bar" />
                <div className="w-1 bg-rose-500 soundwave-bar" />
              </div>
              <span className="text-[11px] font-mono text-zinc-200 ml-1">
                {formatTime(recordingSeconds)}
              </span>
            </div>
          )}
        </div>

        {/* Speech Controls */}
        <div className="flex items-center justify-center gap-4 mt-4 w-full">
          <Button
            type="button"
            onClick={toggleRecording}
            variant={isRecording ? "destructive" : "outline"}
            className={`rounded-xl px-6 py-2.5 text-xs font-semibold flex items-center gap-2 transition-all ${
              isRecording
                ? "bg-red-600 hover:bg-red-500 text-white shadow-lg shadow-red-600/30 animate-pulse"
                : "border-zinc-700 bg-zinc-900 hover:bg-zinc-800 text-zinc-200"
            }`}
          >
            {isRecording ? (
              <>
                <Square className="h-4 w-4 fill-current" />
                Stop Recording
              </>
            ) : (
              <>
                <Mic className="h-4 w-4 text-blue-400" />
                Record Speech Answer
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Answer Transcript & Manual Input Panel */}
      <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-5 space-y-3">
        <div className="flex items-center justify-between text-xs">
          <label className="font-semibold text-zinc-300 flex items-center gap-1.5">
            <Edit3 className="h-3.5 w-3.5 text-blue-400" />
            Your Articulated Response
          </label>
          <div className="flex items-center gap-2 text-zinc-500">
            {userAnswer.length > 0 && (
              <button
                type="button"
                onClick={() => setUserAnswer("")}
                className="hover:text-zinc-300 transition-colors flex items-center gap-1"
                title="Clear text"
              >
                <RotateCcw className="h-3 w-3" />
                Clear
              </button>
            )}
            <span>{userAnswer.trim().split(/\s+/).filter(Boolean).length} words</span>
          </div>
        </div>

        <textarea
          value={userAnswer}
          onChange={(e) => setUserAnswer(e.target.value)}
          placeholder="Speak into your microphone or type your response here. We capture speech in real-time, allowing you to edit technical terms or syntax before submitting..."
          rows={4}
          className="w-full rounded-xl bg-zinc-950/80 border border-zinc-800 p-3 text-xs sm:text-sm text-zinc-200 placeholder:text-zinc-600 focus:outline-none focus:border-blue-500/80 focus:ring-1 focus:ring-blue-500/40 resize-none font-sans leading-relaxed"
        />

        <div className="flex items-center justify-between pt-1">
          <span className="text-[11px] text-zinc-500">
            {isAlreadyAnswered && (
              <span className="text-emerald-400 font-medium flex items-center gap-1">
                <CheckCircle2 className="h-3 w-3" /> Previously evaluated
              </span>
            )}
          </span>

          <Button
            type="button"
            disabled={evaluating || userAnswer.trim().length < 5}
            onClick={handleEvaluateAnswer}
            className="bg-blue-600 hover:bg-blue-500 text-white font-medium text-xs px-5 py-2 rounded-xl transition-all shadow-md shadow-blue-600/20 flex items-center gap-1.5"
          >
            {evaluating ? (
              <>
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
                Evaluating Response...
              </>
            ) : (
              <>
                <Send className="h-3.5 w-3.5" />
                Submit for Evaluation
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default RecordAnswerSection;
