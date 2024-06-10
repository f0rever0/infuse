"use client";

import { Suspense, useEffect } from "react";
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

  useEffect(() => {
    track("main");
  });

  return (
    <>
      <nav className="flex items-center">
        <p className="font-sans bold-36 text-light-gray">infuse</p>
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
                title={t(data.title)}
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
