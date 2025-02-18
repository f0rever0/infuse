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
  id: string;
}
export default function VideoList({
  currentLanguage,
  title,
  list,
  id,
}: Readonly<VideoListProps>) {
  const listTitle = translateLanguage(
    currentLanguage,
    title as keyof TranslationDataType
  );

  return (
    <section className="h-full mt-6 " id={id}>
      <article className="flex flex-row items-end">
        <h2 className="text-[#121212] bold-24">{listTitle}</h2>
        <Link
          href={{
            pathname: "/main/viewAll",
            query: {
              currentLanguage,
              listTitle: title,
            },
          }}
          className="text=[#757575]bold-16 ml-4 mb-1"
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
