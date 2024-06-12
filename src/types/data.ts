import { enData } from "@/app/locales/en";

export type VideoListTitleKeys = keyof (typeof enData)["videoListTitle"];
export interface VideoData {
  sumnailUrl: string;
  videoTitle: string;
  videoUrl: string;
}

export interface VideoListData {
  title: VideoListTitleKeys;
  list: VideoData[];
}
