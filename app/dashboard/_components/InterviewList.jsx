"use client";
import { db } from "@/utils/db";
import { MockInterview } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import { eq, desc } from "drizzle-orm";
import React, { useEffect, useState } from "react";
import InterviewItemCard from "./InterviewItemCard";
import { History, Sparkles, Inbox, Search } from "lucide-react";

function InterviewList() {
  const { user } = useUser();
  const [interviewList, setInterviewList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (user) {
      GetInterviewList();
    }
  }, [user]);

  const GetInterviewList = async () => {
    try {
      setLoading(true);
      const email = user?.primaryEmailAddress?.emailAddress;
      if (!email) return;

      const result = await db
        .select()
        .from(MockInterview)
        .where(eq(MockInterview.createdBy, email))
        .orderBy(desc(MockInterview.id));

      setInterviewList(result || []);
    } catch (error) {
      console.error("Failed to load interview history:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredList = interviewList.filter(
    (item) =>
      item.jobPosition?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.jobDesc?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="mt-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
            <History className="h-5 w-5 text-blue-400" />
            Interview Simulation History
            {!loading && (
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-zinc-800 text-zinc-400 border border-zinc-700/60 ml-1">
                {interviewList.length}
              </span>
            )}
          </h2>
          <p className="text-xs text-zinc-400 mt-1">
            Review your previous simulations, inspect evaluations, or retake questions.
          </p>
        </div>

        {interviewList.length > 2 && (
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-zinc-500" />
            <input
              type="text"
              placeholder="Filter by role or tech..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl bg-zinc-900 border border-zinc-800 text-white placeholder:text-zinc-600 focus:outline-none focus:border-zinc-700"
            />
          </div>
        )}
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {[1, 2, 3].map((_, i) => (
            <div
              key={i}
              className="h-44 rounded-2xl border border-zinc-800 bg-zinc-900/30 animate-pulse p-5 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="h-4 w-28 bg-zinc-800 rounded-md" />
                <div className="h-5 w-48 bg-zinc-800 rounded-md" />
                <div className="h-3 w-full bg-zinc-800/60 rounded-md" />
              </div>
              <div className="grid grid-cols-2 gap-2 pt-4">
                <div className="h-8 bg-zinc-800 rounded-lg" />
                <div className="h-8 bg-zinc-800 rounded-lg" />
              </div>
            </div>
          ))}
        </div>
      ) : filteredList.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-12 rounded-2xl border border-zinc-800/80 bg-zinc-900/20 text-center">
          <div className="h-12 w-12 rounded-full bg-zinc-800/60 border border-zinc-700/60 flex items-center justify-center text-zinc-400 mb-3">
            <Inbox className="h-6 w-6" />
          </div>
          <h3 className="text-sm font-semibold text-white">No interview records found</h3>
          <p className="text-xs text-zinc-400 mt-1 max-w-sm">
            {searchQuery
              ? "No sessions match your search query. Try clearing your search."
              : "Launch your first simulation session above to begin practicing."}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredList.map((interview, index) => (
            <InterviewItemCard interview={interview} key={interview.id || index} />
          ))}
        </div>
      )}
    </div>
  );
}

export default InterviewList;