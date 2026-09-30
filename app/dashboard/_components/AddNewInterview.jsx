"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { chatSession } from "@/utils/GeminiAIModel";
import { Loader2, Plus, Sparkles, Briefcase, Code2, Clock, CheckCircle } from "lucide-react";
import { db } from "@/utils/db";
import { MockInterview } from "@/utils/schema";
import { v4 as uuidv4 } from "uuid";
import { useUser } from "@clerk/nextjs";
import moment from "moment";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const ROLE_PRESETS = [
  {
    role: "Senior Full Stack Engineer",
    desc: "React, Next.js, Node.js, PostgreSQL, Redis, REST & GraphQL APIs",
    exp: "5",
  },
  {
    role: "Frontend Specialist",
    desc: "React, TypeScript, Next.js, Tailwind CSS, Performance Optimization, Webpack",
    exp: "3",
  },
  {
    role: "Backend & Systems Engineer",
    desc: "Go, Python, Microservices, Distributed Systems, Docker, Kubernetes, Kafka",
    exp: "4",
  },
  {
    role: "DevOps & Cloud Engineer",
    desc: "AWS, Terraform, CI/CD Pipelines, Kubernetes, Monitoring, Infrastructure as Code",
    exp: "4",
  },
];

function AddNewInterview() {
  const [openDialog, setOpenDialog] = useState(false);
  const [jobPosition, setJobPosition] = useState("");
  const [jobDesc, setJobDesc] = useState("");
  const [jobExperience, setJobExperience] = useState("");
  const [loading, setLoading] = useState(false);
  const { user } = useUser();
  const router = useRouter();

  const handleApplyPreset = (preset) => {
    setJobPosition(preset.role);
    setJobDesc(preset.desc);
    setJobExperience(preset.exp);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!jobPosition || !jobDesc || !jobExperience) {
      toast.error("Please fill in all required fields.");
      return;
    }

    setLoading(true);
    try {
      const inputPrompt = `You are a principal technical interviewer at a top technology company. Generate 5 realistic, rigorous interview questions along with comprehensive benchmark answers for a candidate with the following background:
- Target Role: ${jobPosition}
- Tech Stack / Domain: ${jobDesc}
- Experience Level: ${jobExperience} years

Requirements:
1. Provide a mix of practical system implementation, technical edge-case reasoning, and architecture/problem-solving questions appropriate for ${jobExperience} years of experience.
2. Return ONLY a valid JSON array of objects without markdown formatting, code fences, or extraneous conversational text.
3. Each object in the array must strictly have two fields: "Question" and "Answer".`;

      const result = await chatSession.sendMessage(inputPrompt);
      const responseText = result.response.text();
      
      // Clean possible code fences or unwanted markdown
      const cleanedJsonResp = responseText
        .replace(/```json/gi, "")
        .replace(/```/g, "")
        .trim();

      // Validate JSON structure
      const parsedData = JSON.parse(cleanedJsonResp);
      if (!Array.isArray(parsedData) || parsedData.length === 0) {
        throw new Error("Invalid question structure received.");
      }

      const interviewID = uuidv4();
      const mockId = uuidv4();

      // Push session record into Drizzle DB
      const resp = await db
        .insert(MockInterview)
        .values({
          id: interviewID,
          jsonMockResp: cleanedJsonResp,
          jobPosition: jobPosition.trim(),
          jobDesc: jobDesc.trim(),
          jobExperience: jobExperience.trim(),
          createdBy: user?.primaryEmailAddress?.emailAddress || "anonymous",
          createdAt: moment().format("DD-MM-YYYY"),
          mockId: mockId,
        })
        .returning({ mockId: MockInterview.mockId });

      if (resp && resp[0]?.mockId) {
        toast.success("Interview curriculum ready. Launching session...");
        setOpenDialog(false);
        router.push("/dashboard/interview/" + resp[0].mockId);
      } else {
        toast.error("Failed to initialize session record. Please try again.");
      }
    } catch (error) {
      console.error("Session Generation Error:", error);
      toast.error("Unable to generate interview questions. Please verify your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Trigger Card */}
      <div
        onClick={() => setOpenDialog(true)}
        className="group relative flex flex-col justify-between p-6 rounded-2xl border border-dashed border-zinc-700 bg-zinc-900/40 hover:bg-zinc-900/80 hover:border-blue-500/50 cursor-pointer transition-all hover:shadow-xl hover:shadow-blue-500/5 min-h-[190px]"
      >
        <div className="flex items-start justify-between">
          <div className="h-11 w-11 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all">
            <Plus className="h-5 w-5" />
          </div>
          <span className="text-[11px] font-medium tracking-wide uppercase px-2 py-0.5 rounded-full bg-zinc-800 text-zinc-400 border border-zinc-700/60">
            Quick Start
          </span>
        </div>

        <div>
          <h3 className="text-base font-semibold text-white group-hover:text-blue-400 transition-colors">
            New Interview Simulation
          </h3>
          <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
            Customize role specifications, seniority, and technical domains to practice targeted rounds.
          </p>
        </div>
      </div>

      {/* Modal Dialog */}
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="max-w-2xl bg-zinc-950 border border-zinc-800 text-zinc-100 p-6 sm:p-8 rounded-2xl shadow-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
              Configure Interview Simulation
            </DialogTitle>
            <DialogDescription className="text-sm text-zinc-400">
              Provide your target position and tech stack to calibrate question difficulty and grading criteria.
            </DialogDescription>
          </DialogHeader>

          {/* Quick Presets */}
          <div className="my-2">
            <label className="text-xs font-medium uppercase tracking-wider text-zinc-400 block mb-2">
              Quick Role Presets
            </label>
            <div className="flex flex-wrap gap-2">
              {ROLE_PRESETS.map((p, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleApplyPreset(p)}
                  className="text-xs px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white hover:bg-zinc-800 hover:border-zinc-700 transition-colors flex items-center gap-1.5"
                >
                  <Briefcase className="h-3 w-3 text-blue-400" />
                  {p.role}
                </button>
              ))}
            </div>
          </div>

          <form onSubmit={onSubmit} className="space-y-4 mt-2">
            <div>
              <label className="text-xs font-semibold text-zinc-300 flex items-center gap-1.5 mb-1.5">
                <Briefcase className="h-3.5 w-3.5 text-blue-400" />
                Target Role / Position Title
              </label>
              <Input
                placeholder="e.g. Senior Full Stack Engineer"
                value={jobPosition}
                required
                className="bg-zinc-900/90 border-zinc-800 text-white placeholder:text-zinc-600 focus:border-blue-500 rounded-xl"
                onChange={(e) => setJobPosition(e.target.value)}
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-zinc-300 flex items-center gap-1.5 mb-1.5">
                <Code2 className="h-3.5 w-3.5 text-indigo-400" />
                Key Technologies & Topics
              </label>
              <Textarea
                placeholder="e.g. Next.js, Node.js, PostgreSQL, Distributed Systems, Microservices"
                value={jobDesc}
                required
                rows={3}
                className="bg-zinc-900/90 border-zinc-800 text-white placeholder:text-zinc-600 focus:border-blue-500 rounded-xl resize-none"
                onChange={(e) => setJobDesc(e.target.value)}
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-zinc-300 flex items-center gap-1.5 mb-1.5">
                <Clock className="h-3.5 w-3.5 text-emerald-400" />
                Years of Relevant Experience
              </label>
              <Input
                placeholder="e.g. 4"
                type="number"
                min="0"
                max="30"
                value={jobExperience}
                required
                className="bg-zinc-900/90 border-zinc-800 text-white placeholder:text-zinc-600 focus:border-blue-500 rounded-xl"
                onChange={(e) => setJobExperience(e.target.value)}
              />
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-zinc-800/80">
              <Button
                type="button"
                variant="ghost"
                disabled={loading}
                onClick={() => setOpenDialog(false)}
                className="text-zinc-400 hover:text-white hover:bg-zinc-900"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={loading}
                className="bg-blue-600 hover:bg-blue-500 text-white font-medium rounded-xl px-5 transition-all shadow-md shadow-blue-600/20"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin text-white" />
                    Preparing Session...
                  </span>
                ) : (
                  "Launch Simulation"
                )}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default AddNewInterview;
