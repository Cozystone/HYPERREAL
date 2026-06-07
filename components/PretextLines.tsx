"use client";

import { layoutWithLines, prepareWithSegments } from "@chenglou/pretext";
import { useEffect, useRef, useState } from "react";

type PretextLinesProps = {
  text: string;
  className?: string;
};

function px(value: string, fallback: number) {
  const parsed = Number.parseFloat(value);
  return Number.isFinite(parsed) ? parsed : fallback;
}

export function PretextLines({ text, className = "" }: PretextLinesProps) {
  const ref = useRef<HTMLHeadingElement>(null);
  const [lines, setLines] = useState<string[]>([text]);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const update = () => {
      const style = getComputedStyle(element);
      const width = element.clientWidth;
      if (!width) return;

      const font = `${style.fontStyle} ${style.fontWeight} ${style.fontSize} ${style.fontFamily}`;
      const lineHeight = px(style.lineHeight, px(style.fontSize, 48) * 1.05);
      const prepared = prepareWithSegments(text, font, {
        wordBreak: "keep-all",
      });
      setLines(layoutWithLines(prepared, width, lineHeight).lines.map((line) => line.text));
    };

    update();
    const observer = new ResizeObserver(update);
    observer.observe(element);
    return () => observer.disconnect();
  }, [text]);

  return (
    <h1 ref={ref} className={className} aria-label={text}>
      {lines.map((line, index) => (
        <span key={`${line}-${index}`} className="block">
          {line}
        </span>
      ))}
    </h1>
  );
}
