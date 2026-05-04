import React, { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

// ── Types ──────────────────────────────────────────────────────────────────────

interface ProductTheme {
  bg: string;
  accent: string;
  accentLight: string;
  text: string;
  muted: string;
  btnBg: string;
  btnText: string;
  ring: string;
}

interface Product {
  slug: string;
  name: string;
  desc: string;
  img: string;
  price: string;
  tags: string[];
  theme: ProductTheme;
}

// ── Data ───────────────────────────────────────────────────────────────────────

const products: Product[] = [
  {
    slug: "cashew-raisin",
    name: "Cashew Raisin",
    desc: "The dynamic duo of cashews & raisins — a snacking sensation that powers your vibrant lifestyle naturally.",
    img: "/images/cashew-raisin.png",
    price: "₹40",
    tags: ["5g Protein", "Natural", "No Sugar"],
    theme: {
      bg: "#FDF6EC",
      accent: "#C4862A",
      accentLight: "#FAE6C0",
      text: "#3D2A0A",
      muted: "#8A6A3A",
      btnBg: "#C4862A",
      btnText: "#fff",
      ring: "rgba(196,134,42,0.25)",
    },
  },
  {
    slug: "coconut-almond",
    name: "Coconut Almond",
    desc: "Coconut & almonds — nourishing prowess meets mouth-watering taste, keeping you fuelled & fabulous.",
    img: "/images/coconut-almond.png",
    price: "₹40",
    tags: ["5g Protein", "Vegetarian", "Natural"],
    theme: {
      bg: "#EEF7F4",
      accent: "#1D9E75",
      accentLight: "#C2EDDC",
      text: "#083D2B",
      muted: "#3A7A60",
      btnBg: "#1D9E75",
      btnText: "#fff",
      ring: "rgba(29,158,117,0.2)",
    },
  },
  {
    slug: "date-almond-cranberry",
    name: "Date Almond Cranberry",
    desc: "Dates, cranberries & almonds — a trio of distinct flavours and wellness advantages in every bite.",
    img: "/images/date-almond-cranberry.png",
    price: "₹40",
    tags: ["5g Protein", "No Preservatives", "Pure"],
    theme: {
      bg: "#FBF0F0",
      accent: "#C03A3A",
      accentLight: "#F5C4C4",
      text: "#3D0A0A",
      muted: "#8A3A3A",
      btnBg: "#C03A3A",
      btnText: "#fff",
      ring: "rgba(192,58,58,0.2)",
    },
  },
  {
    slug: "almond-cranberry",
    name: "Almond Cranberry",
    desc: "Jaggery, cranberries & almonds — a festive treat that tantalises taste buds while promoting well-being.",
    img: "/images/almond-cranberry.png",
    price: "₹40",
    tags: ["5g Protein", "Jaggery Sweet", "All Natural"],
    theme: {
      bg: "#EFF2FB",
      accent: "#3A5FC0",
      accentLight: "#C4CDEF",
      text: "#0A1440",
      muted: "#3A4A8A",
      btnBg: "#3A5FC0",
      btnText: "#fff",
      ring: "rgba(58,95,192,0.2)",
    },
  },
];

// ── Sub-components ─────────────────────────────────────────────────────────────

const ChevronLeft = ({ color }: { color: string }) => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 19l-7-7 7-7" />
  </svg>
);

const ChevronRight = ({ color }: { color: string }) => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 5l7 7-7 7" />
  </svg>
);

// Spinning ring decoration
const Ring = ({
  size,
  borderColor,
  dashed = false,
  duration,
  reverse = false,
}: {
  size: number;
  borderColor: string;
  dashed?: boolean;
  duration: number;
  reverse?: boolean;
}) => (
  <motion.div
    animate={{ rotate: reverse ? -360 : 360 }}
    transition={{ duration, repeat: Infinity, ease: "linear" }}
    style={{
      position: "absolute",
      width: size,
      height: size,
      borderRadius: "50%",
      border: `1px ${dashed ? "dashed" : "solid"} ${borderColor}`,
      opacity: dashed ? 0.5 : 1,
      transition: "border-color 0.8s ease",
    }}
  />
);

// ── Main Landing Page ──────────────────────────────────────────────────────────

export const LandingPage: React.FC = () => {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const touchStartX = useRef(0);
  const touchStartY = useRef(0);
  const mouseStartX = useRef(0);
  const isDragging = useRef(false);
  const autoRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const product = products[current];
  const { theme } = product;

  // Auto-advance
  const startAuto = useCallback(() => {
    autoRef.current = setInterval(() => {
      setDirection(1);
      setCurrent((prev) => (prev + 1) % products.length);
    }, 5000);
  }, []);

  const stopAuto = useCallback(() => {
    if (autoRef.current) clearInterval(autoRef.current);
  }, []);

  useEffect(() => {
    if (!isHovered) startAuto();
    return stopAuto;
  }, [isHovered, startAuto, stopAuto]);

  const goTo = (dir: 1 | -1, targetIndex?: number) => {
    const next =
      targetIndex !== undefined
        ? targetIndex
        : (current + dir + products.length) % products.length;
    setDirection(dir);
    setCurrent(next);
  };

  // Touch / mouse drag
  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    const dy = e.changedTouches[0].clientY - touchStartY.current;
    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 40) goTo(dx < 0 ? 1 : -1);
  };
  const onMouseDown = (e: React.MouseEvent) => {
    mouseStartX.current = e.clientX;
    isDragging.current = true;
  };
  const onMouseUp = (e: React.MouseEvent) => {
    if (!isDragging.current) return;
    isDragging.current = false;
    const dx = e.clientX - mouseStartX.current;
    if (Math.abs(dx) > 50) goTo(dx < 0 ? 1 : -1);
  };

  // Framer variants
  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 80 : -80,
      opacity: 0,
      scale: 0.88,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: { duration: 0.55, type: "spring" as const, stiffness: 260, damping: 26 },
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -80 : 80,
      opacity: 0,
      scale: 0.88,
      transition: { duration: 0.3 },
    }),
  };

  const textVariants = {
    enter: { opacity: 0, y: 12 },
    center: { opacity: 1, y: 0, transition: { duration: 0.45, delay: 0.1 } },
    exit: { opacity: 0, y: -8, transition: { duration: 0.25 } },
  };

  // Transition helper for inline styles
  const t = "0.8s cubic-bezier(.4,0,.2,1)";

  return (
    <div
      style={{
        width: "100%",
        minHeight: "100vh",
        position: "relative",
        overflow: "hidden",
        fontFamily: "'Jost', 'Helvetica Neue', sans-serif",
        backgroundColor: theme.bg,
        transition: `background-color ${t}`,
        cursor: isDragging.current ? "grabbing" : "grab",
        userSelect: "none",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => { setIsHovered(false); isDragging.current = false; }}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
    >

      {/* Ghost watermark */}
      <div
        style={{
          position: "absolute",
          bottom: -20,
          left: "50%",
          transform: "translateX(-50%)",
          fontSize: "clamp(60px, 18vw, 160px)",
          fontFamily: "'Cormorant Garamond', Georgia, serif",
          fontWeight: 300,
          whiteSpace: "nowrap",
          letterSpacing: "-0.02em",
          pointerEvents: "none",
          color: theme.accent,
          opacity: 0.07,
          lineHeight: 1,
          transition: `color ${t}`,
        }}
      >
        ANGSTROHM
      </div>

      {/* Navbar */}
      <div
        style={{
          position: "relative",
          zIndex: 10,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "28px 40px 0",
        }}
      >
        <div
          style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: 22,
            fontWeight: 300,
            letterSpacing: "0.06em",
            color: theme.text,
            transition: `color ${t}`,
          }}
        >
          Angstrohm
        </div>
        <div style={{ display: "flex", gap: 28 }}>
          {["Shop", "About", "Story"].map((label) => (
            <span
              key={label}
              style={{
                fontSize: 11,
                letterSpacing: "0.18em",
                fontWeight: 300,
                textTransform: "uppercase" as const,
                color: theme.muted,
                opacity: 0.7,
                cursor: "pointer",
                transition: `color ${t}`,
              }}
            >
              {label}
            </span>
          ))}
        </div>
      </div>

      {/* Product area */}
      <div
        style={{
          position: "relative",
          zIndex: 5,
          display: "flex",
          flexDirection: "column" as const,
          alignItems: "center",
          justifyContent: "center",
          padding: "32px 40px 0",
        }}
      >
        {/* Image with rings */}
        <div style={{ position: "relative", width: 260, height: 260, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Ring size={260} borderColor={theme.ring} duration={22} />
          <Ring size={200} borderColor={theme.ring} dashed duration={15} reverse />

          <AnimatePresence mode="wait" custom={direction}>
            <motion.img
              key={current}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              src={product.img}
              alt={product.name}
              draggable={false}
              style={{
                width: 180,
                height: 180,
                objectFit: "contain",
                position: "relative",
                zIndex: 2,
                filter: "drop-shadow(0 12px 28px rgba(0,0,0,0.13))",
              }}
            />
          </AnimatePresence>
        </div>

        {/* Text content */}
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={current}
            custom={direction}
            variants={textVariants}
            initial="enter"
            animate="center"
            exit="exit"
            style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: 20 }}
          >
            {/* Product name */}
            <div
              style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: "clamp(32px, 5vw, 52px)",
                fontWeight: 300,
                letterSpacing: "-0.01em",
                textAlign: "center",
                color: theme.text,
                lineHeight: 1.1,
                transition: `color ${t}`,
              }}
            >
              {product.name}
            </div>

            {/* Description */}
            <div
              style={{
                fontSize: 12,
                fontWeight: 300,
                letterSpacing: "0.04em",
                textAlign: "center",
                maxWidth: 340,
                lineHeight: 1.9,
                marginTop: 10,
                color: theme.muted,
                transition: `color ${t}`,
              }}
            >
              {product.desc}
            </div>

            {/* Tags */}
            <div style={{ display: "flex", gap: 8, marginTop: 14, flexWrap: "wrap" as const, justifyContent: "center" }}>
              {product.tags.map((tag) => (
                <span
                  key={tag}
                  style={{
                    fontSize: 10,
                    letterSpacing: "0.16em",
                    padding: "5px 12px",
                    border: `0.5px solid ${theme.accentLight}`,
                    fontWeight: 300,
                    color: theme.muted,
                    background: theme.bg,
                    transition: `border-color ${t}, color ${t}, background ${t}`,
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* CTA row */}
            <div style={{ display: "flex", alignItems: "center", gap: 20, marginTop: 20 }}>
              <Link to={`/product/${product.slug}`} style={{ textDecoration: "none" }}>
                <motion.button
                  whileHover={{ scale: 1.04, opacity: 0.9 }}
                  whileTap={{ scale: 0.96 }}
                  style={{
                    padding: "12px 32px",
                    fontSize: 10,
                    letterSpacing: "0.22em",
                    fontWeight: 300,
                    fontFamily: "inherit",
                    border: "none",
                    cursor: "pointer",
                    background: theme.btnBg,
                    color: theme.btnText,
                    textTransform: "uppercase" as const,
                    transition: `background ${t}, color ${t}`,
                  }}
                >
                  Shop Now
                </motion.button>
              </Link>
              <div
                style={{
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  fontSize: 30,
                  fontWeight: 300,
                  color: theme.accent,
                  transition: `color ${t}`,
                }}
              >
                {product.price}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Dot indicators */}
        <div style={{ display: "flex", gap: 8, marginTop: 22 }}>
          {products.map((_, i) => (
            <motion.div
              key={i}
              onClick={() => goTo(i > current ? 1 : -1, i)}
              animate={{
                width: i === current ? 28 : 14,
                backgroundColor: i === current ? theme.accent : theme.accentLight,
              }}
              transition={{ duration: 0.4 }}
              style={{ height: 2, cursor: "pointer" }}
            />
          ))}
        </div>

        {/* Swipe hint */}
        <div
          style={{
            fontSize: 10,
            letterSpacing: "0.2em",
            marginTop: 12,
            marginBottom: 28,
            textAlign: "center",
            opacity: 0.4,
            color: theme.muted,
            display: "flex",
            alignItems: "center",
            gap: 8,
            transition: `color ${t}`,
          }}
        >
          <ChevronLeft color={theme.muted} />
          swipe to explore
          <ChevronRight color={theme.muted} />
        </div>
      </div>

      {/* Side arrows */}
      {(
        [
          { side: "left" as const, onClick: () => goTo(-1), icon: <ChevronLeft color={theme.accent} /> },
          { side: "right" as const, onClick: () => goTo(1), icon: <ChevronRight color={theme.accent} /> },
        ] as const
      ).map(({ side, onClick, icon }) => (
        <motion.button
          key={side}
          onClick={onClick}
          whileHover={{ opacity: 1, scale: 1.08 }}
          whileTap={{ scale: 0.92 }}
          style={{
            position: "absolute",
            [side]: 16,
            top: "50%",
            transform: "translateY(-50%)",
            width: 36,
            height: 36,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            border: `0.5px solid ${theme.ring}`,
            background: "transparent",
            opacity: 0.55,
            zIndex: 20,
            transition: `border-color ${t}`,
          }}
        >
          {icon}
        </motion.button>
      ))}

      {/* Slide counter */}
      <div
        style={{
          position: "absolute",
          right: 40,
          bottom: 28,
          fontFamily: "'Cormorant Garamond', Georgia, serif",
          fontSize: 13,
          fontWeight: 300,
          letterSpacing: "0.1em",
          color: theme.text,
          opacity: 0.4,
          transition: `color ${t}`,
        }}
      >
        {String(current + 1).padStart(2, "0")} / {String(products.length).padStart(2, "0")}
      </div>
    </div>
  );
};

export default LandingPage;