"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { db } from "@/utils/db";
import { MockInterview, UseAnswer } from "@/utils/schema";
import { eq } from "drizzle-orm";
import QuestionSection from "./_components/QuestionSection";
import RecordAnswerSection from "./_components/RecordAnswerSection";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { 
  ArrowLeft, 
  ChevronLeft, 
  ChevronRight, 
  CheckCircle, 
  FileCheck2, 
  Compass,
  AlertCircle
} from "lucide-react";

function StartInterview() {
  const params = useParams();
  const router = useRouter();
  const interviewId = params?.interviewId;

  const [interviewData, setInterviewData] = useState(null);
  const [mockInterviewQuestion, setMockInterviewQuestion] = useState([]);
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInterviewDetails = async () => {
      if (!interviewId) return;
      try {
        setLoading(true);
        const result = await db
          .select()
          .from(MockInterview)
          .where(eq(MockInterview.mockId, interviewId));

        if (result && result.length > 0) {
          const rawJson = result[0].jsonMockResp;
          const parsedQuestions = JSON.parse(rawJson);
          setMockInterviewQuestion(parsedQuestions);
          setInterviewData(result[0]);

          // Fetch previously answered questions
          const answeredResults = await db
            .select()
            .from(UseAnswer)
            .where(eq(UseAnswer.mockIdRef, interviewId));

          const answeredMap = {};
          answeredResults.forEach((ans) => {
            const matchIndex = parsedQuestions.findIndex(
              (q) => q.Question === ans.question
            );
            if (matchIndex !== -1) {
              answeredMap[matchIndex] = true;
            }
          });
          setAnsweredQuestions(answeredMap);
        }
      } catch (err) {
        console.error("Failed to load interview details:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchInterviewDetails();
  }, [interviewId]);

  const handleAnswerRecorded = (questionIndex) => {
    setAnsweredQuestions((prev) => ({
      ...prev,
      [questionIndex]: true,
    }));
  };

  const totalQuestions = mockInterviewQuestion?.length || 0;
  const progressPercent = totalQuestions > 0 ? ((activeQuestionIndex + 1) / totalQuestions) * 100 : 0;
  const answeredCount = Object.keys(answeredQuestions).length;

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
        <div className="h-8 w-8 rounded-full border-2 border-blue-500 border-t-transparent animate-spin" />
        <p className="text-xs text-zinc-400 font-medium">Entering simulation room...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto py-2">
      {/* Studio Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-zinc-800">
        <div className="flex items-center gap-3">
          <Link
            href={`/dashboard/interview/${interviewId}`}
            className="p-2 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white transition-colors"
            title="Back to Lobby"
          >
            <ArrowLeft className="h-4 w-4" />
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-blue-400 bg-blue-500/10 px-2.5 py-0.5 rounded-full border border-blue-500/20">
                Live Simulation
              </span>
              <span className="text-xs text-zinc-400">
                {answeredCount} of {totalQuestions} answered
              </span>
            </div>
            <h1 className="text-lg font-bold text-white mt-1">
              {interviewData?.jobPosition || "Technical Interview Round"}
            </h1>
          </div>
        </div>

        {/* Finish Session Quick Link */}
        <div className="flex items-center gap-3">
          <Link href={`/dashboard/interview/${interviewId}/feedback`}>
            <Button
              variant="outline"
              className="text-xs font-medium border-zinc-800 bg-zinc-900 hover:bg-zinc-800 text-zinc-200 rounded-xl flex items-center gap-1.5"
            >
              <FileCheck2 className="h-3.5 w-3.5 text-blue-400" />
              Finish & View Scorecard
            </Button>
          </Link>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-zinc-900 h-1.5 rounded-full overflow-hidden">
        <div
          className="bg-gradient-to-r from-blue-500 to-indigo-500 h-full transition-all duration-300"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {/* Split Studio Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        {/* Left Pane: Question Section */}
        <div className="lg:col-span-6 flex flex-col">
          <QuestionSection
            mockInterviewQuestion={mockInterviewQuestion}
            activeQuestionIndex={activeQuestionIndex}
            setActiveQuestionIndex={setActiveQuestionIndex}
            answeredQuestions={answeredQuestions}
          />
        </div>

        {/* Right Pane: Speech & Video Capture Section */}
        <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
          <RecordAnswerSection
            mockInterviewQuestion={mockInterviewQuestion}
            activeQuestionIndex={activeQuestionIndex}
            interviewData={interviewData}
            onAnswerRecorded={handleAnswerRecorded}
            isAlreadyAnswered={Boolean(answeredQuestions[activeQuestionIndex])}
          />

          {/* Stepper Navigation Buttons */}
          <div className="flex items-center justify-between pt-2">
            <Button
              type="button"
              variant="outline"
              disabled={activeQuestionIndex === 0}
              onClick={() => setActiveQuestionIndex((prev) => Math.max(0, prev - 1))}
              className="rounded-xl border-zinc-800 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 text-xs font-medium flex items-center gap-1.5"
            >
              <ChevronLeft className="h-4 w-4" />
              Previous Question
            </Button>

            {activeQuestionIndex < totalQuestions - 1 ? (
              <Button
                type="button"
                onClick={() => setActiveQuestionIndex((prev) => prev + 1)}
                className="bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-medium flex items-center gap-1.5 shadow-md shadow-blue-600/20"
              >
                Next Question
                <ChevronRight className="h-4 w-4" />
              </Button>
            ) : (
              <Link href={`/dashboard/interview/${interviewId}/feedback`}>
                <Button className="bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-md shadow-emerald-600/20">
                  <CheckCircle className="h-4 w-4" />
                  Complete Simulation
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default StartInterview;
