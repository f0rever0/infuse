"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { translateLanguage } from "@/utils/translate";
import Link from "next/link";
import Image from "next/image";

function BookmarkVideoList() {
  const searchParams = useSearchParams();
  const [currentLanguage, setCurrentLanguage] = useState<string>("ko");

  const title = translateLanguage(currentLanguage ?? "ko", "bookmark");
  const [videoList, setVideoList] = useState<string[]>([]);

  useEffect(() => {
    const localStorageLang = localStorage.getItem("infuse-language");
    if (localStorageLang) {
      setCurrentLanguage(localStorageLang);
    } else {
      localStorage.setItem("infuse-language", currentLanguage);
    }

    const localBookmarkVideoList = JSON.parse(
      localStorage.getItem("infuse-bookmark") || "[]"
    );
    setVideoList(localBookmarkVideoList);
  }, []);

  return (
    <section className="h-full min-h-screen mb-4 bg-[#f5f3ee] px-3 md:px-8 py-[64px]">
      <h2 className=" text-[#121212] bold-24 py-4">{title}</h2>
      <div className="flex justify-center -ml-4 m-auto">
        <main className="flex flex-wrap gap-2 justify-center">
          {videoList.length === 0 ? (
            <div className="text-[#121212] bold-18 py-4">
              {translateLanguage(currentLanguage ?? "ko", "isEmpty")}
            </div>
          ) : (
            <>
              {videoList.map((videoUrl: string) => {
                const urlParams = new URLSearchParams(new URL(videoUrl).search);
                const videoCode = urlParams.get("v");

                return (
                  // TODO : view-all과 함께 비디오 컴포넌트로 분리
                  <div
                    key={videoUrl}
                    className="relative cursor-pointer w-[156px] h-[117px] sm:w-[208px] sm:h-[156px] md:w-[312px] md:h-[234px] lg:w-[416px] lg:h-[312px]"
                  >
                    <Link href={videoUrl}>
                      <Image
                        layout="fill"
                        src={`https://img.youtube.com/vi/${videoCode}/0.jpg`}
                        alt={`${videoUrl} 썸네일`}
                      />
                    </Link>
                  </div>
                );
              })}
            </>
          )}
        </main>
      </div>
    </section>
  );
}

export default function BookmarkPage() {
  return (
    <Suspense fallback={<p>Loading video...</p>}>
      <BookmarkVideoList />
    </Suspense>
  );
}
