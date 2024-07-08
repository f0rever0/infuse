"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { TranslationDataType, VideoData } from "@/types/data";
import video from "@/data/video.json";
import { translateLanguage } from "@/utils/translate";
import Link from "next/link";
import Image from "next/image";

function VideoList() {
  // 어떤 비디오의 전체보기 페이지인지 앰플리튜드 심기

  const searchParams = useSearchParams();
  const currentLanguage = searchParams.get("currentLanguage");
  const search = searchParams.get("listTitle");
  const listTitle = translateLanguage(
    currentLanguage || "ko",
    search as keyof TranslationDataType
  );

  const videoList = video.find((item) => item.title === "mv");

  return (
    <section className="h-full mb-4">
      <h2 className="text-white bold-24 py-4">{listTitle}</h2>
      <div className="flex justify-center -ml-4">
        <main className="grid grid-cols-2 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {videoList?.list.map((data: VideoData) => {
            return (
              <div
                key={data.videoUrl}
                className="border-slate-100 border-2 cursor-pointer w-[160px] h-[90px] sm:w-[240px] sm:h-[135px] md:w-[320px] md:h-[180px] lg:w-[360px] lg:h-[202.5px]"
              >
                <Link href={data.videoUrl}>
                  {/* <Image
              fill
              src={data.sumnailUrl}
              alt={`${data.videoTitle} 썸네일`}
              title={data.videoTitle}
            /> */}
                </Link>
              </div>
            );
          })}
        </main>
      </div>
    </section>
  );
}

export default function ViewAllPage() {
  return (
    <Suspense fallback={<p>Loading video...</p>}>
      <VideoList />
    </Suspense>
  );
}
