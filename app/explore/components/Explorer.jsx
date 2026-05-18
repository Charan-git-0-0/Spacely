"use client";
import { useRef, useState, useEffect, useCallback, Suspense } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, Grid, Environment, Splat } from "@react-three/drei";
import * as THREE from "three";
import JoystickControl from "./JoystickControl";
import HUD from "./HUD";
import UploadZone from "./UploadZone";

// ─────────────────────────────────────────
// Procedural Character (box-body robot)
// ─────────────────────────────────────────
function Character({ position, rotation, isWalking }) {
  const groupRef = useRef();
  const leftArmRef = useRef();
  const rightArmRef = useRef();
  const leftLegRef = useRef();
  const rightLegRef = useRef();
  const t = useRef(0);

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    // Smooth position/rotation update
    groupRef.current.position.lerp(
      new THREE.Vector3(position.current.x, 0, position.current.z),
      0.15
    );
    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      rotation.current,
      0.12
    );

    // Walk animation
    if (isWalking.current) {
      t.current += delta * 8;
    } else {
      t.current += delta * 1.5; // idle sway
    }

    const swing = isWalking.current ? Math.sin(t.current) * 0.6 : Math.sin(t.current) * 0.05;
    if (leftArmRef.current)  leftArmRef.current.rotation.x  =  swing;
    if (rightArmRef.current) rightArmRef.current.rotation.x = -swing;
    if (leftLegRef.current)  leftLegRef.current.rotation.x  = -swing;
    if (rightLegRef.current) rightLegRef.current.rotation.x  =  swing;
  });

  const bodyMat  = <meshStandardMaterial color="#4F8CFF" roughness={0.3} metalness={0.6} />;
  const darkMat  = <meshStandardMaterial color="#23232D" roughness={0.4} metalness={0.5} />;
  const glowMat  = <meshStandardMaterial color="#6CE5FF" emissive="#6CE5FF" emissiveIntensity={0.6} />;

  return (
    <group ref={groupRef}>
      {/* Body */}
      <mesh position={[0, 0.75, 0]} castShadow>
        <boxGeometry args={[0.45, 0.55, 0.25]} />
        {bodyMat}
      </mesh>

      {/* Head */}
      <mesh position={[0, 1.22, 0]} castShadow>
        <boxGeometry args={[0.38, 0.38, 0.38]} />
        {bodyMat}
      </mesh>

      {/* Visor / eyes */}
      <mesh position={[0, 1.22, 0.2]}>
        <boxGeometry args={[0.24, 0.08, 0.02]} />
        {glowMat}
      </mesh>

      {/* Neck */}
      <mesh position={[0, 1.02, 0]}>
        <cylinderGeometry args={[0.08, 0.08, 0.1, 8]} />
        {darkMat}
      </mesh>

      {/* Left Arm */}
      <group ref={leftArmRef} position={[-0.3, 0.78, 0]}>
        <mesh position={[0, -0.2, 0]} castShadow>
          <boxGeometry args={[0.15, 0.45, 0.15]} />
          {darkMat}
        </mesh>
      </group>

      {/* Right Arm */}
      <group ref={rightArmRef} position={[0.3, 0.78, 0]}>
        <mesh position={[0, -0.2, 0]} castShadow>
          <boxGeometry args={[0.15, 0.45, 0.15]} />
          {darkMat}
        </mesh>
      </group>

      {/* Left Leg */}
      <group ref={leftLegRef} position={[-0.13, 0.48, 0]}>
        <mesh position={[0, -0.25, 0]} castShadow>
          <boxGeometry args={[0.18, 0.5, 0.18]} />
          {bodyMat}
        </mesh>
      </group>

      {/* Right Leg */}
      <group ref={rightLegRef} position={[0.13, 0.48, 0]}>
        <mesh position={[0, -0.25, 0]} castShadow>
          <boxGeometry args={[0.18, 0.5, 0.18]} />
          {bodyMat}
        </mesh>
      </group>
    </group>
  );
}

// ─────────────────────────────────────────
// Camera Follow
// ─────────────────────────────────────────
function CameraFollow({ charPos, charRot, mode }) {
  const { camera } = useThree();
  const orbitRef = useRef();

  useFrame(() => {
    if (mode.current !== "follow") return;
    const offset = new THREE.Vector3(
      Math.sin(charRot.current) * -4,
      2.5,
      Math.cos(charRot.current) * -4
    );
    const target = new THREE.Vector3(charPos.current.x, 1, charPos.current.z);
    camera.position.lerp(target.clone().add(offset), 0.08);
    camera.lookAt(target);
  });

  return null;
}

// ─────────────────────────────────────────
// Scene Content
// ─────────────────────────────────────────
function SceneContent({ splatUrl, charPos, charRot, isWalking, cameraMode }) {
  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 10, 5]} intensity={1.2} castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-camera-near={0.1}
        shadow-camera-far={50}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
      />
      <pointLight position={[-5, 5, -5]} intensity={0.5} color="#4F8CFF" />
      <pointLight position={[5, 3, 5]} intensity={0.3} color="#7B61FF" />

      {/* Ground */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[40, 40]} />
        <meshStandardMaterial color="#16161D" roughness={0.8} />
      </mesh>

      <Grid
        args={[40, 40]}
        cellSize={1}
        cellThickness={0.5}
        cellColor="#4F8CFF"
        sectionSize={5}
        sectionThickness={1}
        sectionColor="#7B61FF"
        fadeDistance={25}
        fadeStrength={1}
        infiniteGrid={false}
        position={[0, 0.01, 0]}
      />

      {/* Gaussian Splat */}
      {splatUrl && (
        <Suspense fallback={null}>
          <Splat src={splatUrl} position={[0, 0, 0]} />
        </Suspense>
      )}

      {/* Room placeholder when no splat loaded */}
      {!splatUrl && <DemoRoom />}

      {/* Character */}
      <Character position={charPos} rotation={charRot} isWalking={isWalking} />

      {/* Camera */}
      <CameraFollow charPos={charPos} charRot={charRot} mode={cameraMode} />
    </>
  );
}

// ─────────────────────────────────────────
// Demo Room (shown when no splat loaded)
// ─────────────────────────────────────────
function DemoRoom() {
  const wallMat = <meshStandardMaterial color="#1e1e2e" roughness={0.9} side={THREE.BackSide} />;
  return (
    <group>
      {/* Room box */}
      <mesh position={[0, 2.5, 0]}>
        <boxGeometry args={[10, 5, 10]} />
        {wallMat}
      </mesh>
      {/* Floating accent cubes */}
      {[[-2, 0.3, -2], [2, 0.3, -3], [-3, 0.3, 2]].map(([x, y, z], i) => (
        <mesh key={i} position={[x, y, z]} castShadow>
          <boxGeometry args={[0.6, 0.6, 0.6]} />
          <meshStandardMaterial
            color={["#4F8CFF", "#7B61FF", "#6CE5FF"][i]}
            emissive={["#4F8CFF", "#7B61FF", "#6CE5FF"][i]}
            emissiveIntensity={0.2}
            roughness={0.3}
            metalness={0.7}
          />
        </mesh>
      ))}
      {/* Simple furniture: sofa block */}
      <mesh position={[0, 0.3, -3.5]} castShadow>
        <boxGeometry args={[3, 0.6, 1.2]} />
        <meshStandardMaterial color="#23232D" roughness={0.8} />
      </mesh>
      <mesh position={[0, 0.9, -4.1]} castShadow>
        <boxGeometry args={[3, 0.6, 0.2]} />
        <meshStandardMaterial color="#2a2a3a" roughness={0.8} />
      </mesh>
    </group>
  );
}

// ─────────────────────────────────────────
// Main Controller (keyboard + joystick)
// ─────────────────────────────────────────
function useCharacterController() {
  const charPos  = useRef({ x: 0, z: 0 });
  const charRot  = useRef(0);
  const isWalking = useRef(false);
  const keys     = useRef({});
  const joystick = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const down = (e) => { keys.current[e.code] = true; };
    const up   = (e) => { keys.current[e.code] = false; };
    window.addEventListener("keydown", down);
    window.addEventListener("keyup", up);
    return () => {
      window.removeEventListener("keydown", down);
      window.removeEventListener("keyup", up);
    };
  }, []);

  // Called every frame from a useFrame inside Canvas
  const update = useCallback((delta) => {
    const speed = 3.5;
    let dx = joystick.current.x;
    let dz = -joystick.current.y;

    if (keys.current["KeyW"] || keys.current["ArrowUp"])    dz = -1;
    if (keys.current["KeyS"] || keys.current["ArrowDown"])  dz =  1;
    if (keys.current["KeyA"] || keys.current["ArrowLeft"])  dx = -1;
    if (keys.current["KeyD"] || keys.current["ArrowRight"]) dx =  1;

    const moving = Math.abs(dx) > 0.05 || Math.abs(dz) > 0.05;
    isWalking.current = moving;

    if (moving) {
      const targetAngle = Math.atan2(dx, dz);
      charRot.current = targetAngle;
      charPos.current.x += Math.sin(targetAngle) * speed * delta;
      charPos.current.z += Math.cos(targetAngle) * speed * delta;

      // Clamp to room bounds
      charPos.current.x = Math.max(-4.5, Math.min(4.5, charPos.current.x));
      charPos.current.z = Math.max(-4.5, Math.min(4.5, charPos.current.z));
    }
  }, []);

  return { charPos, charRot, isWalking, joystick, update };
}

// Frame updater inside Canvas
function ControllerTick({ update }) {
  useFrame((_, delta) => update(delta));
  return null;
}

// ─────────────────────────────────────────
// Main Explorer Component
// ─────────────────────────────────────────
export default function Explorer() {
  const [splatUrl, setSplatUrl] = useState(null);
  const [cameraMode, setCameraMode] = useState("follow"); // "follow" | "orbit"
  const cameraModeRef = useRef("follow");
  const [showUpload, setShowUpload] = useState(false);
  const [showHelp, setShowHelp] = useState(true);

  const { charPos, charRot, isWalking, joystick, update } = useCharacterController();

  const toggleCameraMode = () => {
    const next = cameraModeRef.current === "follow" ? "orbit" : "follow";
    cameraModeRef.current = next;
    setCameraMode(next);
  };

  const handleSplatLoad = (url) => {
    setSplatUrl(url);
    setShowUpload(false);
  };

  return (
    <div className="relative w-full h-screen bg-[#0B0B0F] overflow-hidden">
      {/* Three.js Canvas */}
      <Canvas
        shadows
        camera={{ position: [0, 3, 6], fov: 60 }}
        gl={{ antialias: true, alpha: false }}
        style={{ background: "#0B0B0F" }}
      >
        <fog attach="fog" args={["#0B0B0F", 15, 40]} />

        <SceneContent
          splatUrl={splatUrl}
          charPos={charPos}
          charRot={charRot}
          isWalking={isWalking}
          cameraMode={cameraModeRef}
        />

        {cameraMode === "orbit" && (
          <OrbitControls
            enablePan={true}
            enableZoom={true}
            minDistance={2}
            maxDistance={20}
          />
        )}

        <ControllerTick update={update} />
      </Canvas>

      {/* HUD Overlay */}
      <HUD
        cameraMode={cameraMode}
        onToggleCamera={toggleCameraMode}
        onOpenUpload={() => setShowUpload(true)}
        onToggleHelp={() => setShowHelp(v => !v)}
        showHelp={showHelp}
        hasSplat={!!splatUrl}
      />

      {/* Joystick */}
      <JoystickControl joystick={joystick} />

      {/* Upload modal */}
      {showUpload && (
        <UploadZone
          onLoad={handleSplatLoad}
          onClose={() => setShowUpload(false)}
        />
      )}

      {/* Back to home */}
      <a
        href="/"
        className="absolute top-5 left-5 z-40 glass px-4 py-2 rounded-full text-sm flex items-center gap-2 hover:glow-blue transition-all"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M19 12H5M12 19l-7-7 7-7"/>
        </svg>
        Back
      </a>
    </div>
  );
}
