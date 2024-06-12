"use client";

import { Suspense, useEffect, useState, useRef, useCallback } from "react";
import Image from "next/image";
import video from "@/data/video.json";
import VideoList from "@/components/main/VideoList";
import Banner from "@/components/main/Banner";
import Footer from "@/components/main/Footer";
import light_stick from "@/assets/images/light_stick.jpg";
import icon_earth from "@/assets/icons/icon_earth.png";
import { translateLanguage } from "@/utils/translate";

export default function MainPage() {
  const languageRef = useRef<HTMLElement>(null);
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState<boolean>(false);
  const [currentLanguage, setCurrentLanguage] = useState<string>("ko");

  useEffect(() => {
    const localStorageLang = localStorage.getItem("language");
    if (localStorageLang) {
      setCurrentLanguage(localStorageLang);
    } else {
      localStorage.setItem("language", currentLanguage);
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
    localStorage.setItem("language", lang);
    setIsLanguageMenuOpen(false);
  };

  return (
    <>
      <nav className="flex items-center w-full justify-between">
        <div className="flex flex-row items-center">
          <p className="font-sans bold-36 text-light-gray">infuse</p>
          <section
            className="relative cursor-pointer ml-4 pt-3 width-[20px] height-[20px]"
            ref={languageRef}
            onClick={() => setIsLanguageMenuOpen((prev) => !prev)}
          >
            <Image src={icon_earth} alt="언어 선택" width={20} height={20} />
            {isLanguageMenuOpen && (
              <ul className="absolute top-8 left-0 bg-black  p-2 rounded z-50 mt-2">
                <button
                  className={`regular-18 ${
                    currentLanguage === "ko" ? "text-white" : "text-dark-gray"
                  }  hover:text-white mb-1`}
                  onClick={(e) => {
                    e.stopPropagation();
                    changeLanguage("ko");
                  }}
                >
                  한국어
                </button>
                <button
                  className={`regular-18 ${
                    currentLanguage === "en" ? "text-white" : "text-dark-gray"
                  }  hover:text-white mb-1`}
                  onClick={(e) => {
                    e.stopPropagation();
                    changeLanguage("en");
                  }}
                >
                  English
                </button>
              </ul>
            )}
          </section>
        </div>
        <section className="text-white flex flex-row text-left justify-end items-end mb-4 pt-4 pr-4">
          <p className="mr-2">
            {translateLanguage(currentLanguage, "nickname")}
          </p>
          <Image src={light_stick} alt="응원봉 프로필" width="40" height="40" />
        </section>
      </nav>

      <Banner currentLanguage={currentLanguage} />
      <section className="mt-8">
        <Suspense fallback={<p>Loading...</p>}>
          {video.map((data) => {
            return (
              <VideoList
                currentLanguage={currentLanguage}
                title={data.title}
                list={data.list}
                key={data.title}
              />
            );
          })}
        </Suspense>
      </section>
      <Footer />
    </>
  );
}
