"use client";

import { Suspense, useEffect, useState, useRef, useCallback } from "react";
import Image from "next/image";
import video from "@/data/video.json";
import VideoList from "@/components/main/VideoList";
import Banner from "@/components/main/Banner";
import Footer from "@/components/main/Footer";
import Link from "next/link";
import { track } from "@amplitude/analytics-browser";
import light_stick from "@/assets/images/light_stick.jpg";
import icon_earth from "@/assets/icons/icon_earth.png";
import icon_bookmark_line from "@/assets/icons/icon-bookmark-line.png";
import { translateLanguage } from "@/utils/translate";

export default function MainPage() {
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

  const handleUserClose = useCallback(
    (e: MouseEvent) => {
      if (
        isLanguageMenuOpen &&
        languageRef.current !== null &&
        !languageRef.current.contains(e.target as Node)
      ) {
        setIsLanguageMenuOpen(false);
      }
    },
    [isLanguageMenuOpen]
  );

  useEffect(() => {
    document.addEventListener("click", handleUserClose);
    return () => document.removeEventListener("click", handleUserClose);
  }, [handleUserClose]);

  const changeLanguage = (lang: string) => {
    setCurrentLanguage(lang);
    localStorage.setItem("infuse-language", lang);
    location.reload();
    setIsLanguageMenuOpen(false);
  };

  return (
    <>
      <nav className="z-[1000] bg-[#f5f3ee] px-8 flex items-center w-full justify-between border-b-2 border-[#dddddd] position: fixed h-[64px]">
        <div className="flex flex-row items-center">
          <Link
            className="font-sans bold-24 text-[#12122]"
            href={{
              pathname: "/",
            }}
            onClick={() => {
              track("header home button");
            }}
          >
            infuse into onf
          </Link>
        </div>
        <div className="flex justify-center items-center">
          <Link
            href={{
              pathname: "/main",
            }}
            className="mr-4 font-sans text-[#121212] font-medium text-lg relative cursor-pointer pt-3 width-[20px] height-[20px]  hover:text-[#bc2a31] transition-colors"
            onClick={() => {
              track("header main button");
            }}
          >
            {/* <Image
                src={icon_bookmark_line}
                alt="북마크"
                width={20}
                height={20}
              /> */}

            {currentLanguage === "en" ? "main" : "전체보기"}
          </Link>
          <Link
            href={{
              pathname: "/main/bookmark",
              query: {
                currentLanguage,
              },
            }}
            className="mr-4 font-sans text-[#121212] font-medium text-lg relative cursor-pointer pt-3 width-[20px] height-[20px]  hover:text-[#bc2a31] transition-colors"
            onClick={() => {
              track("header bookmark button");
            }}
          >
            {/* <Image
                src={icon_bookmark_line}
                alt="북마크"
                width={20}
                height={20}
              /> */}

            {currentLanguage === "en" ? "bookmark" : "북마크"}
          </Link>
          <section
            className="font-sans text-[#121212] font-medium text-lg relative cursor-pointer mr-4 pt-3 width-[20px] height-[20px]  hover:text-[#bc2a31] transition-colors"
            ref={languageRef}
            onClick={() => setIsLanguageMenuOpen((prev) => !prev)}
          >
            {currentLanguage === "en" ? "language" : "언어"}
            {/* <Image
                className="mr-2"
                src={icon_earth}
                alt="언어 선택"
                width={20}
                height={20}
              /> */}
            {isLanguageMenuOpen && (
              <ul className="absolute top-8 left-0 bg-black  p-2 rounded z-50 mt-2">
                <button
                  className={`regular-18 ${
                    currentLanguage === "ko" ? "text-white" : "text-dark-gray"
                  }  hover:text-white mb-1 cursor-pointer`}
                  onClick={(e) => {
                    e.stopPropagation();
                    changeLanguage("ko");
                    track("change to ko");
                  }}
                >
                  한국어
                </button>
                <button
                  className={`regular-18 ${
                    currentLanguage === "en" ? "text-white" : "text-dark-gray"
                  }  hover:text-white mb-1 cursor-pointer`}
                  onClick={(e) => {
                    e.stopPropagation();
                    changeLanguage("en");
                    track("change to en");
                  }}
                >
                  English
                </button>
              </ul>
            )}
          </section>
        </div>
        {/* <section className="text-white flex flex-row text-left justify-end items-end mb-4 pt-4 pr-4">
          <p className="mr-2">
            {translateLanguage(currentLanguage, "nickname")}
          </p>
          <Image src={light_stick} alt="응원봉 프로필" width="40" height="40" />
        </section> */}
      </nav>
    </>
  );
}
