"use client";

import { Suspense, useEffect, useState, useRef, useCallback } from "react";
import Image from "next/image";
import video from "@/data/video.json";
import VideoList from "@/components/main/VideoList";
import Banner from "@/components/main/Banner";
import Footer from "@/components/main/Footer";
import Link from "next/link";
import { track } from "@amplitude/analytics-browser";
import icon_infuse from "@/assets/icons/icon_infuse.svg";
import icon_earth from "@/assets/icons/icon_earth.png";
import icon_bookmark_line from "@/assets/icons/icon-bookmark-line.png";
import { translateLanguage } from "@/utils/translate";
import { usePathname } from "next/navigation";

export default function MainPage() {
  const currentPathname = usePathname();

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
    <nav className="z-[1000] bg-[#f5f3ee] px-3 md:px-8 md:py-3 flex items-center w-full justify-between border-b-2 border-[#dddddd] position: fixed h-[64px]">
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
          <Image
            unoptimized
            className="mr-3"
            src={icon_infuse}
            alt="메인"
            width={95}
            height={20}
          />
        </Link>
        <section
          className="font-sans text-[#121212] font-medium text-lg relative cursor-pointer width-[20px] height-[20px]  hover:text-[#bc2a31] transition-colors"
          ref={languageRef}
          onClick={() => setIsLanguageMenuOpen((prev) => !prev)}
        >
          <Image
            unoptimized
            src={icon_earth}
            alt="언어 선택"
            width={18}
            height={18}
          />
          {isLanguageMenuOpen && (
            <ul className="absolute top-8 left-0 bg-black  p-2 rounded z-50">
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
      <div className="flex justify-center items-center">
        <Link
          href={{
            pathname: "/playlist",
          }}
          className={`mr-3  font-sans text-base relative cursor-pointer width-[20px] height-[20px] transition-colors ${
            currentPathname === "/playlist"
              ? "text-[#bc2a31] font-semibold"
              : "text-[#121212] font-medium"
          } hover:text-[#bc2a31]`}
          onClick={() => {
            track("header playlist button");
          }}
        >
          {currentLanguage === "en" ? "playlist" : "플레이리스트"}
        </Link>
        <Link
          href={{
            pathname: "/main",
          }}
          className={`mr-3  font-sans text-base relative cursor-pointer width-[20px] height-[20px] transition-colors ${
            currentPathname !== "/main/bookmark" &&
            currentPathname.includes("main")
              ? "text-[#bc2a31] font-semibold"
              : "text-[#121212] font-medium"
          } hover:text-[#bc2a31]`}
          onClick={() => {
            track("header main button");
          }}
        >
          {currentLanguage === "en" ? "video" : "재생목록"}
        </Link>
        <Link
          href={{
            pathname: "/main/bookmark",
            query: {
              currentLanguage,
            },
          }}
          className={`font-sans font-medium text-base relative cursor-pointer width-[20px] height-[20px] transition-colors ${
            currentPathname === "/main/bookmark"
              ? "text-[#bc2a31] font-semibold "
              : "text-[#121212] font-medium"
          } hover:text-[#bc2a31]`}
          onClick={() => {
            track("header bookmark button");
          }}
        >
          {currentLanguage === "en" ? "bookmark" : "북마크"}
        </Link>
      </div>
    </nav>
  );
}
