import React, { useEffect, useRef } from "react";

const AnimatedBackground = () => {
  const blobRefs = useRef([]);
  const initialPositions = [
    { x: -20, y: 0 },
    { x: 30, y: -20 },
    { x: -10, y: 40 },
    { x: 40, y: 50 },
  ];

  useEffect(() => {
    let requestId;

    const handleScroll = () => {
      const scrollY = window.pageYOffset;

      blobRefs.current.forEach((blob, index) => {
        if (!blob) return;
        const initialPos = initialPositions[index];

        const xOffset = Math.sin(scrollY / 140 + index * 0.7) * 90;
        const yOffset = Math.cos(scrollY / 140 + index * 0.7) * 45;

        const x = initialPos.x + xOffset;
        const y = initialPos.y + yOffset;

        blob.style.transform = `translate(${x}px, ${y}px)`;
        blob.style.transition = "transform 1.8s cubic-bezier(0.16, 1, 0.3, 1)";
      });
    };

    const onScroll = () => {
      if (requestId) cancelAnimationFrame(requestId);
      requestId = requestAnimationFrame(handleScroll);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (requestId) cancelAnimationFrame(requestId);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden transition-colors duration-700">
      {/* Dynamic Aurora Ambient Blobs */}
      <div className="absolute inset-0">
        {/* Blob 1 - Top Left: Blue / Cyan */}
        <div
          ref={(ref) => (blobRefs.current[0] = ref)}
          className="absolute -top-[10%] -left-[10%] w-[55vw] h-[55vw] max-w-[650px] max-h-[650px] rounded-full filter blur-[90px] sm:blur-[130px] opacity-70 dark:opacity-40 bg-gradient-to-tr from-sky-400/40 via-blue-500/30 to-indigo-400/30 dark:from-blue-600/25 dark:via-sky-500/20 dark:to-indigo-600/20 animate-blob"
        />

        {/* Blob 2 - Top Right: Purple / Violet / Magenta */}
        <div
          ref={(ref) => (blobRefs.current[1] = ref)}
          className="absolute top-[15%] -right-[10%] w-[50vw] h-[50vw] max-w-[600px] max-h-[600px] rounded-full filter blur-[90px] sm:blur-[140px] opacity-60 dark:opacity-35 bg-gradient-to-bl from-purple-400/35 via-indigo-400/25 to-pink-400/25 dark:from-purple-600/25 dark:via-indigo-600/20 dark:to-pink-600/15 animate-blob animation-delay-2000"
        />

        {/* Blob 3 - Bottom Left: Turquoise / Teal / Sky */}
        <div
          ref={(ref) => (blobRefs.current[2] = ref)}
          className="absolute top-[50%] left-[5%] w-[45vw] h-[45vw] max-w-[550px] max-h-[550px] rounded-full filter blur-[100px] sm:blur-[150px] opacity-50 dark:opacity-30 bg-gradient-to-tr from-cyan-400/30 via-teal-400/20 to-blue-400/25 dark:from-blue-700/20 dark:via-teal-600/15 dark:to-indigo-700/20 animate-blob animation-delay-4000"
        />

        {/* Blob 4 - Bottom Right: Amber / Coral / Lavender */}
        <div
          ref={(ref) => (blobRefs.current[3] = ref)}
          className="absolute bottom-[-10%] right-[10%] w-[50vw] h-[50vw] max-w-[600px] max-h-[600px] rounded-full filter blur-[90px] sm:blur-[130px] opacity-50 dark:opacity-35 bg-gradient-to-tl from-indigo-300/35 via-purple-300/25 to-sky-300/30 dark:from-indigo-600/25 dark:via-purple-800/20 dark:to-blue-800/20 animate-blob"
        />
      </div>

      {/* macOS Subtle Wallpaper Grid/Noise Pattern */}
      <div className="absolute inset-0 opacity-40 dark:opacity-20 bg-[radial-gradient(#000000_1px,transparent_1px)] dark:bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />
    </div>
  );
};

export default AnimatedBackground;