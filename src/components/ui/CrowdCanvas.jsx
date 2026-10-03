import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import PropTypes from "prop-types";

const randomBetween = (min, max) => min + Math.random() * (max - min);

const CrowdCanvas = ({ src, rows = 15, cols = 7, maxPeeps = 24 }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return undefined;

    let disposed = false;
    let isVisible = false;
    let isAnimating = false;
    let reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let stageWidth = 0;
    let stageHeight = 0;
    let pixelRatio = 1;
    let frames = [];
    let peeps = [];
    let intersectionObserver;
    let resizeObserver;

    const image = new Image();

    const render = () => {
      context.clearRect(0, 0, stageWidth, stageHeight);
      [...peeps].sort((a, b) => a.depth - b.depth).forEach((peep) => {
        context.save();
        context.translate(peep.x + (peep.scaleX < 0 ? peep.width : 0), peep.y);
        context.scale(peep.scaleX, 1);
        context.drawImage(
          image,
          peep.frame.x,
          peep.frame.y,
          peep.frame.width,
          peep.frame.height,
          0,
          0,
          peep.width,
          peep.height,
        );
        context.restore();
      });
    };

    const stopAnimation = () => {
      if (!isAnimating) return;
      isAnimating = false;
      gsap.ticker.remove(render);
      peeps.forEach((peep) => {
        peep.walk?.kill();
        peep.bob?.kill();
      });
    };

    const beginWalk = (peep, enterInScene = false) => {
      if (disposed || !isAnimating) return;

      peep.bob?.kill();
      const direction = Math.random() > 0.5 ? 1 : -1;
      const startX = enterInScene
        ? randomBetween(0, Math.max(0, stageWidth - peep.width))
        : direction === 1
          ? -peep.width
          : stageWidth + peep.width;
      const endX = direction === 1 ? stageWidth : -peep.width;
      peep.scaleX = direction;
      peep.x = startX;
      peep.y = stageHeight - peep.height + randomBetween(-stageHeight * 0.42, stageHeight * 0.12);
      peep.depth = peep.y + peep.height;

      peep.walk = gsap.to(peep, {
        x: endX,
        duration: Math.max(4.5, (stageWidth + peep.width * 2) / 45),
        ease: "none",
        onComplete: () => beginWalk(peep),
      });
      peep.bob = gsap.to(peep, {
        y: peep.y - 4,
        duration: 0.45,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    };

    const setStaticPositions = () => {
      const gap = stageWidth / (peeps.length + 1);
      peeps.forEach((peep, index) => {
        peep.scaleX = 1;
        peep.x = gap * (index + 1) - peep.width / 2;
        peep.y = stageHeight - peep.height + randomBetween(-stageHeight * 0.42, stageHeight * 0.12);
        peep.depth = peep.y + peep.height;
      });
      render();
    };

    const startAnimation = () => {
      if (disposed || isAnimating || reducedMotion || !frames.length) return;
      isAnimating = true;
      peeps.forEach((peep) => beginWalk(peep, true));
      gsap.ticker.add(render);
      render();
    };

    const createCrowd = () => {
      stopAnimation();
      const targetCount = Math.min(maxPeeps, stageWidth < 520 ? 60 : 60, frames.length);
      const shuffledFrames = [...frames].sort(() => Math.random() - 0.5);
      peeps = shuffledFrames.slice(0, targetCount).map((frame) => {
        const height = stageHeight * randomBetween(0.34, 0.54);
        return {
          frame,
          width: (frame.width / frame.height) * height,
          height,
          x: 0,
          y: 0,
          depth: 0,
          scaleX: 1,
          walk: null,
          bob: null,
        };
      });

      setStaticPositions();
      if (isVisible && !reducedMotion) startAnimation();
    };

    const resize = () => {
      const bounds = canvas.getBoundingClientRect();
      if (!bounds.width || !bounds.height) return;

      stageWidth = bounds.width;
      stageHeight = bounds.height;
      pixelRatio = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.round(stageWidth * pixelRatio);
      canvas.height = Math.round(stageHeight * pixelRatio);
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);

      if (frames.length) createCrowd();
    };

    const handleImageLoad = () => {
      if (disposed || !image.naturalWidth || !image.naturalHeight) return;

      const frameWidth = image.naturalWidth / rows;
      const frameHeight = image.naturalHeight / cols;
      frames = Array.from({ length: rows * cols }, (_, index) => ({
        x: (index % rows) * frameWidth,
        y: Math.floor(index / rows) * frameHeight,
        width: frameWidth,
        height: frameHeight,
      }));

      resize();
      if ("IntersectionObserver" in window) {
        intersectionObserver = new IntersectionObserver(([entry]) => {
          isVisible = entry.isIntersecting;
          if (isVisible && !reducedMotion) startAnimation();
          else stopAnimation();
        });
        intersectionObserver.observe(canvas);
      } else {
        isVisible = true;
        if (!reducedMotion) startAnimation();
      }
    };

    const handleMotionChange = (event) => {
      reducedMotion = event.matches;
      if (reducedMotion) {
        stopAnimation();
        setStaticPositions();
      } else if (isVisible) {
        startAnimation();
      }
    };

    const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
    motionPreference.addEventListener("change", handleMotionChange);
    window.addEventListener("resize", resize);
    if ("ResizeObserver" in window) {
      resizeObserver = new ResizeObserver(resize);
      resizeObserver.observe(canvas);
    }

    image.onload = handleImageLoad;
    image.onerror = () => {
      frames = [];
      context.clearRect(0, 0, canvas.width, canvas.height);
    };
    image.src = src;

    return () => {
      disposed = true;
      image.onload = null;
      image.onerror = null;
      stopAnimation();
      intersectionObserver?.disconnect();
      resizeObserver?.disconnect();
      motionPreference.removeEventListener("change", handleMotionChange);
      window.removeEventListener("resize", resize);
    };
  }, [cols, maxPeeps, rows, src]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 h-full w-full"
      role="img"
      aria-label="Animated doodle crowd"
    />
  );
};

CrowdCanvas.propTypes = {
  src: PropTypes.string.isRequired,
  rows: PropTypes.number,
  cols: PropTypes.number,
  maxPeeps: PropTypes.number,
};

export default CrowdCanvas;