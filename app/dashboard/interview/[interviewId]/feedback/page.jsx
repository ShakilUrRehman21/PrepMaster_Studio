"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { db } from "@/utils/db";
import { UseAnswer, MockInterview } from "@/utils/schema";
import { eq } from "drizzle-orm";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { 
  ChevronDown, 
  Award, 
  CheckCircle2, 
  RotateCcw, 
  Printer, 
  ArrowLeft, 
  Star, 
  FileText, 
  AlertCircle,
  TrendingUp,
  Sparkles,
  BarChart3
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

function Feedback() {
  const [feedbackList, setFeedbackList] = useState([]);
  const [interviewData, setInterviewData] = useState(null);
  const [loading, setLoading] = useState(true);
  const params = useParams();
  const router = useRouter();
  const interviewId = params?.interviewId;

  useEffect(() => {
    if (interviewId) {
      fetchFeedbackAndDetails();
    }
  }, [interviewId]);

  const fetchFeedbackAndDetails = async () => {
    try {
      setLoading(true);
      const [feedbackResp, interviewResp] = await Promise.all([
        db
          .select()
          .from(UseAnswer)
          .where(eq(UseAnswer.mockIdRef, interviewId))
          .orderBy(UseAnswer.id),
        db
          .select()
          .from(MockInterview)
          .where(eq(MockInterview.mockId, interviewId)),
      ]);

      setFeedbackList(feedbackResp || []);
      if (interviewResp && interviewResp.length > 0) {
        setInterviewData(interviewResp[0]);
      }
    } catch (err) {
      console.error("Error retrieving feedback:", err);
    } finally {
      setLoading(false);
    }
  };

  // Calculate average rating
  const ratings = feedbackList
    .map((item) => {
      if (!item.rating) return null;
      const match = item.rating.match(/(\d+(\.\d+)?)/);
      return match ? parseFloat(match[1]) : null;
    })
    .filter((n) => n !== null && !isNaN(n));

  const averageRating =
    ratings.length > 0
      ? (ratings.reduce((a, b) => a + b, 0) / ratings.length).toFixed(1)
      : null;

  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
        <div className="h-8 w-8 rounded-full border-2 border-blue-500 border-t-transparent animate-spin" />
        <p className="text-xs text-zinc-400 font-medium">Assembling diagnostic scorecard...</p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto py-6 space-y-8">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-zinc-800">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-medium border border-emerald-500/20 mb-2">
            <CheckCircle2 className="h-3.5 w-3.5" />
            Interview Evaluation Complete
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
            Performance Diagnostic Scorecard
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1">
            {interviewData?.jobPosition} — {interviewData?.jobExperience} Years Experience Level
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={handlePrint}
            className="text-xs font-medium border-zinc-800 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 rounded-xl flex items-center gap-1.5"
          >
            <Printer className="h-3.5 w-3.5 text-zinc-400" />
            Print Report
          </Button>

          <Button
            type="button"
            onClick={() => router.push("/dashboard")}
            className="bg-blue-600 hover:bg-blue-500 text-white font-medium text-xs rounded-xl px-4 flex items-center gap-1.5 shadow-md shadow-blue-600/20"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Dashboard
          </Button>
        </div>
      </div>

      {feedbackList.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-12 rounded-2xl border border-zinc-800 bg-zinc-900/30 text-center space-y-4">
          <div className="h-12 w-12 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center text-zinc-400">
            <FileText className="h-6 w-6" />
          </div>
          <div>
            <h3 className="text-base font-semibold text-white">No Responses Recorded Yet</h3>
            <p className="text-xs text-zinc-400 mt-1 max-w-sm">
              It looks like no answers have been recorded for this simulation session yet.
            </p>
          </div>
          <Link href={`/dashboard/interview/${interviewId}/start`}>
            <Button className="bg-blue-600 hover:bg-blue-500 text-white text-xs rounded-xl">
              Start Session Now
            </Button>
          </Link>
        </div>
      ) : (
        <>
          {/* Executive Metrics Overview */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {/* Metric 1 */}
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6 flex items-center justify-between">
              <div>
                <span className="text-xs font-medium uppercase tracking-wider text-zinc-400">
                  Overall Score
                </span>
                <div className="text-3xl font-bold text-white mt-1">
                  {averageRating ? `${averageRating}/10` : "Evaluated"}
                </div>
                <div className="text-[11px] text-zinc-500 mt-0.5">
                  Across {ratings.length} graded questions
                </div>
              </div>
              <div className="h-12 w-12 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
                <Award className="h-6 w-6" />
              </div>
            </div>

            {/* Metric 2 */}
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6 flex items-center justify-between">
              <div>
                <span className="text-xs font-medium uppercase tracking-wider text-zinc-400">
                  Questions Evaluated
                </span>
                <div className="text-3xl font-bold text-white mt-1">
                  {feedbackList.length}
                </div>
                <div className="text-[11px] text-zinc-500 mt-0.5">
                  Responses recorded & analyzed
                </div>
              </div>
              <div className="h-12 w-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
                <BarChart3 className="h-6 w-6" />
              </div>
            </div>

            {/* Metric 3 */}
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6 flex items-center justify-between">
              <div>
                <span className="text-xs font-medium uppercase tracking-wider text-zinc-400">
                  Readiness Verdict
                </span>
                <div className="text-xl font-bold text-emerald-400 mt-1">
                  {averageRating && parseFloat(averageRating) >= 7.5
                    ? "Hire / Strong"
                    : averageRating && parseFloat(averageRating) >= 6.0
                    ? "Borderline / Revise"
                    : "Needs Preparation"}
                </div>
                <div className="text-[11px] text-zinc-500 mt-0.5">
                  Based on hiring bar criteria
                </div>
              </div>
              <div className="h-12 w-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                <TrendingUp className="h-6 w-6" />
              </div>
            </div>
          </div>

          {/* Section: Question-by-Question Breakdown */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-white tracking-tight">
                Question Breakdown & Improvement Rubrics
              </h2>
              <span className="text-xs text-zinc-400">
                Click any prompt to expand candidate vs benchmark comparison
              </span>
            </div>

            <div className="space-y-4">
              {feedbackList.map((item, index) => (
                <Collapsible
                  key={item.id || index}
                  defaultOpen={index === 0}
                  className="rounded-2xl border border-zinc-800 bg-zinc-900/40 overflow-hidden transition-all hover:border-zinc-700"
                >
                  <CollapsibleTrigger className="w-full p-5 flex items-center justify-between text-left hover:bg-zinc-800/40 transition-colors">
                    <div className="flex items-start gap-3 pr-4">
                      <span className="px-2.5 py-1 rounded-lg bg-zinc-800 border border-zinc-700 text-xs font-semibold text-zinc-300 shrink-0">
                        Q{index + 1}
                      </span>
                      <div>
                        <h4 className="text-sm font-semibold text-white leading-snug">
                          {item.question}
                        </h4>
                        <div className="flex items-center gap-3 mt-1.5">
                          <span className="text-xs font-medium text-blue-400">
                            Rating: {item.rating || "N/A"}
                          </span>
                        </div>
                      </div>
                    </div>
                    <ChevronDown className="h-4 w-4 text-zinc-400 shrink-0 transition-transform duration-200" />
                  </CollapsibleTrigger>

                  <CollapsibleContent className="p-5 pt-0 border-t border-zinc-800/60 mt-3 space-y-4">
                    {/* Candidate Answer */}
                    <div className="rounded-xl border border-zinc-800 bg-zinc-950/60 p-4 space-y-1.5">
                      <span className="text-[11px] font-semibold uppercase tracking-wider text-zinc-400 flex items-center gap-1.5">
                        <FileText className="h-3.5 w-3.5 text-zinc-400" />
                        Your Articulated Response
                      </span>
                      <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-sans">
                        "{item.userAns}"
                      </p>
                    </div>

                    {/* Benchmark Solution */}
                    <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-4 space-y-1.5">
                      <span className="text-[11px] font-semibold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                        <CheckCircle2 className="h-3.5 w-3.5" />
                        Exemplar Benchmark Answer
                      </span>
                      <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed font-sans">
                        {item.correctAns}
                      </p>
                    </div>

                    {/* Hiring Manager Feedback */}
                    <div className="rounded-xl border border-blue-500/20 bg-blue-500/5 p-4 space-y-1.5">
                      <span className="text-[11px] font-semibold uppercase tracking-wider text-blue-400 flex items-center gap-1.5">
                        <TrendingUp className="h-3.5 w-3.5" />
                        Diagnostic Feedback & Key Takeaways
                      </span>
                      <p className="text-xs sm:text-sm text-blue-100/90 leading-relaxed font-sans">
                        {item.feedback}
                      </p>
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              ))}
            </div>
          </div>

          {/* Footer Actions */}
          <div className="flex items-center justify-between pt-6 border-t border-zinc-800">
            <Link href={`/dashboard/interview/${interviewId}`}>
              <Button
                variant="outline"
                className="text-xs rounded-xl border-zinc-800 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 flex items-center gap-1.5"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                Retake This Simulation
              </Button>
            </Link>

            <Link href="/dashboard">
              <Button className="bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold rounded-xl px-5 shadow-md shadow-blue-600/20">
                Back to Dashboard
              </Button>
            </Link>
          </div>
        </>
      )}
    </div>
  );
}

export default Feedback;
