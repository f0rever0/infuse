import { VideoListData, VideoData } from "@/types/data";
import Video from "./Video";
import DraggableScroller from "../DraggableScroller";

export default function VideoList({ title, list }: VideoListData) {
  return (
    <section className="h-full mb-4 ">
      <h2 className="text-white bold-24">{title}</h2>
      <DraggableScroller>
        {list.map((data: VideoData) => {
          return <Video key={data.videoTitle} {...data} listTitle={title} />;
        })}
      </DraggableScroller>
    </section>
  );
}
