"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import React from "react";
import { Briefcase, Calendar, Clock, Play, FileCheck2, ArrowRight } from "lucide-react";

function InterviewItemCard({ interview }) {
  const router = useRouter();

  const onStart = () => {
    router.push("/dashboard/interview/" + interview?.mockId);
  };

  const onFeedbackPress = () => {
    router.push("/dashboard/interview/" + interview?.mockId + "/feedback");
  };

  return (
    <div className="group relative flex flex-col justify-between p-5 rounded-2xl border border-zinc-800 bg-zinc-900/50 hover:bg-zinc-900/80 hover:border-zinc-700 transition-all hover:shadow-xl hover:shadow-black/50">
      <div>
        {/* Top Badges */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium bg-blue-500/10 text-blue-400 border border-blue-500/20">
            <Clock className="h-3 w-3" />
            {interview?.jobExperience} Years Exp
          </span>
          <span className="text-[11px] text-zinc-500 flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            {interview?.createdAt || "Recent"}
          </span>
        </div>

        {/* Role Title */}
        <h3 className="font-semibold text-base text-zinc-100 group-hover:text-white transition-colors line-clamp-1">
          {interview?.jobPosition}
        </h3>

        {/* Tech Stack Preview */}
        {interview?.jobDesc && (
          <p className="text-xs text-zinc-400 mt-2 line-clamp-2 leading-relaxed">
            {interview?.jobDesc}
          </p>
        )}
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-2 gap-2 mt-5 pt-4 border-t border-zinc-800/80">
        <Button
          onClick={onFeedbackPress}
          size="sm"
          variant="outline"
          className="w-full text-xs font-medium border-zinc-800 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white rounded-xl flex items-center justify-center gap-1.5"
        >
          <FileCheck2 className="h-3.5 w-3.5 text-blue-400" />
          Scorecard
        </Button>
        <Button
          onClick={onStart}
          size="sm"
          className="w-full text-xs font-medium bg-blue-600 hover:bg-blue-500 text-white rounded-xl flex items-center justify-center gap-1.5 shadow-md shadow-blue-600/20"
        >
          <Play className="h-3.5 w-3.5 fill-current" />
          Start
        </Button>
      </div>
    </div>
  );
}

export default InterviewItemCard;