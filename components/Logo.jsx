"use client";
import React from "react";
import Link from "next/link";

export function PrepLogoIcon({ className = "h-5 w-5" }) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Precision Pillar / Stem */}
      <rect x="6" y="5" width="4.5" height="22" rx="2.25" fill="currentColor" />
      {/* Precision Geometric Loop */}
      <path
        d="M10.5 5H18C21.5899 5 24.5 7.91015 24.5 11.5C24.5 15.0899 21.5899 18 18 18H10.5V5Z"
        fill="currentColor"
      />
      {/* Aperture negative space inside P */}
      <circle cx="15" cy="11.5" r="2.75" fill="#09090b" />
      {/* Technical calibration dot */}
      <circle cx="21" cy="23.5" r="2.25" fill="#3b82f6" />
    </svg>
  );
}

export default function Logo({ href = "/dashboard", className = "", iconOnly = false }) {
  const content = (
    <div className={`flex items-center gap-2.5 group cursor-pointer ${className}`}>
      {/* Minimalist Tech Monogram Container */}
      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-zinc-900 border border-zinc-800 text-white shadow-inner group-hover:border-zinc-700 group-hover:bg-zinc-800/80 transition-all">
        <PrepLogoIcon className="h-5 w-5 text-zinc-100 group-hover:text-white transition-colors" />
      </div>

      {!iconOnly && (
        <div className="flex items-center">
          <span className="text-base font-bold tracking-tight text-zinc-100 group-hover:text-white transition-colors font-sans">
            PrepMaster
          </span>
          <span className="h-1.5 w-1.5 rounded-full bg-blue-500 mb-2 ml-0.5" />
        </div>
      )}
    </div>
  );

  if (href) {
    return <Link href={href} className="inline-flex items-center">{content}</Link>;
  }

  return content;
}
