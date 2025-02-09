import { useState, useEffect } from "react";

const DominoFall = ({ count = 5 }) => {
  const [activeDomino, setActiveDomino] = useState(-1);

  useEffect(() => {
    const handleWheel = (e) => {
      e.preventDefault();
      setActiveDomino((prev) => {
        if (e.deltaY > 0) return Math.min(prev + 1, count - 1);
        if (e.deltaY < 0) return Math.max(prev - 1, -1);
        return prev;
      });
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => window.removeEventListener("wheel", handleWheel);
  }, [count]);

  const dominoNumbers = [
    [6, 1],
    [5, 2],
    [4, 3],
    [3, 4],
    [2, 5],
  ].slice(0, count);

  return (
    <div
      style={{
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        display: "flex",
        gap: "20px",
        zIndex: 1000,
        perspective: "2000px",
        filter: "drop-shadow(0 10px 20px rgba(0,0,0,0.3))",
      }}
    >
      {/* Text Elements */}
      <div
        style={{
          position: "absolute",
          top: "-30%",
          left: "0%",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          gap: "20px",
          pointerEvents: "none",
          zIndex: 2000,
        }}
      >
        <span
          style={{
            color: "rgba(255,255,255,0.9)",
            fontSize: "2.5rem",
            fontFamily: "Arial, sans-serif",
            fontWeight: 300,
            letterSpacing: "2px",
            opacity: Math.min(1, Math.max(0, (activeDomino + 1) * 0.5)),
            transform: `translateX(${activeDomino >= 0 ? 0 : -50}px)`,
            transition: "all 1.2s ease",
          }}
        >
          Sorunlarinizi
        </span>

        <span
          style={{
            color: "rgba(255,255,255,0.8)",
            fontSize: "2.5rem",
            fontFamily: "Arial, sans-serif",
            fontWeight: 300,
            opacity: Math.min(1, Math.max(0, activeDomino * 0.5)),
            transform: `translateX(${activeDomino >= 1 ? 0 : -50}px)`,
            transition: "all 1.2s ease 0.3s",
          }}
        >
          birlikte
        </span>
      </div>

      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          opacity: activeDomino >= count - 1 ? 1 : 0,
          transition: "opacity 2s ease 0.5s",
          zIndex: 3000,
          pointerEvents: "none",
        }}
      >
        <span
          style={{
            color: "rgba(255,255,255,1)",
            fontSize: "4rem",
            fontFamily: "Arial, sans-serif",
            fontWeight: "bold",
            textShadow: "0 0 20px rgba(255,255,255,0.5)",
          }}
        >
          YIKALIM
        </span>
      </div>

      {/* Domino Elements */}
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          style={{
            position: "relative",
            transformStyle: "preserve-3d",
            transform: `
              rotateZ(${i <= activeDomino ? -85 : 0}deg)
              translateX(${i <= activeDomino ? 80 : 0}px)
              scale(1.5)
            `,
            transformOrigin: "bottom center",
            transition: "transform 1.2s cubic-bezier(0.16, 1, 0.3, 1)",
            transitionDelay: `${i * 100}ms`,
            marginRight: "-40px",
            zIndex: 1000 - i,
          }}
        >
          {/* Domino body */}
          <div
            style={{
              width: "80px",
              height: "160px",
              backgroundColor: "#151515",
              position: "relative",
              borderRadius: "4px",
              boxShadow: `
              ${
                i <= activeDomino
                  ? "25px -15px 35px rgba(0, 0, 0, 0.4)"
                  : "4px 4px 12px rgba(0, 0, 0, 0.3)"
              },
              inset 0 0 15px rgba(255, 255, 255, 0.1)
            `,
              border: "1px solid rgba(255,255,255,0.1)",
            }}
          >
            <div
              style={{
                position: "absolute",
                width: "8px",
                height: "100%",
                backgroundColor: "#202020",
                right: "-8px",
                borderRadius: "0 4px 4px 0",
                boxShadow: "inset -4px 0 6px rgba(0, 0, 0, 0.3)",
              }}
            />

            <div style={dotsContainer}>
              <div style={topHalf}>{renderDots(dominoNumbers[i][0], true)}</div>
              <div style={bottomHalf}>
                {renderDots(dominoNumbers[i][1], false)}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

// Official domino dot patterns
const dotPositions = {
  1: [{ x: 50, y: 50 }],
  2: [
    { x: 25, y: 25 },
    { x: 75, y: 75 },
  ],
  3: [
    { x: 25, y: 25 },
    { x: 50, y: 50 },
    { x: 75, y: 75 },
  ],
  4: [
    { x: 25, y: 25 },
    { x: 75, y: 25 },
    { x: 25, y: 75 },
    { x: 75, y: 75 },
  ],
  5: [
    { x: 25, y: 25 },
    { x: 75, y: 25 },
    { x: 50, y: 50 },
    { x: 25, y: 75 },
    { x: 75, y: 75 },
  ],
  6: [
    { x: 25, y: 20 },
    { x: 25, y: 50 },
    { x: 25, y: 80 },
    { x: 75, y: 20 },
    { x: 75, y: 50 },
    { x: 75, y: 80 },
  ],
};

const renderDots = (count, isTop) => {
  return dotPositions[count].map((pos, i) => (
    <div
      key={i}
      style={{
        position: "absolute",
        left: `${pos.x}%`,
        top: `${isTop ? pos.y / 1.15 : pos.y / 0.88}%`,
        width: "10px",
        height: "10px",
        borderRadius: "50%",
        backgroundColor: "#f0f0f0",
        transform: "translate(-50%, -50%)",
        boxShadow: `
        inset 0 1px 3px rgba(255, 255, 255, 0.4),
        0 1px 2px rgba(0, 0, 0, 0.2)
      `,
      }}
    />
  ));
};

const dotsContainer = {
  position: "absolute",
  top: "10%",
  left: "10%",
  right: "10%",
  bottom: "10%",
};

const topHalf = {
  position: "absolute",
  top: 0,
  height: "42%",
  width: "100%",
  borderBottom: "1px solid rgba(255, 255, 255, 0.15)",
};

const bottomHalf = {
  position: "absolute",
  bottom: 0,
  height: "42%",
  width: "100%",
  borderTop: "1px solid rgba(255, 255, 255, 0.15)",
};

export default DominoFall;
