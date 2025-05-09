"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import VideoList from "@/components/features/video/VideoList";
import video from "@/data/video.json";

function MainPageContent() {
  const searchParams = useSearchParams();
  const [currentLanguage, setCurrentLanguage] = useState<string>("ko");
  const listTitle = searchParams.get("listTitle");

  useEffect(() => {
    const localStorageLang = localStorage.getItem("infuse-language");
    if (localStorageLang) {
      setCurrentLanguage(localStorageLang);
    } else {
      localStorage.setItem("infuse-language", currentLanguage);
    }

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
    <section className="py-[64px] bg-[#f5f3ee] text-[#121212] px-3 md:px-8">
      {video.map((data) => (
        <VideoList
          currentLanguage={currentLanguage}
          title={data.title}
          list={data.list}
          key={data.title}
          id={data.title}
        />
      ))}
    </section>
  );
}

export default function MainPage() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <MainPageContent />
    </Suspense>
  );
}
