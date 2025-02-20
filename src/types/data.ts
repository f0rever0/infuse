export type TranslationDataType = {
  nickname: string;
  "by-my-monster-description": string;
  "the-stranger-description": string;
  "the stranger": string;
  mv: string;
  record: string;
  practice: string;
  stage: string;
  radio: string;
  "official-entertain": string;
  "youtube-entertain": string;
  vlog: string;
  "on-flim": string;
  "road-to-kingdom": string;
  monotree: string;
  "view-all": string;
  bookmark: string;
  isEmpty: string;
};

export interface VideoData {
  sumnailUrl: string;
  videoTitle: string;
  videoUrl: string;
}

export interface VideoListData {
  title: Omit<TranslationDataType, "nickname" | "by-my-monster-description">;
  list: VideoData[];
}
