"use client";
import { Button } from "@/components/ui/button";
import { db } from "@/utils/db";
import { MockInterview } from "@/utils/schema";
import { eq } from "drizzle-orm";
import { 
  Lightbulb, 
  WebcamIcon, 
  Video, 
  VideoOff, 
  Mic, 
  Briefcase, 
  Code2, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  ArrowRight,
  ShieldCheck,
  Sparkles
} from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Webcam from "react-webcam";
import { useParams } from "next/navigation";

function Interview() {
  const params = useParams();
  const interviewId = params?.interviewId;
  const [webCamEnabled, setWebCamEnabled] = useState(false);
  const [interviewData, setInterviewData] = useState(null);
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
          setInterviewData(result[0]);
        }
      } catch (err) {
        console.error("Failed to load interview:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchInterviewDetails();
  }, [interviewId]);

  const toggleWebCam = () => {
    setWebCamEnabled((prev) => !prev);
  };

  return (
    <div className="max-w-5xl mx-auto py-6 space-y-8">
      {/* Session Title Header */}
      <div className="pb-6 border-b border-zinc-800">
        <span className="text-xs font-semibold uppercase tracking-wider text-blue-400 bg-blue-500/10 px-3 py-1 rounded-full border border-blue-500/20">
          Pre-Session Setup & Verification
        </span>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mt-3">
          Interview Readiness Check
        </h1>
        <p className="text-sm text-zinc-400 mt-1">
          Verify your audio-video inputs and review your role specifications before entering the simulation room.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Role Details & Instructions */}
        <div className="lg:col-span-7 space-y-6">
          {/* Role Specification Card */}
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6 space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-zinc-400 flex items-center gap-2">
              <Briefcase className="h-4 w-4 text-blue-400" />
              Role Specifications
            </h3>

            {loading ? (
              <div className="space-y-3 animate-pulse">
                <div className="h-6 w-3/4 bg-zinc-800 rounded-md" />
                <div className="h-4 w-full bg-zinc-800 rounded-md" />
                <div className="h-4 w-1/2 bg-zinc-800 rounded-md" />
              </div>
            ) : interviewData ? (
              <div className="space-y-4">
                <div>
                  <div className="text-xs text-zinc-500">Target Position</div>
                  <div className="text-lg font-bold text-white mt-0.5">
                    {interviewData.jobPosition}
                  </div>
                </div>

                <div>
                  <div className="text-xs text-zinc-500">Required Experience Level</div>
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-zinc-800 text-zinc-300 mt-1">
                    <Clock className="h-3 w-3 text-emerald-400" />
                    {interviewData.jobExperience} Years
                  </div>
                </div>

                <div>
                  <div className="text-xs text-zinc-500">Tech Stack & Scope</div>
                  <div className="text-sm text-zinc-300 mt-1 bg-zinc-950/60 p-3 rounded-xl border border-zinc-800/80 leading-relaxed font-mono text-xs">
                    {interviewData.jobDesc}
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-sm text-zinc-500">Interview details could not be retrieved.</p>
            )}
          </div>

          {/* Session Guidelines Card (Clean replacement for the harsh yellow box) */}
          <div className="rounded-2xl border border-zinc-800/80 bg-zinc-900/30 p-6 space-y-3">
            <h4 className="text-sm font-semibold text-white flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-emerald-400" />
              Simulation Guidelines & Privacy
            </h4>
            <ul className="text-xs text-zinc-400 space-y-2.5 leading-relaxed">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-blue-400 shrink-0 mt-0.5" />
                <span>
                  <strong>Speech-First Format:</strong> Read each question, listen to its audio pronunciation, and articulate your response aloud using the microphone.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-blue-400 shrink-0 mt-0.5" />
                <span>
                  <strong>Optional Camera:</strong> The webcam feed operates exclusively in your local browser window to simulate live eye contact. Video streams are never recorded or stored.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-blue-400 shrink-0 mt-0.5" />
                <span>
                  <strong>Diagnostic Scorecard:</strong> Upon completing the session, you will receive full answer transcripts, benchmark model responses, and actionable improvement notes.
                </span>
              </li>
            </ul>
          </div>

          <div className="pt-2">
            <Link href={`/dashboard/interview/${interviewId}/start`}>
              <Button
                disabled={!interviewId || loading}
                className="w-full sm:w-auto bg-blue-600 hover:bg-blue-500 text-white font-semibold px-8 py-3.5 rounded-xl shadow-lg shadow-blue-600/25 transition-all flex items-center justify-center gap-2"
              >
                Enter Interview Room
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>

        {/* Right Column: Camera & Audio Feed Check */}
        <div className="lg:col-span-5 flex flex-col items-center">
          <div className="w-full rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6 flex flex-col items-center text-center">
            <div className="w-full aspect-[4/3] rounded-xl overflow-hidden bg-zinc-950 border border-zinc-800 relative flex items-center justify-center">
              {webCamEnabled ? (
                <Webcam
                  onUserMedia={() => setWebCamEnabled(true)}
                  onUserMediaError={() => setWebCamEnabled(false)}
                  mirrored={true}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="flex flex-col items-center justify-center p-6 text-zinc-500">
                  <div className="h-16 w-16 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 mb-3">
                    <VideoOff className="h-8 w-8" />
                  </div>
                  <span className="text-sm font-medium text-zinc-300">Camera Inactive</span>
                  <span className="text-xs text-zinc-500 mt-1 max-w-[200px]">
                    Enable webcam to simulate an authentic video call setup.
                  </span>
                </div>
              )}

              {/* Status pill overlay */}
              <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium bg-zinc-900/90 backdrop-blur-md border border-zinc-800 text-zinc-300">
                <span className={`h-2 w-2 rounded-full ${webCamEnabled ? "bg-emerald-400 animate-pulse" : "bg-zinc-600"}`} />
                {webCamEnabled ? "Camera Active" : "Camera Disabled"}
              </div>
            </div>

            <Button
              type="button"
              variant="outline"
              onClick={toggleWebCam}
              className="mt-4 w-full rounded-xl border-zinc-800 bg-zinc-900 hover:bg-zinc-800 text-zinc-200 text-xs font-medium py-2.5 flex items-center justify-center gap-2"
            >
              {webCamEnabled ? (
                <>
                  <VideoOff className="h-4 w-4 text-red-400" />
                  Turn Off Camera
                </>
              ) : (
                <>
                  <Video className="h-4 w-4 text-emerald-400" />
                  Enable Webcam & Audio
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Interview;
