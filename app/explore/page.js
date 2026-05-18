"use client";
import dynamic from "next/dynamic";

const Explorer = dynamic(() => import("./components/Explorer"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-screen bg-[#0B0B0F] flex flex-col items-center justify-center gap-4">
      <div className="w-12 h-12 rounded-full border-2 border-[#4F8CFF] border-t-transparent animate-spin" />
      <p className="text-[#9CA3AF] text-sm">Loading 3D Explorer...</p>
    </div>
  ),
});

export default function ExplorePage() {
  return <Explorer />;
}
