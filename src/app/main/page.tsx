"use client";

import { Suspense, useEffect, useState, useRef, useCallback } from "react";
import Image from "next/image";
import video from "@/data/video.json";
import VideoList from "@/components/main/VideoList";
import Banner from "@/components/main/Banner";
import Footer from "@/components/main/Footer";
import Header from "@/components/main/Header";
import Link from "next/link";

import light_stick from "@/assets/images/light_stick.jpg";
import icon_earth from "@/assets/icons/icon_earth.png";
import icon_bookmark_line from "@/assets/icons/icon-bookmark-line.png";
import { translateLanguage } from "@/utils/translate";
import { useSearchParams } from "next/navigation";

export default function MainPage() {
  const searchParams = useSearchParams();
  const currentLanguage = searchParams.get("currentLanguage") || "";
  const listTitle = searchParams.get("listTitle");

  useEffect(() => {
    if (listTitle) {
      const timer = setTimeout(() => {
        const element = document.getElementById(listTitle);
        if (element) {
          const offset = 88; // header(64) + margin(24)
          const elementPosition =
            element.getBoundingClientRect().top + window.scrollY;
          window.scrollTo({
            top: elementPosition - offset,
            behavior: "smooth",
          });
        }
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [listTitle]);

  return (
    <>
      {/* <Banner currentLanguage={currentLanguage} /> */}
      <section className="py-[64px] bg-[#f5f3ee] text-[#121212] px-8">
        <Suspense fallback={<p>Loading...</p>}>
          {video.map((data) => {
            return (
              <VideoList
                currentLanguage={currentLanguage}
                title={data.title}
                list={data.list}
                key={data.title}
                id={data.title}
              />
            );
          })}
        </Suspense>
      </section>
    </>
  );
}
