import { VideoListData, VideoData } from "@/types/data";
import Video from "./video";

export default function videoList({ title, list }: VideoListData) {
  return (
    <section className="h-full mb-4 ">
      <h2 className="text-white bold-24">{title}</h2>
      <article className=" flex flex-row gap-1 overflow-x-scroll">
        {list.map((data: VideoData) => {
          return <Video key={data.videoTitle} {...data} />;
        })}
      </article>
    </section>
  );
}
