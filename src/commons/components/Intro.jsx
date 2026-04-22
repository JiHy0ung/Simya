import React, { useEffect, useRef, useState } from "react";
import styled from "@emotion/styled";
import { keyframes } from "@emotion/react";

const fadeOut = keyframes`
  0%   { opacity: 1; }
  100% { opacity: 0; }
`;

const titleReveal = keyframes`
  0%   { opacity: 0; letter-spacing: 0.8em; filter: blur(20px); }
  100% { opacity: 1; letter-spacing: 0.06em; filter: blur(0); }
`;

const subReveal = keyframes`
  0%   { opacity: 0; filter: blur(6px); }
  100% { opacity: 1; filter: blur(0); }
`;

const Overlay = styled("div")(({ leaving }) => ({
  position: "fixed",
  inset: 0,
  background: "#02010a",
  zIndex: 99999,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "column",
  animation: leaving
    ? `${fadeOut} 1.6s cubic-bezier(0.7,0,1,1) forwards`
    : "none",
  pointerEvents: leaving ? "none" : "all",
}));

const Canvas = styled("canvas")({
  position: "absolute",
  inset: 0,
  width: "100%",
  height: "100%",
});

const TextWrap = styled("div")({
  position: "relative",
  zIndex: 2,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "1rem",
});

const IntroTitle = styled("div")({
  fontFamily: "Mona8x12",
  fontSize: "2.5rem",
  color: "#e8e4ff",
  textAlign: "center",
  letterSpacing: "0.06em",
  textShadow: `
    0 0 8px rgba(220,215,255,1),
    0 0 24px rgba(160,150,255,0.8),
    0 0 60px rgba(100,80,220,0.5),
    0 0 120px rgba(60,40,180,0.3)
  `,
  animation: `${titleReveal} 2.2s cubic-bezier(0.16,1,0.3,1) forwards`,
  animationDelay: "0.4s",
  opacity: 0,
});

const IntroSub = styled("div")({
  fontFamily: "Mona8x12",
  fontSize: "0.6875rem",
  color: "rgba(183,179,218,0.35)",
  textAlign: "center",
  letterSpacing: "0.25em",
  animation: `${subReveal} 1.5s ease forwards`,
  animationDelay: "2s",
  opacity: 0,
});

const STAY = 3400;
const LEAVE = 1600;

const Intro = ({ onDone }) => {
  const canvasRef = useRef(null);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let W = (canvas.width = window.innerWidth);
    let H = (canvas.height = window.innerHeight);
    let animId;
    let t = 0;
    const cx = W / 2;
    const cy = H / 2;

    const SHOOT_ANGLE = Math.PI * 0.72;

    function spawnStar(fromEdge = false) {
      const x = fromEdge
        ? W * 0.4 + Math.random() * W * 0.7
        : Math.random() * W;
      const y = fromEdge ? Math.random() * H * 0.5 : Math.random() * H;

      const isShooting = Math.random() < 0.01;
      const speed = isShooting ? 3 + Math.random() * 8 : 0;

      return {
        x,
        y,
        vx: Math.cos(SHOOT_ANGLE) * speed,
        vy: Math.sin(SHOOT_ANGLE) * speed,
        size: isShooting
          ? 0.4 + Math.random() * 0.15
          : 0.4 + Math.random() * 0.15,
        alpha: isShooting
          ? 0.7 + Math.random() * 0.3
          : 0.2 + Math.random() * 0.6,
        hue: isShooting ? 200 + Math.random() * 60 : 220 + Math.random() * 80,
        isShooting,
        tailLen: isShooting ? 40 + Math.random() * 60 : 1,
        twinkle: Math.random() * Math.PI * 2,
        twinkleSpeed: 0.02 + Math.random() * 0.04,
      };
    }

    const STARS = Array.from({ length: 500 }, () => spawnStar(false));

    // 성운
    const NEBULAS = Array.from({ length: 8 }, (_, i) => {
      const angle = (i / 8) * Math.PI * 2 + Math.random() * 0.5;
      const dist = 100 + Math.random() * Math.min(W, H) * 0.35;
      return {
        x: cx + Math.cos(angle) * dist,
        y: cy + Math.sin(angle) * dist,
        r: 120 + Math.random() * 220,
        hue: i % 2 === 0 ? 255 + Math.random() * 30 : 200 + Math.random() * 30,
        alpha: 0.025 + Math.random() * 0.04,
        vx: Math.cos(angle + Math.PI / 2) * 0.06,
        vy: Math.sin(angle + Math.PI / 2) * 0.06,
        phase: Math.random() * Math.PI * 2,
        scaleX: 0.6 + Math.random() * 0.8,
        scaleY: 0.4 + Math.random() * 0.6,
        rotation: Math.random() * Math.PI,
      };
    });

    // 먼지
    // const DUST = Array.from({ length: 60 }, () => spawnDust());

    // function spawnDust() {
    //   const angle = Math.random() * Math.PI * 2;
    //   const r = 60 + Math.random() * Math.min(W, H) * 0.4;
    //   return {
    //     x: cx + Math.cos(angle) * r,
    //     y: cy + Math.sin(angle) * r,
    //     vx: (Math.random() - 0.5) * 0.15,
    //     vy: (Math.random() - 0.5) * 0.15,
    //     size: 0.05 + Math.random() * 1.2,
    //     alpha: 0.3 + Math.random() * 0.4,
    //     decay: 0.001 + Math.random() * 0.002,
    //     hue: 240 + Math.random() * 70,
    //     phase: Math.random() * Math.PI * 2,
    //   };
    // }

    function render() {
      t += 0.01;

      ctx.fillStyle = "rgba(2,1,10,0.15)";
      ctx.fillRect(0, 0, W, H);

      // ─ 성운
      NEBULAS.forEach((n) => {
        n.phase += 0.002;
        n.x += n.vx;
        n.y += n.vy;
        const pulse = n.alpha * (0.75 + 0.25 * Math.sin(n.phase));

        ctx.save();
        ctx.translate(n.x, n.y);
        ctx.rotate(n.rotation + t * 0.012);
        ctx.scale(n.scaleX, n.scaleY);

        const grd = ctx.createRadialGradient(0, 0, 0, 0, 0, n.r);
        grd.addColorStop(0, `hsla(${n.hue},75%,65%,${pulse * 1.8})`);
        grd.addColorStop(0.3, `hsla(${n.hue},65%,50%,${pulse})`);
        grd.addColorStop(0.7, `hsla(${n.hue},55%,35%,${pulse * 0.3})`);
        grd.addColorStop(1, `hsla(${n.hue},55%,35%,0)`);

        ctx.beginPath();
        ctx.arc(0, 0, n.r, 0, Math.PI * 2);
        ctx.fillStyle = grd;
        ctx.fill();
        ctx.restore();
      });

      // ─ 별 + 별똥별
      STARS.forEach((s) => {
        s.x += s.vx;
        s.y += s.vy;
        s.twinkle += s.twinkleSpeed;

        // 화면 밖으로 나가면 재생성
        if (s.x < -100 || s.y > H + 100 || s.x > W + 100 || s.y < -100) {
          Object.assign(s, spawnStar(true));
          return;
        }

        if (s.isShooting) {
          // 별똥별 — 꼬리 그라데이션
          const tailX = s.x - Math.cos(SHOOT_ANGLE) * s.tailLen;
          const tailY = s.y - Math.sin(SHOOT_ANGLE) * s.tailLen;

          const grad = ctx.createLinearGradient(tailX, tailY, s.x, s.y);
          grad.addColorStop(0, `hsla(${s.hue},80%,90%,0)`);
          grad.addColorStop(0.6, `hsla(${s.hue},80%,90%,${s.alpha * 0.4})`);
          grad.addColorStop(1, `hsla(${s.hue},90%,95%,${s.alpha})`);

          ctx.beginPath();
          ctx.moveTo(tailX, tailY);
          ctx.lineTo(s.x, s.y);
          ctx.strokeStyle = grad;
          ctx.lineWidth = s.size;
          ctx.stroke();

          // 머리 글로우
          const grd = ctx.createRadialGradient(
            s.x,
            s.y,
            0,
            s.x,
            s.y,
            s.size * 5,
          );
          grd.addColorStop(0, `hsla(${s.hue},90%,98%,${s.alpha})`);
          grd.addColorStop(1, `hsla(${s.hue},80%,80%,0)`);
          ctx.beginPath();
          ctx.arc(s.x, s.y, s.size * 5, 0, Math.PI * 2);
          ctx.fillStyle = grd;
          ctx.fill();
        } else {
          // 일반 별 — 반짝임
          const twinkleAlpha = s.alpha * (0.5 + 0.5 * Math.sin(s.twinkle));
          ctx.beginPath();
          ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
          ctx.fillStyle = `hsla(${s.hue},50%,95%,${twinkleAlpha})`;
          ctx.fill();
        }
      });

      // // ─ 먼지
      // DUST.forEach((d) => {
      //   d.phase += 0.02;
      //   d.x += d.vx;
      //   d.y += d.vy;
      //   d.alpha -= d.decay;
      //   if (d.alpha <= 0) Object.assign(d, spawnDust());

      //   const a = d.alpha * (0.5 + 0.5 * Math.sin(d.phase));
      //   const grd = ctx.createRadialGradient(d.x, d.y, 0, d.x, d.y, d.size * 3);
      //   grd.addColorStop(0, `hsla(${d.hue},60%,85%,${a})`);
      //   grd.addColorStop(1, `hsla(${d.hue},60%,85%,0)`);
      //   ctx.beginPath();
      //   ctx.arc(d.x, d.y, d.size * 3, 0, Math.PI * 2);
      //   ctx.fillStyle = grd;
      //   ctx.fill();
      // });

      // ─ 블랙홀 코어
      const bhR = 55 + 4 * Math.sin(t * 0.7);
      for (let i = 3; i >= 1; i--) {
        const diskR = bhR + i * 18;
        const innerR = Math.max(0, diskR - 8);
        const diskGrd = ctx.createRadialGradient(
          cx,
          cy,
          innerR,
          cx,
          cy,
          diskR + 8,
        );
        diskGrd.addColorStop(0, "rgba(180,160,255,0)");
        diskGrd.addColorStop(0.5, `rgba(200,180,255,${0.05 / i})`);
        diskGrd.addColorStop(1, "rgba(140,100,255,0)");
        ctx.beginPath();
        ctx.arc(cx, cy, diskR, 0, Math.PI * 2);
        ctx.strokeStyle = diskGrd;
        ctx.lineWidth = 16;
        ctx.stroke();
      }

      const bhGrd = ctx.createRadialGradient(cx, cy, 0, cx, cy, bhR * 2.5);
      bhGrd.addColorStop(0, "rgba(0,0,0,1)");
      bhGrd.addColorStop(0.5, "rgba(2,1,10,0.9)");
      bhGrd.addColorStop(0.8, "rgba(20,10,50,0.4)");
      bhGrd.addColorStop(1, "rgba(20,10,50,0)");
      ctx.beginPath();
      ctx.arc(cx, cy, bhR * 2.5, 0, Math.PI * 2);
      ctx.fillStyle = bhGrd;
      ctx.fill();

      animId = requestAnimationFrame(render);
    }

    render();

    const leaveTimer = setTimeout(() => setLeaving(true), STAY);
    const doneTimer = setTimeout(() => onDone(), STAY + LEAVE);

    return () => {
      cancelAnimationFrame(animId);
      clearTimeout(leaveTimer);
      clearTimeout(doneTimer);
    };
  }, [onDone]);

  return (
    <Overlay leaving={leaving}>
      <Canvas ref={canvasRef} />
      <TextWrap>
        <IntroTitle>시먀</IntroTitle>
        <IntroSub>차원의 틈 사이로 발을 들이세요</IntroSub>
      </TextWrap>
    </Overlay>
  );
};

export default Intro;
