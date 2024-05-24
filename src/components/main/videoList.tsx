import { VideoListData, VideoData } from "@/types/data";
import Video from "./video";

export default function videoList({ title, list }: VideoListData) {
  return (
    <section className="w-screen h-full mb-4">
      <h2 className="text-white bold-18">{title}</h2>
      <article className="flex flex-row gap-1">
        {list.map((data: VideoData) => {
          return <Video key={data.videoTitle} {...data} />;
        })}
      </article>
    </section>
  );
}
