"use client";

import { Suspense, useEffect } from "react";
import MainLayout from "./layout";
import Image from "next/image";
import video from "@/data/video.json";
import { VideoListData } from "@/types/data";
import VideoList from "@/components/main/videoList";
import { track } from "@amplitude/analytics-browser";
import Banner from "@/components/main/banner";
import Footer from "@/components/main/footer";
import light_stick from "@/assets/images/light_stick.jpg";

export default function MainPage() {
  // useEffect(() => {
  //   track("main");
  // });

  return (
    <>
      <nav className="flex items-center">
        <p className="font-sans bold-36 text-light-gray">infuse</p>
        <section className="text-white flex flex-row text-left justify-end items-end mb-4 pt-4 w-full pr-4">
          <p className="mr-2">워프봉님,</p>
          <Image src={light_stick} alt="응원봉 프로필" width="40" height="40" />
        </section>
      </nav>

      <Banner />
      <section className="mt-8">
        <Suspense fallback={<p>Loading...</p>}>
          {video.map((data: VideoListData) => {
            return <VideoList {...data} key={data.title} />;
          })}
        </Suspense>
      </section>
      <Footer />
    </>
  );
}
