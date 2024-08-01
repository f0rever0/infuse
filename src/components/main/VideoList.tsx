import Link from "next/link";
import { TranslationDataType, VideoData } from "@/types/data";
import Video from "./Video";
import DraggableScroller from "@/components/DraggableScroller";
import { translateLanguage } from "@/utils/translate";
import { track } from "@amplitude/analytics-browser";

interface VideoListProps {
  title: string;
  list: VideoData[];
  currentLanguage: string;
}
export default function VideoList({
  currentLanguage,
  title,
  list,
}: Readonly<VideoListProps>) {
  const listTitle = translateLanguage(
    currentLanguage,
    title as keyof TranslationDataType
  );

  return (
    <section className="h-full mb-4 ">
      <article className="flex flex-row items-end">
        <h2 className="text-white bold-24">{listTitle}</h2>
        <Link
          href={{
            pathname: "/main/viewAll",
            query: {
              currentLanguage,
              listTitle: title,
            },
          }}
          className="text-gray-400 bold-16 ml-2 mb-1"
          onClick={() => {
            track(`view all : ${listTitle}`);
          }}
        >
          {translateLanguage(currentLanguage, "view-all")}
        </Link>
      </article>

      <DraggableScroller>
        {list.map((data: VideoData) => {
          return (
            <Video key={data.videoTitle} {...data} listTitle={listTitle} />
          );
        })}
      </DraggableScroller>
    </section>
  );
}
