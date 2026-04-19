import { useEffect, useMemo, useRef, useState, type MouseEvent } from "react";

type BallState = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  inFlight: boolean;
};

export default function App() {
  const courtRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  const lastFrameRef = useRef<number>(0);
  const resetTimerRef = useRef<number | null>(null);
  const scoredThisShotRef = useRef(false);
  const resetPendingRef = useRef(false);

  const [courtSize, setCourtSize] = useState({ width: 960, height: 620 });
  const [score, setScore] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [status, setStatus] = useState("Nhap vao san de nem bong vao ro");
  const [netSwing, setNetSwing] = useState(false);
  const [scoreFlash, setScoreFlash] = useState(false);

  const layout = useMemo(() => {
    const width = courtSize.width;
    const height = courtSize.height;
    return {
      ballRadius: 16,
      launcherX: width * 0.2,
      launcherY: height - 46,
      rimY: height * 0.28,
      rimX: width * 0.72,
      rimWidth: Math.max(100, width * 0.12),
      rimRadius: 8,
      backboardX: width * 0.72 + Math.max(100, width * 0.12) / 2 + 14,
      floorY: height - 8,
    };
  }, [courtSize.height, courtSize.width]);

  const [ball, setBall] = useState<BallState>({
    x: layout.launcherX,
    y: layout.launcherY,
    vx: 0,
    vy: 0,
    inFlight: false,
  });

  const [aimPoint, setAimPoint] = useState({ x: layout.rimX, y: layout.rimY - 40 });

  useEffect(() => {
    setBall((prev) =>
      prev.inFlight
        ? prev
        : {
            x: layout.launcherX,
            y: layout.launcherY,
            vx: 0,
            vy: 0,
            inFlight: false,
          }
    );
    setAimPoint({ x: layout.rimX, y: layout.rimY - 40 });
  }, [layout.launcherX, layout.launcherY, layout.rimX, layout.rimY]);

  useEffect(() => {
    const element = courtRef.current;
    if (!element) return;

    const observer = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (!entry) return;
      setCourtSize({
        width: entry.contentRect.width,
        height: entry.contentRect.height,
      });
    });

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  const resetBall = () => {
    resetPendingRef.current = false;
    scoredThisShotRef.current = false;
    setBall({
      x: layout.launcherX,
      y: layout.launcherY,
      vx: 0,
      vy: 0,
      inFlight: false,
    });
    setStatus("Nhap vao san de nem bong vao ro");
  };

  const queueReset = (delay = 750) => {
    if (resetPendingRef.current) return;
    resetPendingRef.current = true;
    if (resetTimerRef.current) {
      window.clearTimeout(resetTimerRef.current);
    }
    resetTimerRef.current = window.setTimeout(() => {
      resetBall();
    }, delay);
  };

  const shootAt = (x: number, y: number) => {
    if (ball.inFlight) return;

    const dx = x - ball.x;
    const dy = y - ball.y;
    const distance = Math.hypot(dx, dy);
    if (distance < 16) return;

    const speed = Math.min(950, Math.max(470, distance * 2.1));
    const unitX = dx / distance;
    const unitY = dy / distance;
    const launchVX = unitX * speed;
    const launchVY = Math.min(unitY * speed, -140);

    scoredThisShotRef.current = false;
    resetPendingRef.current = false;
    setAttempts((prev) => prev + 1);
    setStatus("Dang bay...");
    setBall((prev) => ({ ...prev, vx: launchVX, vy: launchVY, inFlight: true }));
  };

  useEffect(() => {
    const gravity = 1140;
    const bounce = 0.72;

    const animate = (time: number) => {
      if (!lastFrameRef.current) lastFrameRef.current = time;
      const dt = Math.min((time - lastFrameRef.current) / 1000, 0.025);
      lastFrameRef.current = time;

      setBall((prev) => {
        if (!prev.inFlight) return prev;

        let nextX = prev.x + prev.vx * dt;
        let nextY = prev.y + prev.vy * dt;
        let nextVX = prev.vx;
        let nextVY = prev.vy + gravity * dt;

        const {
          ballRadius,
          floorY,
          rimX,
          rimY,
          rimWidth,
          rimRadius,
          backboardX,
        } = layout;

        if (nextX < ballRadius) {
          nextX = ballRadius;
          nextVX = Math.abs(nextVX) * bounce;
        }

        if (nextX > courtSize.width - ballRadius) {
          nextX = courtSize.width - ballRadius;
          nextVX = -Math.abs(nextVX) * bounce;
        }

        if (nextY < ballRadius) {
          nextY = ballRadius;
          nextVY = Math.abs(nextVY) * bounce;
        }

        if (
          nextX + ballRadius > backboardX &&
          nextX - ballRadius < backboardX &&
          nextY > rimY - 90 &&
          nextY < rimY + 80 &&
          nextVX > 0
        ) {
          nextX = backboardX - ballRadius;
          nextVX = -Math.abs(nextVX) * 0.74;
        }

        const leftRimX = rimX - rimWidth / 2;
        const rightRimX = rimX + rimWidth / 2;

        const collideWithRim = (rimDotX: number, rimDotY: number) => {
          const hitX = nextX - rimDotX;
          const hitY = nextY - rimDotY;
          const minDistance = ballRadius + rimRadius;
          const distance = Math.hypot(hitX, hitY);
          if (distance >= minDistance || distance === 0) return;

          const nx = hitX / distance;
          const ny = hitY / distance;
          nextX = rimDotX + nx * minDistance;
          nextY = rimDotY + ny * minDistance;
          const dot = nextVX * nx + nextVY * ny;
          nextVX = (nextVX - 2 * dot * nx) * 0.85;
          nextVY = (nextVY - 2 * dot * ny) * 0.85;
        };

        collideWithRim(leftRimX, rimY);
        collideWithRim(rightRimX, rimY);

        if (
          !scoredThisShotRef.current &&
          prev.y + ballRadius < rimY &&
          nextY + ballRadius >= rimY &&
          nextX > leftRimX + 14 &&
          nextX < rightRimX - 14 &&
          nextVY > 0
        ) {
          scoredThisShotRef.current = true;
          setScore((value) => value + 1);
          setStatus("Vao ro!");
          setNetSwing(true);
          setScoreFlash(true);
          window.setTimeout(() => setNetSwing(false), 420);
          window.setTimeout(() => setScoreFlash(false), 520);
          queueReset(820);
        }

        if (nextY > floorY - ballRadius) {
          nextY = floorY - ballRadius;
          nextVY = -Math.abs(nextVY) * 0.54;
          nextVX *= 0.9;
        }

        const stopShot =
          nextY >= floorY - ballRadius - 0.5 &&
          Math.abs(nextVY) < 90 &&
          Math.abs(nextVX) < 65;

        if (!scoredThisShotRef.current && stopShot) {
          setStatus("Truot roi, thu lai!");
          queueReset(640);
        }

        return {
          x: nextX,
          y: nextY,
          vx: nextVX,
          vy: nextVY,
          inFlight: true,
        };
      });

      rafRef.current = window.requestAnimationFrame(animate);
    };

    rafRef.current = window.requestAnimationFrame(animate);
    return () => {
      if (rafRef.current) window.cancelAnimationFrame(rafRef.current);
      if (resetTimerRef.current) window.clearTimeout(resetTimerRef.current);
    };
  }, [courtSize.width, layout]);

  const handleCourtMove = (event: MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setAimPoint({ x: event.clientX - rect.left, y: event.clientY - rect.top });
  };

  const handleCourtClick = (event: MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    shootAt(event.clientX - rect.left, event.clientY - rect.top);
  };

  const accuracy = attempts ? Math.round((score / attempts) * 100) : 0;

  return (
    <main className="min-h-screen bg-slate-950 px-4 py-6 text-slate-100 md:px-8">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-4">
        <header className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-amber-300/90">Street Basketball</p>
            <h1 className="text-3xl font-semibold md:text-4xl">Game Nem Bong Vao Ro</h1>
          </div>
          <div className="flex items-center gap-5 text-sm md:text-base">
            <p>
              Diem: <strong className="text-amber-300">{score}</strong>
            </p>
            <p>
              Luot: <strong>{attempts}</strong>
            </p>
            <p>
              Chinh xac: <strong>{accuracy}%</strong>
            </p>
          </div>
        </header>

        <section
          ref={courtRef}
          onMouseMove={handleCourtMove}
          onClick={handleCourtClick}
          className="court-light relative h-[72vh] min-h-[520px] w-full cursor-crosshair overflow-hidden rounded-2xl border border-white/15"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-sky-800/25 to-transparent" />
          <div className="absolute left-0 top-0 h-[36%] w-full bg-gradient-to-b from-[#132340] via-[#1d2f53] to-transparent" />
          <div className="absolute bottom-0 left-0 h-[44%] w-full bg-[#d98f2f]" />
          <div className="absolute bottom-[22%] left-0 h-1 w-full bg-white/55" />
          <div className="absolute bottom-[10%] left-0 h-1 w-full bg-white/45" />

          {!ball.inFlight && (
            <svg className="pointer-events-none absolute inset-0 h-full w-full">
              <line
                x1={ball.x}
                y1={ball.y}
                x2={aimPoint.x}
                y2={aimPoint.y}
                stroke="rgba(253, 224, 71, 0.7)"
                strokeDasharray="8 7"
                strokeWidth="2"
              />
            </svg>
          )}

          <div
            className="absolute h-2 w-24 -translate-x-1/2 rounded-full bg-black/35 blur-sm"
            style={{
              left: `${ball.x}px`,
              top: `${layout.floorY - 3}px`,
              transform: `translateX(-50%) scale(${ball.inFlight ? 0.78 : 1})`,
              opacity: ball.inFlight ? 0.55 : 0.72,
              transition: "transform 200ms ease, opacity 200ms ease",
            }}
          />

          <div
            className="absolute grid place-items-center rounded-full border-2 border-amber-300/75 bg-[radial-gradient(circle_at_30%_30%,#fdba74,#ea580c_70%)]"
            style={{
              left: `${ball.x - layout.ballRadius}px`,
              top: `${ball.y - layout.ballRadius}px`,
              width: `${layout.ballRadius * 2}px`,
              height: `${layout.ballRadius * 2}px`,
            }}
          >
            <span className="h-[1px] w-full bg-amber-100/50" />
            <span className="absolute h-full w-[1px] bg-amber-100/50" />
          </div>

          <div
            className={`absolute left-0 top-0 h-14 w-14 -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-300/35 blur-xl transition-opacity ${
              scoreFlash ? "opacity-100" : "opacity-0"
            }`}
            style={{ left: `${layout.rimX}px`, top: `${layout.rimY}px` }}
          />

          <div
            className="absolute h-[160px] w-4 rounded-sm bg-slate-200/70"
            style={{ left: `${layout.backboardX}px`, top: `${layout.rimY - 96}px` }}
          />
          <div
            className="absolute h-3 rounded-full bg-[#c64911]"
            style={{
              left: `${layout.rimX - layout.rimWidth / 2}px`,
              top: `${layout.rimY - 1.5}px`,
              width: `${layout.rimWidth}px`,
            }}
          />
          <div
            className={`absolute ${netSwing ? "net-swing" : ""}`}
            style={{
              left: `${layout.rimX - layout.rimWidth / 2 + 8}px`,
              top: `${layout.rimY + 6}px`,
              width: `${layout.rimWidth - 16}px`,
              height: "66px",
              transformOrigin: "top center",
            }}
          >
            <svg className="h-full w-full" viewBox="0 0 120 70" preserveAspectRatio="none">
              <path
                d="M3 2 L117 2 L95 64 L25 64 Z"
                fill="none"
                stroke="rgba(255,255,255,0.82)"
                strokeWidth="2"
              />
              <path d="M20 2 L30 64 M40 2 L45 64 M60 2 L60 64 M80 2 L75 64 M100 2 L90 64" stroke="rgba(255,255,255,0.7)" strokeWidth="1.5" />
            </svg>
          </div>

          <p className="absolute bottom-4 left-4 text-sm text-white/90 md:text-base">{status}</p>
          <button
            type="button"
            onClick={() => shootAt(aimPoint.x, aimPoint.y)}
            className="absolute bottom-4 right-4 rounded-md bg-amber-300 px-4 py-2 text-sm font-semibold text-slate-900 transition hover:bg-amber-200 active:scale-[0.98]"
          >
            Nem theo huong ngam
          </button>
        </section>
      </div>
    </main>
  );
}
