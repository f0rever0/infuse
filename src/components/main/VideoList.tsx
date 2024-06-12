import { TranslationDataType, VideoData } from "@/types/data";
import Video from "./Video";
import DraggableScroller from "../DraggableScroller";
import { translateLanguage } from "@/utils/translate";

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
  let listTitle = translateLanguage(
    currentLanguage,
    title as keyof TranslationDataType
  );

  return (
    <section className="h-full mb-4 ">
      <h2 className="text-white bold-24">{listTitle}</h2>
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
