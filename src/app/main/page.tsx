"use client";

import { Suspense, useEffect, useState, useRef, useCallback } from "react";
import Image from "next/image";
import video from "@/data/video.json";
import { VideoListData } from "@/types/data";
import VideoList from "@/components/main/VideoList";
import { track } from "@amplitude/analytics-browser";
import Banner from "@/components/main/Banner";
import Footer from "@/components/main/Footer";
import light_stick from "@/assets/images/light_stick.jpg";
import { useTranslation } from "react-i18next";

export default function MainPage() {
  const { t, i18n } = useTranslation();
  const languageRef = useRef<null | HTMLDivElement>(null);
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState<boolean>(false);
  const [currentLanguage, setCurrentLanguage] = useState<string>(i18n.language);

  const handleUserClose = useCallback(
    (e: any) => {
      if (
        isLanguageMenuOpen &&
        languageRef.current !== null &&
        !languageRef.current.contains(e.target)
      )
        setIsLanguageMenuOpen(false);
    },
    [isLanguageMenuOpen]
  );

  useEffect(() => {
    document.addEventListener("click", handleUserClose);
    return () => document.removeEventListener("click", handleUserClose);
  }, [handleUserClose]);

  const changeLanguage = (lang: string) => {
    setCurrentLanguage(lang);
    i18n.changeLanguage(lang);
    setIsLanguageMenuOpen(false);
  };

  useEffect(() => {
    track("main");
  });

  return (
    <>
      <nav className="flex items-center">
        <div className="flex flex-row items-center">
          <p className="font-sans bold-36 text-light-gray">infuse</p>
          <section
            className="relative cursor-pointer ml-4 pt-3"
            ref={languageRef}
            onClick={() => setIsLanguageMenuOpen((prev) => !prev)}
          >
            🌐
            {isLanguageMenuOpen && (
              <ul className="absolute top-8 left-0 bg-gray-800 bg-opacity-90 p-2 rounded z-50">
                <button
                  className={`regular-14 ${
                    currentLanguage === "ko"
                      ? "text-white"
                      : "text-middle-blue-gray"
                  }  hover:text-white mb-1`}
                  onClick={() => changeLanguage("ko")}
                >
                  한국어
                </button>
                <button
                  className={`regular-14 ${
                    currentLanguage === "en"
                      ? "text-white"
                      : "text-middle-blue-gray"
                  }  hover:text-white mb-1`}
                  onClick={() => changeLanguage("en")}
                >
                  English
                </button>
              </ul>
            )}
          </section>
        </div>
        <section className="text-white flex flex-row text-left justify-end items-end mb-4 pt-4 w-full pr-4">
          <p className="mr-2">{t("nickname")}</p>
          <Image src={light_stick} alt="응원봉 프로필" width="40" height="40" />
        </section>
      </nav>

      <Banner />
      <section className="mt-8">
        <Suspense fallback={<p>Loading...</p>}>
          {video.map((data: VideoListData) => {
            return (
              <VideoList
                title={t(`videoListTitle.${data.title}`)}
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
