import { Suspense } from "react";
import MainLayout from "./layout";
import video from "@/data/video.json";
import { VideoListData } from "@/types/data";
import VideoList from "@/components/main/videoList";

export default function MainPage() {
  return (
    <MainLayout>
      <section>
        <Suspense fallback={<p>Loading...</p>}>
          {video.map((data: VideoListData) => {
            return (
              <VideoList title={data.title} list={data.list} key={data.title} />
            );
          })}
        </Suspense>
      </section>
    </MainLayout>
  );
}
