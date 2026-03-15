"use client";

export default function SplitText({ children }: { children: string }) {
  return (
    <>
      {children.split("").map((char, i) => (
        <span
          key={i}
          className="split-char inline-block"
          style={{
            display: char === " " ? "inline" : "inline-block",
          }}
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </>
  );
}
