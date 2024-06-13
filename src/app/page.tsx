"use client";

import { useEffect, useState } from "react";
import * as amplitude from "@amplitude/analytics-browser";
import { pageViewTrackingEnrichment } from "@/utils/pageViewTrackingEnrichment";
import Link from "next/link";

const AMPLITUDE_API_KEY = process.env.NEXT_PUBLIC_AMPLITUDE_API_KEY ?? "";

amplitude.add(pageViewTrackingEnrichment());
amplitude.init(AMPLITUDE_API_KEY, {
  logLevel: amplitude.Types.LogLevel.Warn,
  defaultTracking: true,
});

export default function Home() {
  const word = ["ONF", "HYOJIN", "E-TION", "SEUNGJUN", "WYATT", "MINKYUN", "U"];
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
    <div className="font-sans bg-black text-light-gray w-full h-screen flex justify-center items-center flex-col">
      <section className="flex flex-col justify-center items-center bold-36 sm:bold-96 lg:flex-row">
        <span className="mr-0 lg:mr-8 ">infuse</span>
        <div>
          <span className="mr-4 lg:mr-6 sm:mr-8">into</span>
          <span className="text-shadow-neon">
            {`${word[currentWordIndex].substring(0, charIndex)}${
              blink ? "|" : " "
            }`}
          </span>
        </div>
      </section>
      <Link href="/main" className="bold-24 text-dark-gray cursor-pointer">
        press to start
      </Link>
    </div>
  );
}
