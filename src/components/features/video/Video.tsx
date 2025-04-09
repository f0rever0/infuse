import Link from "next/link";
import Image from "next/image";
import { VideoData } from "@/types/data";
import { track } from "@amplitude/analytics-browser";
import icon_bookmark_line from "@/assets/icons/icon-bookmark-line.png";
import icon_bookmark_fill from "@/assets/icons/icon-bookmark-fill.png";
import { useBookmark } from "@/hooks/useBookmark";

interface VideoProps extends VideoData {
  listTitle: string;
}

export default function Video({
  sumnailUrl,
  videoTitle,
  videoUrl,
  listTitle,
}: Readonly<VideoProps>) {
  const { currentBookmarkList, toggleBookmark } = useBookmark(videoUrl);

  return (
    <div className="relative cursor-hover w-[250px] h-[187.5px] sm:w-[250px] sm:h-[187.5px] md:w-[341.33px] md:h-[256px] lg:w-[455.33px] lg:h-[341.5px] xl:w-[569.33px] xl:h-[427px] flex-shrink-0 overflow-visible">
      <Image
        unoptimized
        src={
          currentBookmarkList.includes(videoUrl)
            ? icon_bookmark_fill
            : icon_bookmark_line
        }
        alt="북마크"
        width={20}
        height={20}
        className="absolute top-[2px] right-[2px] z-10 cursor-pointer"
        onClick={toggleBookmark}
      />
      <Link
        href={videoUrl}
        onClick={() => {
          track(`video list title : ${listTitle}`);
        }}
      >
        <Image
          unoptimized
          fill
          objectFit="cover"
          src={sumnailUrl}
          alt={`${videoTitle} 썸네일`}
          title={videoTitle}
          className="relative z-0 transform transition-transform duration-300"
        />
      </Link>
      <div className="px-1 mb-[2px] sm:px-2 font-medium  text-xs sm:text-base text-white absolute z-1000 bottom-0 overflow-hidden text-ellipsis whitespace-nowrap w-full">
        {videoTitle}
      </div>
    </div>
  );
}
