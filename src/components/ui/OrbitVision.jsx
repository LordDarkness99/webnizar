import { useCallback, useEffect, useRef, useState } from "react";
import { RefreshCw } from "lucide-react";
import PropTypes from "prop-types";

const CORE_POINT_COUNT = 2800;
const GRAIN_POINT_COUNT = 16000;
const SPIKE_COUNT = 16;

const createRandom = (seed) => {
  let state = (seed * 2654435761 + 1) >>> 0;

  return () => {
    state = (state + 1831565813) >>> 0;
    let value = state;
    value = Math.imul(value ^ (value >>> 15), value | 1);
    value ^= value + Math.imul(value ^ (value >>> 7), value | 61);
    return ((value ^ (value >>> 14)) >>> 0) / 4294967296;
  };
};

const normalize = ([x, y, z]) => {
  const length = Math.hypot(x, y, z) || 1;
  return [x / length, y / length, z / length];
};

const cross = ([ax, ay, az], [bx, by, bz]) => [
  ay * bz - az * by,
  az * bx - ax * bz,
  ax * by - ay * bx,
];

const createSculpture = (seed) => {
  const random = createRandom(seed);
  const direction = () => {
    const z = random() * 2 - 1;
    const angle = random() * Math.PI * 2;
    const radius = Math.sqrt(1 - z * z);
    return [radius * Math.cos(angle), radius * Math.sin(angle), z];
  };
  const paths = [];
  const pathCount = 3 + Math.floor(random() * 2);
  const baseWidth = 0.092;

  for (let pathIndex = 0; pathIndex < pathCount; pathIndex += 1) {
    const normal = direction();
    const axis = Math.abs(normal[0]) < 0.9 ? [1, 0, 0] : [0, 1, 0];
    const tangent = normalize(cross(normal, axis));
    const bitangent = cross(normal, tangent);
    const phases = Array.from({ length: 8 }, () => random() * Math.PI * 2);
    const scale = 0.9 + random() * 0.16;
    const path = [];

    for (let pointIndex = 0; pointIndex <= 220; pointIndex += 1) {
      const angle = (pointIndex / 220) * Math.PI * 2;
      const radial =
        scale *
        (1 +
          0.15 * Math.sin(2 * angle + phases[0]) +
          0.07 * Math.sin(3 * angle + phases[1]) +
          0.04 * Math.sin(5 * angle + phases[2]));
      const normalOffset =
        scale *
        (0.24 * Math.sin(2 * angle + phases[3]) +
          0.08 * Math.sin(3 * angle + phases[4]));
      const tangentOffset = Math.cos(angle) * radial;
      const bitangentOffset = Math.sin(angle) * radial;
      const width =
        baseWidth *
        (0.3 + 0.7 * Math.pow(0.5 + 0.5 * Math.sin(3 * angle + phases[5]), 1.5)) *
        (0.72 + 0.28 * Math.sin(7 * angle + phases[6]));

      path.push(
        tangent[0] * tangentOffset +
          bitangent[0] * bitangentOffset +
          normal[0] * normalOffset,
        tangent[1] * tangentOffset +
          bitangent[1] * bitangentOffset +
          normal[1] * normalOffset,
        tangent[2] * tangentOffset +
          bitangent[2] * bitangentOffset +
          normal[2] * normalOffset,
        Math.max(0.018, width),
      );
    }
    paths.push(path);
  }

  for (let pathIndex = 0; pathIndex < 3; pathIndex += 1) {
    const startPath = paths[Math.floor(random() * pathCount)];
    const endPath = paths[Math.floor(random() * pathCount)];
    const startOffset = Math.floor(random() * (startPath.length / 4)) * 4;
    const endOffset = Math.floor(random() * (endPath.length / 4)) * 4;
    const start = [startPath[startOffset], startPath[startOffset + 1], startPath[startOffset + 2]];
    const end = [endPath[endOffset], endPath[endOffset + 1], endPath[endOffset + 2]];
    const controlDirection = normalize([
      (start[0] + end[0]) / 2,
      (start[1] + end[1]) / 2,
      (start[2] + end[2]) / 2,
    ]);
    const controlScale = 1.08 + random() * 0.18;
    const control = controlDirection.map((value) => value * controlScale);
    const path = [];

    for (let pointIndex = 0; pointIndex <= 40; pointIndex += 1) {
      const progress = pointIndex / 40;
      const inverse = 1 - progress;
      const width = baseWidth * (0.16 + 0.42 * Math.sin(Math.PI * progress));
      path.push(
        inverse * inverse * start[0] +
          2 * inverse * progress * control[0] +
          progress * progress * end[0],
        inverse * inverse * start[1] +
          2 * inverse * progress * control[1] +
          progress * progress * end[1],
        inverse * inverse * start[2] +
          2 * inverse * progress * control[2] +
          progress * progress * end[2],
        width,
      );
    }
    paths.push(path);
  }

  const segments = [];
  let totalLength = 0;
  for (const path of paths) {
    for (let offset = 0; offset + 4 < path.length; offset += 4) {
      const length = Math.hypot(
        path[offset + 4] - path[offset],
        path[offset + 5] - path[offset + 1],
        path[offset + 6] - path[offset + 2],
      );
      segments.push({ path, offset, length });
      totalLength += length;
    }
  }

  const core = new Float32Array(CORE_POINT_COUNT * 4);
  const tangents = new Float32Array(CORE_POINT_COUNT * 3);
  let segmentIndex = 0;
  let walkedLength = 0;

  for (let index = 0; index < CORE_POINT_COUNT; index += 1) {
    const targetLength = ((index + 0.5) / CORE_POINT_COUNT) * totalLength;
    while (
      segmentIndex < segments.length - 1 &&
      walkedLength + segments[segmentIndex].length < targetLength
    ) {
      walkedLength += segments[segmentIndex].length;
      segmentIndex += 1;
    }

    const { path, offset, length } = segments[segmentIndex];
    const progress = length
      ? Math.max(0, Math.min(1, (targetLength - walkedLength) / length))
      : 0;
    for (let component = 0; component < 4; component += 1) {
      core[index * 4 + component] =
        path[offset + component] +
        (path[offset + 4 + component] - path[offset + component]) * progress;
    }

    const tangent = normalize([
      path[offset + 4] - path[offset],
      path[offset + 5] - path[offset + 1],
      path[offset + 6] - path[offset + 2],
    ]);
    tangents.set(tangent, index * 3);
  }

  const grain = new Float32Array(GRAIN_POINT_COUNT * 3);
  for (let index = 0; index < GRAIN_POINT_COUNT; index += 1) {
    const coreIndex = Math.floor(random() * CORE_POINT_COUNT);
    const tangent = [
      tangents[coreIndex * 3],
      tangents[coreIndex * 3 + 1],
      tangents[coreIndex * 3 + 2],
    ];
    const randomDirection = direction();
    const tangentDot =
      randomDirection[0] * tangent[0] +
      randomDirection[1] * tangent[1] +
      randomDirection[2] * tangent[2];
    const perpendicular = normalize([
      randomDirection[0] - tangentDot * tangent[0],
      randomDirection[1] - tangentDot * tangent[1],
      randomDirection[2] - tangentDot * tangent[2],
    ]);
    const width = core[coreIndex * 4 + 3];
    const spread =
      random() < 0.05
        ? width * (1.3 + random() * 1.6)
        : width * (0.35 + 0.82 * Math.sqrt(random()));

    for (let component = 0; component < 3; component += 1) {
      grain[index * 3 + component] =
        core[coreIndex * 4 + component] + perpendicular[component] * spread;
    }
  }

  const spikes = new Float32Array(SPIKE_COUNT * 6);
  for (let index = 0; index < SPIKE_COUNT; index += 1) {
    const coreIndex = Math.floor(random() * CORE_POINT_COUNT);
    const point = [
      core[coreIndex * 4],
      core[coreIndex * 4 + 1],
      core[coreIndex * 4 + 2],
    ];
    const randomDirection = direction();
    const endpointDirection = normalize([
      point[0] + randomDirection[0] * 0.45,
      point[1] + randomDirection[1] * 0.45,
      point[2] + randomDirection[2] * 0.45,
    ]);
    const length = 0.18 + random() * 0.42;
    spikes.set(
      [
        point[0],
        point[1],
        point[2],
        point[0] + endpointDirection[0] * length,
        point[1] + endpointDirection[1] * length,
        point[2] + endpointDirection[2] * length,
      ],
      index * 6,
    );
  }

  return { core, grain, spikes };
};

const createScatteredSculpture = (sculpture, seed) => {
  const random = createRandom(seed ^ 0x5f3759df);
  const scatterPoints = (source, pointSize, dimensions, minRadius, maxRadius) => {
    const scattered = new Float32Array(source.length);
    for (let index = 0; index < source.length; index += pointSize) {
      const vectorGroups = pointSize === 6 ? 2 : 1;
      for (let group = 0; group < vectorGroups; group += 1) {
        const z = random() * 2 - 1;
        const angle = random() * Math.PI * 2;
        const radius = minRadius + random() * (maxRadius - minRadius);
        const xyRadius = Math.sqrt(1 - z * z) * radius;
        const point = [xyRadius * Math.cos(angle), xyRadius * Math.sin(angle), z * radius];
        for (let axis = 0; axis < dimensions; axis += 1) {
          scattered[index + group * 3 + axis] = point[axis];
        }
      }
      if (pointSize === 4) {
        scattered[index + dimensions] = source[index + dimensions] * 0.18;
      }
    }
    return scattered;
  };

  return {
    core: scatterPoints(sculpture.core, 4, 3, 1.55, 2.8),
    grain: scatterPoints(sculpture.grain, 3, 3, 1.55, 2.8),
    spikes: scatterPoints(sculpture.spikes, 6, 3, 1.55, 2.8),
  };
};

const easeInOut = (progress) =>
  progress < 0.5
    ? 4 * progress * progress * progress
    : 1 - Math.pow(-2 * progress + 2, 3) / 2;

const OrbitVision = ({ autoReforge = false, showInterface = true }) => {
  const canvasRef = useRef(null);
  const rotationRef = useRef({ yaw: 0.6, pitch: 0.18 });
  const dragRef = useRef(null);
  const drawRef = useRef(() => {});
  const seedRef = useRef(83396);
  const sculptureRef = useRef(null);
  const transitionRef = useRef(null);
  const [seed, setSeed] = useState(seedRef.current);

  if (!sculptureRef.current) {
    sculptureRef.current = createSculpture(seedRef.current);
  }

  const reforge = useCallback(() => {
    const nextSeed = Math.floor(Math.random() * 90000) + 10000;
    const nextSculpture = createSculpture(nextSeed);
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      sculptureRef.current = nextSculpture;
      drawRef.current();
    } else {
      const currentSculpture = sculptureRef.current;
      transitionRef.current = {
        from: currentSculpture,
        scatter: createScatteredSculpture(currentSculpture, nextSeed),
        to: nextSculpture,
        frame: {
          core: new Float32Array(currentSculpture.core.length),
          grain: new Float32Array(currentSculpture.grain.length),
          spikes: new Float32Array(currentSculpture.spikes.length),
        },
        startedAt: performance.now(),
        duration: 1500,
      };
      sculptureRef.current = transitionRef.current.frame;
    }
    seedRef.current = nextSeed;
    setSeed(nextSeed);
  }, []);

  useEffect(() => {
    if (autoReforge) reforge();
  }, [autoReforge, reforge]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return undefined;

    const coreCount = sculptureRef.current.core.length / 4;
    const grainCount = sculptureRef.current.grain.length / 3;
    let width = 0;
    let height = 0;
    let pixelRatio = 1;
    let frameId = 0;
    let visible = true;
    let reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let resizeObserver;
    let intersectionObserver;
    const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const mixArrays = (output, start, end, progress) => {
      for (let index = 0; index < output.length; index += 1) {
        output[index] = start[index] + (end[index] - start[index]) * progress;
      }
    };
    const updateSculptureTransition = (time) => {
      const transition = transitionRef.current;
      if (!transition) return;

      const progress = Math.min(1, (time - transition.startedAt) / transition.duration);
      if (progress >= 1) {
        sculptureRef.current = transition.to;
        transitionRef.current = null;
        return;
      }

      const scatterProgress = 0.42;
      const isScattering = progress < scatterProgress;
      const from = isScattering ? transition.from : transition.scatter;
      const to = isScattering ? transition.scatter : transition.to;
      const phaseProgress = isScattering
        ? progress / scatterProgress
        : (progress - scatterProgress) / (1 - scatterProgress);
      const easedProgress = easeInOut(phaseProgress);

      mixArrays(transition.frame.core, from.core, to.core, easedProgress);
      mixArrays(transition.frame.grain, from.grain, to.grain, easedProgress);
      mixArrays(transition.frame.spikes, from.spikes, to.spikes, easedProgress);
      sculptureRef.current = transition.frame;
    };

    const project = (x, y, z, centerX, centerY, scale) => {
      const { yaw, pitch } = rotationRef.current;
      const cosYaw = Math.cos(yaw);
      const sinYaw = Math.sin(yaw);
      const yawX = x * cosYaw + z * sinYaw;
      const yawZ = -x * sinYaw + z * cosYaw;
      const cosPitch = Math.cos(pitch);
      const sinPitch = Math.sin(pitch);
      const projectedY = y * cosPitch - yawZ * sinPitch;
      const depth = y * sinPitch + yawZ * cosPitch;
      const perspective = 3 / (3 - depth);

      return [
        centerX + yawX * perspective * scale,
        centerY - projectedY * perspective * scale,
        depth,
        perspective,
      ];
    };

    const drawSphere = (centerX, centerY, sphereRadius, angle, dark) => {
      const gradient = context.createRadialGradient(
        centerX - sphereRadius * 0.38,
        centerY - sphereRadius * 0.44,
        sphereRadius * 0.03,
        centerX,
        centerY,
        sphereRadius,
      );
      gradient.addColorStop(0, dark ? "#888884" : "#ffffff");
      gradient.addColorStop(0.36, dark ? "#3d3d3b" : "#d2d2ce");
      gradient.addColorStop(0.78, dark ? "#171716" : "#f0f0ec");
      gradient.addColorStop(1, dark ? "#080808" : "#c4c4c0");
      context.fillStyle = gradient;
      context.beginPath();
      context.arc(centerX, centerY, sphereRadius, 0, Math.PI * 2);
      context.fill();

      context.save();
      context.beginPath();
      context.arc(centerX, centerY, sphereRadius * 0.96, 0, Math.PI * 2);
      context.clip();
      context.strokeStyle = dark
        ? "rgba(240,240,235,0.3)"
        : "rgba(20,20,18,0.28)";
      context.lineWidth = 0.75;
      for (let index = 1; index <= 3; index += 1) {
        context.beginPath();
        context.ellipse(
          centerX,
          centerY,
          sphereRadius * (0.28 + index * 0.17),
          sphereRadius * (0.12 + index * 0.08),
          angle * 0.6 + index,
          0,
          Math.PI * 2,
        );
        context.stroke();
      }
      context.beginPath();
      context.arc(
        centerX - sphereRadius * 0.08,
        centerY + sphereRadius * 0.08,
        sphereRadius * 0.22,
        0,
        Math.PI * 2,
      );
      context.stroke();
      context.fillStyle = dark ? "#f3f3ee" : "#171716";
      context.beginPath();
      context.arc(centerX, centerY + sphereRadius * 0.36, sphereRadius * 0.032, 0, Math.PI * 2);
      context.fill();
      context.fillRect(
        centerX - sphereRadius * 0.024,
        centerY + sphereRadius * 0.4,
        sphereRadius * 0.048,
        sphereRadius * 0.11,
      );
      context.restore();

      const highlight = context.createRadialGradient(
        centerX - sphereRadius * 0.38,
        centerY - sphereRadius * 0.42,
        0,
        centerX - sphereRadius * 0.38,
        centerY - sphereRadius * 0.42,
        sphereRadius * 0.42,
      );
      highlight.addColorStop(
        0,
        dark ? "rgba(255,255,255,0.32)" : "rgba(255,255,255,0.55)",
      );
      highlight.addColorStop(1, "rgba(255,255,255,0)");
      context.fillStyle = highlight;
      context.fillRect(
        centerX - sphereRadius,
        centerY - sphereRadius,
        sphereRadius * 2,
        sphereRadius * 2,
      );
      context.strokeStyle = dark
        ? "rgba(255,255,255,0.45)"
        : "rgba(20,20,18,0.32)";
      context.lineWidth = 0.8;
      context.beginPath();
      context.arc(centerX, centerY, sphereRadius, 0, Math.PI * 2);
      context.stroke();
    };

    const draw = () => {
      if (!width || !height) return;
      context.clearRect(0, 0, width, height);
      const centerX = width / 2;
      const centerY = height / 2;
      const scale = Math.min(width, height) * 0.36;
      const sphereRadius = scale * 0.3;
      const geometry = sculptureRef.current;
      const dark = document.documentElement.classList.contains("dark");
      const coreBins = Array.from({ length: 16 }, () => []);
      const grainBins = Array.from({ length: 16 }, () => []);
      const spikeBins = Array.from({ length: 16 }, () => []);
      const projectedCore = new Float32Array(coreCount * 4);
      const projectedGrain = new Float32Array(grainCount * 3);
      const projectedSpikes = new Float32Array(SPIKE_COUNT * 6);

      context.strokeStyle = dark
        ? "rgba(255,255,255,0.11)"
        : "rgba(20,20,18,0.14)";
      context.lineWidth = 0.7;
      context.beginPath();
      context.moveTo(centerX, 18);
      context.lineTo(centerX, height - 18);
      context.moveTo(18, centerY);
      context.lineTo(width - 18, centerY);
      context.stroke();

      for (let index = 0; index < coreCount; index += 1) {
        const [x, y, depth, perspective] = project(
          geometry.core[index * 4],
          geometry.core[index * 4 + 1],
          geometry.core[index * 4 + 2],
          centerX,
          centerY,
          scale,
        );
        const radius = Math.max(0.7, geometry.core[index * 4 + 3] * scale * perspective);
        projectedCore.set([x, y, radius, depth], index * 4);
        const layer = Math.max(0, Math.min(15, Math.floor(((depth + 1.5) / 3) * 16)));
        coreBins[layer].push(index);
      }

      for (let index = 0; index < grainCount; index += 1) {
        const [x, y, depth] = project(
          geometry.grain[index * 3],
          geometry.grain[index * 3 + 1],
          geometry.grain[index * 3 + 2],
          centerX,
          centerY,
          scale,
        );
        projectedGrain.set([x, y, depth], index * 3);
        const layer = Math.max(0, Math.min(15, Math.floor(((depth + 1.5) / 3) * 16)));
        grainBins[layer].push(index);
      }

      for (let index = 0; index < SPIKE_COUNT; index += 1) {
        const offset = index * 6;
        const start = project(
          geometry.spikes[offset],
          geometry.spikes[offset + 1],
          geometry.spikes[offset + 2],
          centerX,
          centerY,
          scale,
        );
        const end = project(
          geometry.spikes[offset + 3],
          geometry.spikes[offset + 4],
          geometry.spikes[offset + 5],
          centerX,
          centerY,
          scale,
        );
        projectedSpikes.set(
          [start[0], start[1], start[2], end[0], end[1], end[2]],
          index * 6,
        );
        const depth = (start[2] + end[2]) / 2;
        const layer = Math.max(0, Math.min(15, Math.floor(((depth + 1.5) / 3) * 16)));
        spikeBins[layer].push(index);
      }

      const drawLayers = (startLayer, endLayer) => {
        for (let layer = startLayer; layer < endLayer; layer += 1) {
          const lightness = dark
            ? Math.round(120 + (layer / 15) * 125)
            : Math.round(135 - (layer / 15) * 125);
          context.fillStyle = `rgb(${lightness}, ${lightness}, ${lightness - 3})`;
          context.beginPath();
          for (const index of coreBins[layer]) {
            const offset = index * 4;
            const x = projectedCore[offset];
            const y = projectedCore[offset + 1];
            const radius = projectedCore[offset + 2];
            context.moveTo(x + radius, y);
            context.arc(x, y, radius, 0, Math.PI * 2);
          }
          context.fill();

          context.fillStyle = dark
            ? `rgba(245,245,240,${0.32 + layer * 0.035})`
            : `rgba(20,20,18,${0.24 + layer * 0.035})`;
          for (const index of grainBins[layer]) {
            const offset = index * 3;
            const size = pixelRatio > 1.25 ? 1.1 : 1;
            context.fillRect(projectedGrain[offset], projectedGrain[offset + 1], size, size);
          }

          context.strokeStyle = dark
            ? `rgba(235,235,230,${0.25 + layer * 0.025})`
            : `rgba(20,20,18,${0.22 + layer * 0.025})`;
          context.lineWidth = Math.max(0.65, 0.8 * pixelRatio);
          context.beginPath();
          for (const index of spikeBins[layer]) {
            const offset = index * 6;
            context.moveTo(projectedSpikes[offset], projectedSpikes[offset + 1]);
            context.lineTo(projectedSpikes[offset + 3], projectedSpikes[offset + 4]);
          }
          context.stroke();
        }
      };

      drawLayers(0, 8);
      drawSphere(centerX, centerY, sphereRadius, rotationRef.current.yaw, dark);
      drawLayers(8, 16);
    };
    drawRef.current = draw;

    const stop = () => {
      window.cancelAnimationFrame(frameId);
      frameId = 0;
    };
    const render = () => {
      if (!visible) return;
      updateSculptureTransition(performance.now());
      if (!reducedMotion && !dragRef.current) rotationRef.current.yaw += 0.0018;
      draw();
      frameId = window.requestAnimationFrame(render);
    };
    const start = () => {
      if (!visible) return;
      if (reducedMotion) {
        draw();
      } else if (!frameId) {
        frameId = window.requestAnimationFrame(render);
      }
    };
    const resize = () => {
      const bounds = canvas.getBoundingClientRect();
      if (!bounds.width || !bounds.height) return;
      width = bounds.width;
      height = bounds.height;
      pixelRatio = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.round(width * pixelRatio);
      canvas.height = Math.round(height * pixelRatio);
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
      draw();
    };
    const handleMotionChange = (event) => {
      reducedMotion = event.matches;
      if (reducedMotion) {
        stop();
        draw();
      } else {
        start();
      }
    };

    motionPreference.addEventListener("change", handleMotionChange);
    window.addEventListener("resize", resize);
    if ("ResizeObserver" in window) {
      resizeObserver = new ResizeObserver(resize);
      resizeObserver.observe(canvas);
    }
    if ("IntersectionObserver" in window) {
      intersectionObserver = new IntersectionObserver(([entry]) => {
        visible = entry.isIntersecting;
        if (visible) start();
        else stop();
      });
      intersectionObserver.observe(canvas);
    }
    resize();
    start();

    return () => {
      stop();
      drawRef.current = () => {};
      motionPreference.removeEventListener("change", handleMotionChange);
      window.removeEventListener("resize", resize);
      resizeObserver?.disconnect();
      intersectionObserver?.disconnect();
    };
  }, []);

  const handlePointerDown = (event) => {
    dragRef.current = {
      x: event.clientX,
      y: event.clientY,
      startX: event.clientX,
      startY: event.clientY,
      yaw: rotationRef.current.yaw,
      pitch: rotationRef.current.pitch,
    };
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event) => {
    if (!dragRef.current) return;
    rotationRef.current.yaw = dragRef.current.yaw + (event.clientX - dragRef.current.x) * 0.006;
    rotationRef.current.pitch = Math.max(
      -1.35,
      Math.min(1.35, dragRef.current.pitch + (event.clientY - dragRef.current.y) * 0.006),
    );
  };

  const handlePointerUp = (event) => {
    if (!dragRef.current) return;
    const moved = Math.hypot(
      event.clientX - dragRef.current.startX,
      event.clientY - dragRef.current.startY,
    );
    dragRef.current = null;
    if (moved < 6) reforge();
  };

  return (
    <div className="orbit-vision" aria-label="Interactive orbital system visualization">
      {showInterface && (
        <div className="orbit-vision__topline">
          <span>N 00°</span>
          <span>FORGE · 3D</span>
        </div>
      )}
      <canvas
        ref={canvasRef}
        className="orbit-vision__canvas"
        role="img"
        aria-label={
          showInterface
            ? `Monochrome orbital system, seed ${seed}. Drag to rotate or click to reforge.`
            : `Monochrome orbital seed animation, seed ${seed}.`
        }
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={() => {
          dragRef.current = null;
        }}
      />
      {showInterface && (
        <div className="orbit-vision__footer">
          <span>Drag to rotate · Click to reforge</span>
          <button type="button" onClick={reforge} aria-label="Reforge orbital system">
            <RefreshCw aria-hidden="true" />
            <span>seed {seed}</span>
          </button>
        </div>
      )}
    </div>
  );
};

OrbitVision.propTypes = {
  autoReforge: PropTypes.bool,
  showInterface: PropTypes.bool,
};

export default OrbitVision;
