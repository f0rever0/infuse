"use client";

import { Suspense, useEffect } from "react";
import MainLayout from "./layout";
import video from "@/data/video.json";
import { VideoListData } from "@/types/data";
import VideoList from "@/components/main/videoList";
import { track } from "@amplitude/analytics-browser";
import Banner from "@/components/main/banner";
import Footer from "@/components/main/footer";

export default function MainPage() {
  // useEffect(() => {
  //   track("main");
  // });

  return (
    <MainLayout>
      <Banner />
      <section className="mt-8">
        <Suspense fallback={<p>Loading...</p>}>
          {video.map((data: VideoListData) => {
            return <VideoList {...data} key={data.title} />;
          })}
        </Suspense>
      </section>
      <Footer />
    </MainLayout>
  );
}
