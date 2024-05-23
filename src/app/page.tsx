"use client";

import { useEffect, useState } from "react";
import * as amplitude from "@amplitude/analytics-browser";
import { pageViewTrackingEnrichment } from "@/utils/pageViewTrackingEnrichment";

const AMPLITUDE_API_KEY = process.env.NEXT_PUBLIC_AMPLITUDE_API_KEY ?? "";

amplitude.add(pageViewTrackingEnrichment());
amplitude.init(AMPLITUDE_API_KEY, {
  logLevel: amplitude.Types.LogLevel.Warn,
  defaultTracking: true,
});

export default function Home() {
  const word = ["ONF", "HYOJIN", "E_TION", "SEUNGJUN", "WYATT", "MINKYUN", "U"];
  const [currentWordIndex, setCurrentWordIndex] = useState<number>(0);
  const [charIndex, setCharIndex] = useState<number>(0);
  const [blink, setBlink] = useState<boolean>(true);
  const [reverse, setReverse] = useState<boolean>(false);

  useEffect(() => {
    if (charIndex === word[currentWordIndex].length + 1 && !reverse) {
      setReverse(true);
      return;
    }

    if (charIndex === 0 && reverse) {
      setReverse(false);
      setCurrentWordIndex((prev) => (prev + 1) % word.length);
      return;
    }

    const timeout = setTimeout(
      () => {
        setCharIndex((prev) => prev + (reverse ? -1 : 1));
      },
      reverse ? 100 : 200
    );

    return () => clearTimeout(timeout);
  }, [charIndex, currentWordIndex, reverse]);

  useEffect(() => {
    const blinkTimeout = setTimeout(() => {
      setBlink((prev) => !prev);
    }, 400);
    return () => clearTimeout(blinkTimeout);
  }, [blink]);

  return (
    <div className="font-sans bg-black text-white bold-16">
      <span className="mr-2">infuse</span>
      <span className="mr-2">into</span>
      <span className="text-shadow-neon">
        {`${word[currentWordIndex].substring(0, charIndex)}${
          blink ? "|" : " "
        }`}
      </span>
    </div>
  );
}
