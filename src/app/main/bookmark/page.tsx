"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { translateLanguage } from "@/utils/translate";
import Link from "next/link";
import Image from "next/image";

function BookmarkVideoList() {
  const searchParams = useSearchParams();
  const currentLanguage = searchParams.get("currentLanguage");
  const title = translateLanguage(currentLanguage ?? "ko", "bookmark");
  const [videoList, setVideoList] = useState<string[]>([]);

  useEffect(() => {
    const localBookmarkVideoList = localStorage.getItem("infuse-bookmark");
    if (localBookmarkVideoList) {
      setVideoList(JSON.parse(localBookmarkVideoList));
    } else {
      setVideoList([]);
    }
  }, []);

  return (
    <section className="h-full min-h-screen mb-4">
      <h2 className="text-white bold-24 py-4">{title}</h2>
      <div className="flex justify-center -ml-4">
        <main className="flex flex-wrap px-4 gap-2 justify-center">
          sdfds
          {videoList.length === 0 ? (
            <div>북마크한 동영상이 없습니다.</div>
          ) : (
            <>
              {videoList.map((videoUrl: string) => {
                return (
                  // TODO : view-all과 함께 비디오 컴포넌트로 분리
                  <div
                    key={videoUrl}
                    className="relative cursor-pointer w-[156px] h-[117px] sm:w-[208px] sm:h-[156px] md:w-[312px] md:h-[234px] lg:w-[416px] lg:h-[312px]"
                  >
                    <Link href={videoUrl}>
                      <Image
                        layout="fill"
                        objectFit="cover"
                        src={`${videoUrl}/0.jpg`}
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
