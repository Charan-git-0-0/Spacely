"use client";
import { useRef, useState } from "react";

export default function UploadZone({ onLoad, onClose }) {
  const inputRef = useRef(null);
  const [dragging, setDragging] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [splatUrl, setSplatUrl] = useState("");

  const handleFile = (file) => {
    if (!file) return;
    const ext = file.name.split(".").pop().toLowerCase();
    if (!["splat", "ply"].includes(ext)) {
      setError("Please upload a .splat or .ply file.");
      return;
    }
    setError("");
    setLoading(true);
    const url = URL.createObjectURL(file);
    setTimeout(() => {
      setLoading(false);
      onLoad(url);
    }, 500);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    handleFile(e.dataTransfer.files[0]);
  };

  const handleUrlLoad = () => {
    if (!splatUrl.trim()) return;
    onLoad(splatUrl.trim());
  };

  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div className="glass-strong rounded-3xl p-8 w-full max-w-md mx-4 glow-blue">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-lg font-bold">Load Your Space</h2>
            <p className="text-xs text-[#9CA3AF] mt-1">Upload a .splat or .ply file to explore your room in 3D</p>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-lg glass flex items-center justify-center hover:text-white text-[#9CA3AF] transition-colors">
            ✕
          </button>
        </div>

        {/* Drop zone */}
        <div
          onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
          onDragLeave={() => setDragging(false)}
          onDrop={handleDrop}
          onClick={() => inputRef.current?.click()}
          className={`relative border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all duration-300 ${
            dragging
              ? "border-[#4F8CFF] bg-[#4F8CFF]/5"
              : "border-white/10 hover:border-[#4F8CFF]/40 hover:bg-white/[0.02]"
          }`}
        >
          <input
            ref={inputRef}
            type="file"
            accept=".splat,.ply"
            className="hidden"
            onChange={(e) => handleFile(e.target.files[0])}
          />
          {loading ? (
            <div className="flex flex-col items-center gap-3">
              <div className="w-10 h-10 rounded-full border-2 border-[#4F8CFF] border-t-transparent animate-spin" />
              <p className="text-sm text-[#9CA3AF]">Loading splat...</p>
            </div>
          ) : (
            <>
              <div className="text-3xl mb-3">🌐</div>
              <p className="text-sm font-medium mb-1">Drop .splat or .ply file here</p>
              <p className="text-xs text-[#9CA3AF]">or click to browse</p>
              {error && <p className="text-xs text-red-400 mt-2">{error}</p>}
            </>
          )}
        </div>

        {/* URL input */}
        <div className="mt-4">
          <p className="text-xs text-[#9CA3AF] mb-2">Or load from URL:</p>
          <div className="flex gap-2">
            <input
              type="text"
              value={splatUrl}
              onChange={(e) => setSplatUrl(e.target.value)}
              placeholder="https://example.com/scene.splat"
              className="flex-1 bg-[#0B0B0F]/60 border border-white/10 rounded-xl px-3 py-2 text-xs text-white placeholder:text-[#9CA3AF]/40 focus:outline-none focus:border-[#4F8CFF]/50"
            />
            <button
              onClick={handleUrlLoad}
              className="px-4 py-2 rounded-xl bg-[#4F8CFF]/20 border border-[#4F8CFF]/30 text-xs text-[#4F8CFF] hover:bg-[#4F8CFF]/30 transition-all"
            >
              Load
            </button>
          </div>
        </div>

        {/* Info */}
        <div className="mt-5 p-4 rounded-xl bg-[#0B0B0F]/40 border border-white/5">
          <p className="text-xs font-medium text-[#9CA3AF] mb-2">How to generate a .splat file:</p>
          <ol className="text-xs text-[#9CA3AF]/70 space-y-1 list-decimal list-inside">
            <li>Capture 20–40 photos around the room</li>
            <li>Upload to <span className="text-[#4F8CFF]">Luma AI</span> (lumalabs.ai) — free tier</li>
            <li>Download the generated .splat file</li>
            <li>Upload here to explore</li>
          </ol>
        </div>
      </div>
    </div>
  );
}
