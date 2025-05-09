"use client";

import { useEffect, useState, useRef } from "react";
import * as amplitude from "@amplitude/analytics-browser";
import { pageViewTrackingEnrichment } from "@/utils/pageViewTrackingEnrichment";
import Link from "next/link";
import video from "@/data/video.json";
import { translateLanguage } from "@/utils/translate";
import Header from "@/components/layouts/Header";
import Footer from "@/components/layouts/Footer";
import { track } from "@amplitude/analytics-browser";
import { TranslationDataType } from "@/types/data";

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

  const languageRef = useRef<HTMLElement>(null);
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState<boolean>(false);
  const [currentLanguage, setCurrentLanguage] = useState<string>("ko");

  useEffect(() => {
    const localStorageLang = localStorage.getItem("infuse-language");
    if (localStorageLang) {
      setCurrentLanguage(localStorageLang);
    } else {
      localStorage.setItem("infuse-language", currentLanguage);
    }
  }, []);

  const changeLanguage = (lang: string) => {
    setCurrentLanguage(lang);
    localStorage.setItem("infuse-language", lang);
    location.reload();
    setIsLanguageMenuOpen(false);
  };

  return (
    <>
      <Header />
      <div className=" p-4 font-sans bg-[#f5f3ee] text-[#121212] w-full min-h-screen flex flex-col justify-center items-center py-[128px]">
        <div className="w-full text-start mb-4 text-lg font-semibold text-[#121212] sm:text-2xl sm:mb-6 max-w-[1024px]">
          플레이리스트
        </div>
        <Link
          href={{
            pathname: "/playlist",
          }}
          className="w-full max-w-[360px] justify-self-center font-sans bg-[#f5f3ee] border-2 border-[#bc2a31] text-[#bc2a31] px-3 md:px-8 md:py-3 py-3 rounded font-medium text-center hover:bg-[#bc2a31] hover:text-[#f5f3ee] transition-colors"
          onClick={() => {
            track("index playlist button");
          }}
        >
          멜론 / 벅스 플레이리스트 만들기
        </Link>

        <div className="w-full text-start my-4 text-lg font-semibold text-[#121212] sm:text-2xl sm:my-6 max-w-[1024px]">
          동영상 아카이빙
        </div>
        <section className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-6xl">
          {video.map((data) => (
            <Link
              key={data.title}
              href={{
                pathname: "/main",
                query: {
                  listTitle: data.title,
                },
              }}
              className="w-full max-w-[360px] justify-self-center font-sans bg-[#f5f3ee] border-2 border-[#bc2a31] text-[#bc2a31] px-3 md:px-8 md:py-3 py-3 rounded font-medium text-center hover:bg-[#bc2a31] hover:text-[#f5f3ee] transition-colors"
              onClick={() => {
                track(`index video list button : ${data.title}`);
              }}
            >
              {translateLanguage(
                currentLanguage,
                data.title as keyof TranslationDataType
              )}
            </Link>
          ))}
        </section>
      </div>
      <Footer />
    </>
  );
}
