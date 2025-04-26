"use client";

import { useEffect, useRef, useState } from "react";
import { Checkbox } from "@/components/common/ui/checkbox";
import Image from "next/image";
import icon_melon from "@/assets/icons/icon_melon.png";
import icon_bugs from "@/assets/icons/icon_bugs.png";
import { track } from "@amplitude/analytics-browser";
import { DownloadDialog } from "@/components/features/playlist/DownloadDialog";
import { DownloadImage } from "@/components/features/playlist/DownloadImage";
import { Button } from "@/components/common/ui/button";

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
const bugs = "bugs3://app/tracks/lists?title=전체듣기&miniplay=Y&track_ids=";

export default function Page() {
  const [selected, setSelected] = useState<string[]>([]);
  const [notionSongList, setNotionSongList] = useState<any[]>([]);
  const [playlistLoading, setPlaylistLoading] = useState(false);
  const [finalPlaylist, setFinalPlaylist] = useState<
    {
      songName: string;
      songAlbum: string;
      songMelonId: string;
      songKeyword: string;
      songWeight: number;
    }[]
  >([]);
  const [melonId, setMelonId] = useState<string>("");
  const [bugsId, setBugsId] = useState<string>("");
  const [playlistNickname, setPlaylistNickname] = useState<string>("");
  const captureRef = useRef<HTMLDivElement>(null);

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
      songBugsId: song.properties["벅스Id"].rich_text[0]?.plain_text,
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

    // 5. 벅스Id로 플레이스르트 생성
    setBugsId(shuffledSongs.map((song) => song.songBugsId).join("|"));
    setPlaylistLoading(false);
  }, [notionSongList]);

  return (
    <div className="relative font-sans py-16 bg-[#f5f3ee] text-[#121212] ">
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
        <Button
          variant="red"
          className="mt-4 disabled:bg-[#d78c90] w-full"
          onClick={onSubmit}
          disabled={!selected.length || playlistLoading}
        >
          플레이리스트 생성하기
        </Button>

        <div className="text-lg font-semibold mt-8">퓨즈의 플레이리스트</div>
        <ul className="mt-4 p-2 border rounded-md bg-[#e8e6e1]/40">
          {finalPlaylist.length ? (
            <>
              {finalPlaylist.map((song) => (
                <li
                  key={song.songMelonId}
                  className="p-2 border-b border-[#d9d6cf]"
                >
                  <span className="font-semibold text-[#121212]">
                    🎵 {song.songName}
                    <span className="ml-2 text-[#757575] text-sm">
                      | {song.songAlbum}
                    </span>
                  </span>
                </li>
              ))}
              <DownloadDialog
                captureRef={captureRef}
                playlistNickname={playlistNickname}
                setPlaylistNickname={setPlaylistNickname}
              />
            </>
          ) : (
            <p className="text-[#757575]">
              {playlistLoading
                ? "리스트를 생성중입니다."
                : "리스트가 없습니다."}
            </p>
          )}
        </ul>
        {finalPlaylist.length > 0 && (
          <div>
            <div className="flex flex-row items-center mt-4">
              <Button asChild variant="red" className="mr-2">
                <a href={`${iosMelon}${melonId}`}>
                  <Image
                    unoptimized
                    className="mr-2 rounded-lg"
                    src={icon_melon}
                    alt=""
                    width={18}
                    height={18}
                  />
                  아이폰으로 듣기
                </a>
              </Button>
              <Button asChild variant="red">
                <a
                  href={`${androidMelon}${melonId}`}
                  onClick={() => track("멜론 안드로이드로 듣기")}
                >
                  <Image
                    unoptimized
                    className="mr-2 rounded-lg"
                    src={icon_melon}
                    alt=""
                    width={18}
                    height={18}
                  />
                  안드로이드로 듣기
                </a>
              </Button>
            </div>

            <div className="flex flex-row items-center mt-4">
              <Button asChild variant="red" className="mr-2">
                <a
                  href={`${bugs}${bugsId}`}
                  onClick={() => track("벅스 아이폰으로 듣기")}
                >
                  <Image
                    unoptimized
                    className="mr-2 rounded-lg"
                    src={icon_bugs}
                    alt=""
                    width={18}
                    height={18}
                  />
                  아이폰으로 듣기
                </a>
              </Button>
              <Button asChild variant="red">
                <a
                  href={`${bugs}${bugsId}`}
                  onClick={() => track("벅스 안드로이드로 듣기")}
                >
                  <Image
                    unoptimized
                    className="mr-2 rounded-lg"
                    src={icon_bugs}
                    alt=""
                    width={18}
                    height={18}
                  />
                  안드로이드로 듣기
                </a>
              </Button>
            </div>
          </div>
        )}
      </div>

      <div className="opacity-0 fixed">
        <DownloadImage
          captureRef={captureRef}
          selectedKeyword={selected}
          finalPlaylist={finalPlaylist}
          playlistNickname={playlistNickname}
        />
      </div>
    </div>
  );
}
