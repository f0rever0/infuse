"use client";

import { useEffect, useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import Image from "next/image";
import icon_melon from "@/assets/icons/icon_melon.png";
import { track } from "@amplitude/analytics-browser";

const keywordList = [
  "청량한",
  "신나는",
  "기분 좋은",
  "설레는",
  "잔잔한",
  "포근한",
  "감성적인",
  "달달한",
  "애절한",
  "센치한",
  "섹시한",
  "중독적인",
  "강렬한",
  "힙한",
];

// 멜론 원클릭 스밍리스트 url
const iosMelon = "meloniphone://play/?ctype=1&menuid=0&cid=";
const androidMelon = "melonapp://play?ctype=1&menuid=1000002721&cid=";

export default function Page() {
  const [selected, setSelected] = useState<string[]>([]);
  const [notionSongList, setNotionSongList] = useState<any[]>([]);
  const [playlistLoading, setPlaylistLoading] = useState(false);
  const [finalPlaylist, setFinalPlaylist] = useState<any[]>([]);
  const [melonId, setMelonId] = useState("");

  const handleCheckboxChange = (id: string, checked: boolean) => {
    setSelected((prev) =>
      checked ? [...prev, id] : prev.filter((item) => item !== id)
    );
  };

  const onSubmit = async () => {
    setPlaylistLoading(true);
    setNotionSongList([]);
    setFinalPlaylist([]);

    try {
      const res = await fetch("/api/notion", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ selectedKeywordList: selected }),
      });
      const data = await res.json();
      setNotionSongList(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    if (!notionSongList.length) return;

    // 1. object 안에 각 노래의 키워드 안에 selected 된 키워드가 몇개가 있는지 확인
    const processedPlaylist = notionSongList.map((song) => ({
      songName: song.properties["이름"].title[0]?.plain_text,
      songAlbum: song.properties["앨범"].select.name,
      songMelonId: song.properties["멜론Id"].rich_text[0]?.plain_text,
      songKeyword: song.properties["키워드"].multi_select.map(
        (k: { color: string; id: string; name: string }) => k.name
      ),
      songWeight: song.properties["키워드"].multi_select.filter(
        (k: { color: string; id: string; name: string }) =>
          selected.includes(k.name)
      ).length,
    }));

    // 2. 제일 높은 순대로 15-20 곡 정도 선별 (slice, sort)
    const sortedPlaylist = processedPlaylist
      .sort((a, b) => b.songWeight - a.songWeight)
      .slice(0, processedPlaylist.length >= 20 ? 20 : 15);

    // 3. 선별한 곡 랜덤 돌리기
    const shuffledSongs = sortedPlaylist.sort(() => Math.random() - 0.5);
    setFinalPlaylist(shuffledSongs);

    // 4. 멜론Id로 플레이리스트 생성
    setMelonId(shuffledSongs.map((song) => song.songMelonId).join(","));
    setPlaylistLoading(false);
  }, [notionSongList]);

  return (
    <div className="font-sans py-16 bg-[#f5f3ee] text-[#121212] ">
      <div className="p-4 w-full mx-auto sm:w-[640px] min-h-[calc(100vh-64px)]">
        <h2 className="text-xl font-semibold text-center mt-4">
          원하는 키워드를 선택해 <br /> 온앤오프 플레이리스트를 만들어보세요!
        </h2>

        <div className="flex flex-wrap mt-4">
          {keywordList.map((keyword) => (
            <div key={keyword} className="flex items-center space-x-2 mr-4">
              <Checkbox
                id={keyword}
                onCheckedChange={(checked) =>
                  handleCheckboxChange(keyword, checked as boolean)
                }
                disabled={playlistLoading}
              />
              <label htmlFor={keyword} className="text-md font-medium">
                {keyword}
              </label>
            </div>
          ))}
        </div>

        <button
          className="px-4 py-2 bg-[#bc2a31] text-[#f5f3ee] mt-4 rounded-md disabled:bg-[#d78c90]"
          onClick={onSubmit}
          disabled={!selected.length || playlistLoading}
        >
          플레이리스트 생성하기
        </button>

        <div className="text-lg font-semibold mt-8">퓨즈의 플레이리스트</div>
        <ul className="mt-4 p-2 border rounded-md bg-[#e8e6e1]/40">
          {finalPlaylist.length ? (
            finalPlaylist.map((song, index) => (
              <li key={index} className="p-2 border-b border-[#d9d6cf]">
                <span className="font-semibold text-[#121212]">
                  🎵 {song.songName}
                  <span className="ml-2 text-[#757575] text-sm">
                    | {song.songAlbum}
                  </span>
                </span>
              </li>
            ))
          ) : (
            <p className="text-[#757575]">
              {playlistLoading
                ? "리스트를 생성중입니다."
                : "리스트가 없습니다."}
            </p>
          )}
        </ul>

        {finalPlaylist.length > 0 && (
          <div className="flex flex-row items-center mt-4">
            <a href={`${iosMelon}${melonId}`}>
              <button
                className="rounded-md flex items-center px-4 py-2 bg-[#bc2a31] text-[#f5f3ee] mr-4"
                onClick={() => track("멜론 아이폰으로 듣기")}
              >
                <Image
                  className="mr-1 rounded-lg"
                  src={icon_melon}
                  alt=""
                  width={18}
                  height={18}
                />
                아이폰으로 듣기
              </button>
            </a>
            <a href={`${androidMelon}${melonId}`}>
              <button
                className="rounded-md flex items-center px-4 py-2 bg-[#bc2a31] text-[#f5f3ee]"
                onClick={() => track("멜론 안드로이드로 듣기")}
              >
                <Image
                  className="mr-1 rounded-lg"
                  src={icon_melon}
                  alt=""
                  width={18}
                  height={18}
                />
                안드로이드로 듣기
              </button>
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
