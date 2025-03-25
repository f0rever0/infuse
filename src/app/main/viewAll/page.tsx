"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { TranslationDataType, VideoData } from "@/types/data";
import video from "@/data/video.json";
import { translateLanguage } from "@/utils/translate";
import Link from "next/link";
import Image from "next/image";

function VideoList() {
  // 어떤 비디오의 전체보기 페이지인지 앰플리튜드 심기

  const searchParams = useSearchParams();
  const [currentLanguage, setCurrentLanguage] = useState<string>("ko");
  const search = searchParams.get("listTitle");
  const listTitle = translateLanguage(
    currentLanguage ?? "ko",
    search as keyof TranslationDataType
  );

  const videoList = video.find((item) => item.title === search);

  useEffect(() => {
    const localStorageLang = localStorage.getItem("infuse-language");
    if (localStorageLang) {
      setCurrentLanguage(localStorageLang);
    } else {
      localStorage.setItem("infuse-language", currentLanguage);
    }
  });

  return (
    <section className="h-full min-h-screen mb-4 bg-[#f5f3ee] px-3 md:px-8 py-[64px]">
      <h2 className="text-[#121212] bold-24 py-4">{listTitle}</h2>
      <div className="flex justify-center -ml-4 m-auto">
        <main className="flex flex-wrap gap-2 justify-center">
          {videoList?.list.map((data: VideoData) => {
            return (
              <div
                key={data.videoUrl}
                className="relative cursor-pointer w-[312px] h-[234px] md:w-[312px] md:h-[234px] lg:w-[416px] lg:h-[312px]"
              >
                <Link href={data.videoUrl}>
                  <Image
                    unoptimized
                    layout="fill"
                    objectFit="cover"
                    src={data.sumnailUrl}
                    alt={`${data.videoTitle} 썸네일`}
                    title={data.videoTitle}
                  />
                </Link>
                <div className="px-1 text-white absolute z-1000 bottom-0 overflow-hidden text-ellipsis whitespace-nowrap w-full">
                  {data.videoTitle}
                </div>
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
