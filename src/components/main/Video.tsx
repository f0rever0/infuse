import Link from "next/link";
import Image from "next/image";
import { VideoData } from "@/types/data";
import { track } from "@amplitude/analytics-browser";
import icon_bookmark_line from "@/assets/icons/icon-bookmark-line.png";
import icon_bookmark_fill from "@/assets/icons/icon-bookmark-fill.png";
import { useState } from "react";

interface VideoProps extends VideoData {
  listTitle: string;
}
export default function Video({
  sumnailUrl,
  videoTitle,
  videoUrl,
}: Readonly<VideoProps>) {
  const [currentBookmarkList, setCurrentBookmarkList] = useState<string[]>([]);

  const toggleBookmark = () => {
    let currentBookmark = JSON.parse(
      localStorage.getItem("infuse-bookmark") || "[]"
    );

    if (currentBookmark.includes(videoUrl)) {
      const index = currentBookmark.indexOf(videoUrl);
      currentBookmark.splice(index, 1);
    } else {
      currentBookmark.push(videoUrl);
    }
    setCurrentBookmarkList(currentBookmark);
    localStorage.setItem("infuse-bookmark", JSON.stringify(currentBookmark));
  };

  return (
    <div className="relative cursor-hover w-[250px] h-[187.5px] sm:w-[250px] sm:h-[187.5px] md:w-[341.33px] md:h-[256px] lg:w-[455.33px] lg:h-[341.5px] xl:w-[569.33px] xl:h-[427px] flex-shrink-0 overflow-visible">
      <Image
        src={
          currentBookmarkList.includes(videoUrl)
            ? icon_bookmark_fill
            : icon_bookmark_line
        }
        alt="북마크"
        width={20}
        height={20}
        className="absolute top-0 right-[2px] z-10 cursor-pointer"
        onClick={toggleBookmark}
      />
      <Link
        href={videoUrl}
        onClick={() => {
          // track(`video list title : ${listTitle}`);
        }}
      >
        <Image
          fill
          objectFit="cover"
          src={sumnailUrl}
          alt={`${videoTitle} 썸네일`}
          title={videoTitle}
          className="relative z-0 transform transition-transform duration-300 hover:scale-105"
        />
      </Link>
    </div>
  );
}
