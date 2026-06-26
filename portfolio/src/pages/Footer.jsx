import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger);

/* =====================================================================
   Tunable constants — identical values to the original vanilla script
   ===================================================================== */
const ASCII_CHARS = "... ... .. :::=+xX#0369";
const FONT_SIZE = 18;
const CELL_SIZE = 20;
const ASCII_COLUMNS = 80;
const DPR = 2;

const CHAR_COLOR = "#803500";
const HOVER_COLOR = "#ff6a00";
const HOVER_CHAR_COLOR = "#0f0f0f";

const HOVER_RADIUS = 8;
const CLUSTER_SIZE = 10;
const HIGHLIGHT_LIFETIME = 300;

const ALPHA_THRESHOLD = 32; // pixels below this alpha are treated as empty/background

const PARALLAX_STRENGTH = 20;
const PARALLAX_EASE = 0.05;

const backgroundCharIndex = ASCII_CHARS.lastIndexOf(".");

const Footer = () => {
  const footerRef = useRef(null);
  const revealerRef = useRef(null);
  const handWrapperRefs = useRef([]);
  const handImageRefs = useRef([]);
  const headingRefs = useRef([]);
  const linkRefs = useRef([]);
  const textRefs = useRef([]);

  useEffect(() => {
    const footer = footerRef.current;
    if (!footer) return;

    /* ---------------- Lenis + GSAP ticker ---------------- */
    const lenis = new Lenis();
    lenis.on("scroll", ScrollTrigger.update);
    const tickerFn = (time) => lenis.raf(time * 1000);
    gsap.ticker.add(tickerFn);
    gsap.ticker.lagSmoothing(0);

    /* ---------------- Free SplitText replacement ---------------- */
    const wrapChars = (el) => {
      const text = el.textContent;
      el.textContent = "";
      const chars = [];

      for (const ch of text) {
        const span = document.createElement("span");
        span.className = "char";
        span.textContent = ch === " " ? "\u00A0" : ch;
        el.appendChild(span);
        chars.push(span);
      }
      return chars;
    };

    const wrapLines = (el) => {
      const inner = document.createElement("span");
      inner.style.display = "block";
      inner.innerHTML = el.innerHTML;

      el.textContent = "";
      el.classList.add("line");
      el.appendChild(inner);

      return inner;
    };

    const headingChars = [];
    headingRefs.current.forEach((heading) => {
      if (heading) headingChars.push(...wrapChars(heading));
    });
    gsap.set(headingChars, { yPercent: 125 });

    const contentLines = [];
    [...linkRefs.current, ...textRefs.current].forEach((el) => {
      if (el) contentLines.push(wrapLines(el));
    });
    gsap.set(contentLines, { yPercent: 100 });

    /* ---------------- ASCII hand canvas effect ---------------- */
    const sampleImagePixels = (image, gridRows) => {
      const canvas = document.createElement("canvas");
      canvas.width = ASCII_COLUMNS;
      canvas.height = gridRows;

      const ctx = canvas.getContext("2d", { alpha: true });
      ctx.clearRect(0, 0, ASCII_COLUMNS, gridRows);
      ctx.drawImage(image, 0, 0, ASCII_COLUMNS, gridRows);
      return ctx.getImageData(0, 0, ASCII_COLUMNS, gridRows).data;
    };

    const pixelToCharIndex = (pixels, pixelOffset) => {
      const brightness =
        (pixels[pixelOffset] * 0.299 +
          pixels[pixelOffset + 1] * 0.587 +
          pixels[pixelOffset + 2] * 0.114) /
        255;

      return Math.min(
        ASCII_CHARS.length - 1,
        Math.floor((1 - brightness) * ASCII_CHARS.length),
      );
    };

    const buildCells = (image) => {
      const rows = Math.round(
        ASCII_COLUMNS / (image.naturalWidth / image.naturalHeight),
      );
      const pixels = sampleImagePixels(image, rows);
      const cells = new Map();

      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < ASCII_COLUMNS; col++) {
          const pixelOffset = (row * ASCII_COLUMNS + col) * 4;
          const alpha = pixels[pixelOffset + 3];

          if (alpha < ALPHA_THRESHOLD) continue;

          const charIndex = pixelToCharIndex(pixels, pixelOffset);
          if (charIndex <= backgroundCharIndex) continue;

          cells.set(`${col}, ${row}`, {
            col,
            row,
            char: ASCII_CHARS[charIndex],
            highlightEndTime: 0,
          });
        }
      }
      return { rows, cells };
    };

    let rafIds = [];

    const setupHand = (image) => {
      const { rows, cells } = buildCells(image);
      const cellList = [...cells.values()];

      const canvas = image.closest(".footer-hand-img").querySelector("canvas");
      canvas.width = ASCII_COLUMNS * CELL_SIZE * DPR;
      canvas.height = rows * CELL_SIZE * DPR;

      const ctx = canvas.getContext("2d");
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
      ctx.font = `${FONT_SIZE}px monospace`;
      ctx.textAlign = "center";
      ctx.textBaseline = "alphabetic";

      const metrics = ctx.measureText("X");
      const glyphHeight =
        metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent;
      const baselineOffset =
        CELL_SIZE / 2 + glyphHeight / 2 - metrics.actualBoundingBoxDescent;

      const canvasWidth = ASCII_COLUMNS * CELL_SIZE;
      const canvasHeight = rows * CELL_SIZE;

      let rafId;
      const render = () => {
        const now = Date.now();
        ctx.clearRect(0, 0, canvasWidth, canvasHeight);

        for (const cell of cellList) {
          const x = cell.col * CELL_SIZE;
          const y = cell.row * CELL_SIZE;
          const isHighlighted = cell.highlightEndTime > now;

          if (isHighlighted) {
            ctx.fillStyle = HOVER_COLOR;
            ctx.fillRect(x, y, CELL_SIZE, CELL_SIZE);
          }

          ctx.fillStyle = isHighlighted ? HOVER_CHAR_COLOR : CHAR_COLOR;
          ctx.fillText(cell.char, x + CELL_SIZE / 2, y + baselineOffset);
        }

        rafId = requestAnimationFrame(render);
        rafIds.push(rafId);
      };

      render();

      return { canvas, cells, cellList, rows };
    };

    const hands = [];
    const imageLoadCleanups = [];

    handImageRefs.current.forEach((image) => {
      if (!image) return;
      const canvas = document.createElement("canvas");
      image.closest(".footer-hand-img").appendChild(canvas);

      const start = () => hands.push(setupHand(image));
      if (image.complete && image.naturalWidth) {
        start();
      } else {
        image.addEventListener("load", start);
        imageLoadCleanups.push(() => image.removeEventListener("load", start));
      }
    });

    const highlightCluster = (cells, startCell) => {
      const now = Date.now();
      startCell.highlightEndTime = now + HIGHLIGHT_LIFETIME;

      const steps = Math.floor(Math.random() * CLUSTER_SIZE) + 1;
      const litCells = [startCell];
      let current = startCell;

      for (let step = 0; step < steps; step++) {
        const neighbours = [];
        for (let dy = -1; dy <= 1; dy++) {
          for (let dx = -1; dx <= 1; dx++) {
            if (dx === 0 && dy === 0) continue;
            const neighbour = cells.get(
              `${current.col + dx}, ${current.row + dy}`,
            );
            if (neighbour && !litCells.includes(neighbour))
              neighbours.push(neighbour);
          }
        }

        if (neighbours.length === 0) break;

        const next = neighbours[Math.floor(Math.random() * neighbours.length)];
        next.highlightEndTime = now + HIGHLIGHT_LIFETIME + step * 10;
        litCells.push(next);
        current = next;
      }
    };

    const hoverHand = (hand, clientX, clientY) => {
      const rect = hand.canvas.getBoundingClientRect();
      const mouseCol = ((clientX - rect.left) / rect.width) * ASCII_COLUMNS;
      const mouseRow = ((clientY - rect.top) / rect.height) * hand.rows;

      let closest = null;
      let closestDist = Infinity;
      for (const cell of hand.cellList) {
        const dx = mouseCol - cell.col;
        const dy = mouseRow - cell.row;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < closestDist) {
          closestDist = dist;
          closest = cell;
        }
      }

      if (closest && closestDist <= HOVER_RADIUS) {
        highlightCluster(hand.cells, closest);
      }
    };

    const handleHoverMouseMove = (event) => {
      hands.forEach((hand) => hoverHand(hand, event.clientX, event.clientY));
    };
    window.addEventListener("mousemove", handleHoverMouseMove);

    /* ---------------- Parallax ---------------- */
    const handWrappers = handWrapperRefs.current.filter(Boolean);
    const parallaxScale = 1 + (PARALLAX_STRENGTH * 2) / 200;

    const pointer = { x: 0, y: 0 };
    const drift = { x: 0, y: 0 };
    const reveal = { left: -125, right: 125 };

    const setPointerTarget = (clientX, clientY) => {
      const rect = footer.getBoundingClientRect();
      pointer.x =
        ((clientX - rect.left) / rect.width - 0.5) * PARALLAX_STRENGTH * 2;
      pointer.y =
        ((clientY - rect.top) / rect.height - 0.5) * PARALLAX_STRENGTH * 2;
    };

    let parallaxRafId;
    const renderParallax = () => {
      drift.x += (pointer.x - drift.x) * PARALLAX_EASE;
      drift.y += (pointer.y - drift.y) * PARALLAX_EASE;

      handWrappers.forEach((wrapper, i) => {
        const direction = i === 0 ? 1 : -1;
        const revealX = i === 0 ? reveal.left : reveal.right;
        const x = drift.x * direction;
        const y = -drift.y;
        wrapper.style.transform = `translate(calc(${x}px + ${revealX}%), ${y}px) scale(${parallaxScale})`;
      });

      parallaxRafId = requestAnimationFrame(renderParallax);
    };
    renderParallax();

    const handleParallaxMouseMove = (event) => {
      setPointerTarget(event.clientX, event.clientY);
    };
    window.addEventListener("mousemove", handleParallaxMouseMove);

    /* ---------------- Reveal animation (ScrollTrigger) ---------------- */
    const charStagger = { each: 0.04, from: "center" };

    const animateIn = () => {
      gsap.to(reveal, {
        left: 0,
        right: 0,
        duration: 1,
        ease: "power3.out",
        overwrite: true,
      });

      gsap.to(headingChars, {
        yPercent: 0,
        duration: 1,
        ease: "power3.out",
        stagger: charStagger,
        overwrite: true,
      });

      gsap.to(contentLines, {
        yPercent: 0,
        duration: 1,
        ease: "power3.out",
        stagger: 0.08,
        overwrite: true,
      });
    };

    const animateOut = () => {
      gsap.to(reveal, {
        left: -125,
        right: 125,
        duration: 1,
        ease: "power3.out",
        overwrite: true,
      });

      gsap.to(headingChars, {
        yPercent: 125,
        duration: 1,
        ease: "power3.out",
        stagger: charStagger,
        overwrite: true,
      });

      gsap.to(contentLines, {
        yPercent: 100,
        duration: 1,
        ease: "power3.out",
        stagger: 0.08,
        overwrite: true,
      });
    };

    const enterTrigger = ScrollTrigger.create({
      trigger: revealerRef.current,
      start: "top 50%",
      onEnter: animateIn,
    });

    const leaveTrigger = ScrollTrigger.create({
      trigger: revealerRef.current,
      start: "top 85%",
      onLeaveBack: animateOut,
    });

    /* ---------------- Cleanup ---------------- */
    return () => {
      window.removeEventListener("mousemove", handleHoverMouseMove);
      window.removeEventListener("mousemove", handleParallaxMouseMove);

      imageLoadCleanups.forEach((cleanup) => cleanup());

      rafIds.forEach((id) => cancelAnimationFrame(id));
      if (parallaxRafId) cancelAnimationFrame(parallaxRafId);

      enterTrigger.kill();
      leaveTrigger.kill();

      gsap.ticker.remove(tickerFn);
      lenis.destroy();
    };
  }, []);

  return (
    <>
      <div ref={revealerRef} className="footer-revealer" />

      <footer ref={footerRef} className="ansh-footer">
        <div className="footer-images">
          <div
            className="footer-hand-img"
            ref={(el) => (handWrapperRefs.current[0] = el)}
          >
            <img
              className="ascii-hand"
              src="/Hand-left.png"
              alt=""
              ref={(el) => (handImageRefs.current[0] = el)}
            />
          </div>
          <div
            className="footer-hand-img"
            ref={(el) => (handWrapperRefs.current[1] = el)}
          >
            <img
              className="ascii-hand"
              src="/Hand-right.png"
              alt=""
              ref={(el) => (handImageRefs.current[1] = el)}
            />
          </div>
        </div>

        <div className="footer-content">
          <nav className="footer-links">
            <a href="#" ref={(el) => (linkRefs.current[0] = el)}>
              Work
            </a>
            <a href="#" ref={(el) => (linkRefs.current[1] = el)}>
              About
            </a>
            <a href="#" ref={(el) => (linkRefs.current[2] = el)}>
              Journal
            </a>
            <a href="#" ref={(el) => (linkRefs.current[3] = el)}>
              Contact
            </a>
          </nav>

          <div className="footer-text">
            <p ref={(el) => (textRefs.current[0] = el)}>
              Think. Create. Conquer.
            </p>
          </div>
        </div>

        <div className="footer-header">
          <h1 ref={(el) => (headingRefs.current[0] = el)}>Ansh</h1>
          <h1 ref={(el) => (headingRefs.current[1] = el)}>Coder</h1>
        </div>
      </footer>

      <style>{`
        .ansh-footer {
          position: relative;
          width: 100%;
          height: 100svh;
          background-color: #0f0f0f;
          overflow: hidden;
        }

        .footer-images {
          position: absolute;
          inset: 0;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .footer-hand-img {
          position: relative;
          width: 40%;
          min-width: 200px;
          will-change: transform;
        }

        .footer-hand-img img {
          display: block;
          width: 100%;
          opacity: 0;
        }

        .footer-hand-img canvas {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
        }

        .footer-content {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          padding: 2rem;
          display: flex;
          justify-content: space-between;
          gap: 2rem;
          color: #fff;
        }

        .footer-links {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
          overflow: hidden;
        }

        .footer-links a {
          color: #fff;
          text-decoration: none;
          font-size: 1.1rem;
        }

        .footer-text {
          max-width: 28rem;
          overflow: hidden;
        }

        .footer-text p {
          font-size: 1.1rem;
          line-height: 1.4;
        }

        .footer-header {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          padding: 2rem;
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          color: #fff;
        }

        .footer-header h1 {
          font-size: clamp(4rem, 15vw, 15rem);
          font-weight: 500;
          line-height: 1;
          letter-spacing: -2%;
          overflow: hidden;
        }

        .footer-header h1 .char {
          display: inline-block;
          will-change: transform;
        }

        .line {
          display: block;
          overflow: hidden;
        }

        .line > * {
          display: block;
          will-change: transform;
        }

        @media (max-width: 1000px) {
          .footer-content {
            flex-direction: column;
          }
          .footer-text {
            max-width: 100%;
          }
          .footer-header h1 {
            font-size: 3rem;
          }
        }
      `}</style>
    </>
  );
};

export default Footer;