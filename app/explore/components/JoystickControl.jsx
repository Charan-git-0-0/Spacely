"use client";
import { useEffect, useRef } from "react";

export default function JoystickControl({ joystick }) {
  const containerRef = useRef(null);
  const instanceRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;
    let nipplejs;

    const init = async () => {
      nipplejs = (await import("nipplejs")).default;
      instanceRef.current = nipplejs.create({
        zone: containerRef.current,
        mode: "static",
        position: { left: "50%", top: "50%" },
        color: "#4F8CFF",
        size: 100,
        restOpacity: 0.6,
        dynamicPage: true,
      });

      instanceRef.current.on("move", (_, data) => {
        const force = Math.min(data.force, 1);
        const angle = data.angle.radian;
        joystick.current.x =  Math.cos(angle) * force;
        joystick.current.y = -Math.sin(angle) * force;
      });

      instanceRef.current.on("end", () => {
        joystick.current.x = 0;
        joystick.current.y = 0;
      });
    };

    init();

    return () => {
      if (instanceRef.current) {
        instanceRef.current.destroy();
      }
    };
  }, [joystick]);

  return (
    <div
      ref={containerRef}
      className="absolute bottom-8 left-8 z-30 w-28 h-28 rounded-full"
      style={{ touchAction: "none" }}
    />
  );
}
