"use client";

export default function HUD({ cameraMode, onToggleCamera, onOpenUpload, onToggleHelp, showHelp, hasSplat }) {
  return (
    <>
      {/* Top-right controls toolbar */}
      <div className="absolute top-5 right-5 z-40 flex flex-col gap-2">
        {/* Camera mode toggle */}
        <button
          onClick={onToggleCamera}
          title={cameraMode === "follow" ? "Switch to Orbit Camera" : "Switch to Follow Camera"}
          className="glass px-4 py-2.5 rounded-xl text-xs font-medium flex items-center gap-2 hover:glow-blue transition-all"
        >
          {cameraMode === "follow" ? (
            <>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#4F8CFF" strokeWidth="2">
                <circle cx="12" cy="12" r="3"/><path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83"/>
              </svg>
              <span className="text-[#4F8CFF]">Follow</span>
            </>
          ) : (
            <>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#7B61FF" strokeWidth="2">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
              </svg>
              <span className="text-[#7B61FF]">Orbit</span>
            </>
          )}
        </button>

        {/* Upload splat */}
        <button
          onClick={onOpenUpload}
          className="glass px-4 py-2.5 rounded-xl text-xs font-medium flex items-center gap-2 hover:glow-violet transition-all"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#7B61FF" strokeWidth="2">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
            <polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/>
          </svg>
          <span className="text-[#7B61FF]">Load Space</span>
        </button>

        {/* Help */}
        <button
          onClick={onToggleHelp}
          className="glass px-4 py-2.5 rounded-xl text-xs font-medium flex items-center gap-2 hover:glow-cyan transition-all"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#6CE5FF" strokeWidth="2">
            <circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/>
          </svg>
          <span className="text-[#6CE5FF]">Help</span>
        </button>
      </div>

      {/* Status badge */}
      <div className="absolute top-5 left-1/2 -translate-x-1/2 z-40">
        <div className="glass px-4 py-2 rounded-full flex items-center gap-2">
          <span className={`w-2 h-2 rounded-full ${hasSplat ? "bg-[#4F8CFF]" : "bg-[#9CA3AF]"} animate-pulse`} />
          <span className="text-xs text-[#9CA3AF]">
            {hasSplat ? "Gaussian Splat Loaded" : "Demo Room — Upload a .splat to explore your space"}
          </span>
        </div>
      </div>

      {/* Help overlay */}
      {showHelp && (
        <div className="absolute bottom-8 right-8 z-40 glass rounded-2xl p-5 w-52">
          <p className="text-xs font-semibold text-white mb-3">Controls</p>
          <div className="space-y-2 text-[11px] text-[#9CA3AF]">
            <div className="flex justify-between"><span>Move</span><span className="text-white font-mono">WASD / ↑↓←→</span></div>
            <div className="flex justify-between"><span>Mobile</span><span className="text-white">Joystick ↙</span></div>
            <div className="flex justify-between"><span>Camera</span><span className="text-white">Follow / Orbit</span></div>
            <div className="flex justify-between"><span>Orbit drag</span><span className="text-white font-mono">Mouse</span></div>
            <div className="flex justify-between"><span>Zoom</span><span className="text-white font-mono">Scroll</span></div>
          </div>
          <div className="border-t border-white/5 mt-3 pt-3">
            <p className="text-[11px] text-[#9CA3AF]">
              Upload a <span className="text-[#4F8CFF]">.splat</span> or <span className="text-[#4F8CFF]">.ply</span> file
              to view your room in Gaussian Splatting.
            </p>
          </div>
        </div>
      )}

      {/* Mobile joystick hint */}
      <div className="absolute bottom-40 left-16 z-30 text-[10px] text-[#9CA3AF]/40 md:hidden pointer-events-none">
        Joystick
      </div>
    </>
  );
}
