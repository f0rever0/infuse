"use client";

import { useEffect, useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import Image from "next/image";
import icon_melon from "@/assets/icons/icon_melon.png";
import { track } from "@amplitude/analytics-browser";

const keywordList = [
  { id: "청량한", label: "청량한" },
  { id: "신나는", label: "신나는" },
  { id: "기분 좋은", label: "기분 좋은" },
  { id: "설레는", label: "설레는" },
  { id: "잔잔한", label: "잔잔한" },
  { id: "포근한", label: "포근한" },
  { id: "감성적인", label: "감성적인" },
  { id: "달달한", label: "달달한" },
  { id: "애절한", label: "애절한" },
  { id: "센치한", label: "센치한" },
  { id: "섹시한", label: "섹시한" },
  { id: "중독적인", label: "중독적인" },
  { id: "강렬한", label: "강렬한" },
  { id: "힙한", label: "힙한" },
];

// 멜론 원클릭 스밍리스트 url
const iosMelon = "meloniphone://play/?ctype=1&menuid=0&cid=";
const androidMelon = "melonapp://play?ctype=1&menuid=1000002721&cid=";

export default function Page() {
  const [selected, setSelected] = useState<string[]>([]);
  const [notionSongList, setNotionSongList] = useState<any[]>([]);
  const [playlist, setPlaylist] = useState<
    {
      songName: string;
      songAlbum: string;
      songMelonId: string;
      songKeyword: string[];
      songWeight: number;
    }[]
  >([]);
  // TODO:  react-query 로 fetch 상태 체크해서, fetch 이면 플리를 생성중입니다. 뜨도록

  const [finalPlaylist, setFinalPlaylist] = useState<
    {
      songName: string;
      songAlbum: string;
      songMelonId: string;
      songKeyword: string[];
      songWeight: number;
    }[]
  >([]);
  const handleCheckboxChange = (id: string, checked: boolean) => {
    setSelected((prev) =>
      checked ? [...prev, id] : prev.filter((item) => item !== id)
    );
  };

  const [melonId, setMelonId] = useState("");

  const weightSong = () => {
    // 1. object 안에 각 노래의 키워드 안에 selected 된 키워드가 몇개가 있는지 확인

    notionSongList.forEach((song) => {
      const songName = song.properties["이름"].title[0]?.plain_text;
      const songAlbum = song.properties["앨범"].select.name;
      const songMelonId = song.properties["멜론Id"].rich_text[0]?.plain_text;
      let songWeight = 0;
      let songKeyword: string[] = [];
      song.properties["키워드"].multi_select.forEach(
        (value: { color: string; id: string; name: string }) => {
          if (selected.includes(value.name)) {
            songWeight++;
          }
          songKeyword.push(value.name);
        }
      );

      playlist.push({
        songName,
        songAlbum,
        songMelonId,
        songKeyword,
        songWeight,
      });
    });

    console.log("📚 원본 playlist", playlist);

    // 2. 제일 높은 순대로 15-20 곡 정도 선별해서 (slice, sort)
    let sortedPlaylist = playlist.sort((a, b) => b.songWeight - a.songWeight);
    if (sortedPlaylist.length >= 20) {
      sortedPlaylist = sortedPlaylist.slice(0, 20);
    } else if (sortedPlaylist.length >= 15) {
      sortedPlaylist = sortedPlaylist.slice(0, 15);
    }

    // 3. 선별한 곡 랜덤 돌리기
    const shuffledSongs = [...sortedPlaylist].sort(() => Math.random() - 0.5);

    console.log("🚘 최종 선별되어 랜덤된 리스트", shuffledSongs);
    setFinalPlaylist(shuffledSongs);
    // 4. object에서 노래 제목이 key 이니까, key 정보 안에 있는 melon id 로 리스트

    const melonIdList: string[] = [];
    shuffledSongs.forEach((list) => {
      melonIdList.push(list.songMelonId);
    });

    setMelonId(melonIdList.join(","));
  };

  useEffect(() => {
    weightSong();
  }, [notionSongList]);

  const onSubmit = async () => {
    // playlist 초기화
    setNotionSongList([]);
    setPlaylist([]);
    setFinalPlaylist([]);

    // notion api 호출
    await fetch("/api/notion", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        selectedKeywordList: selected,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("notion data", data);
        setNotionSongList(data);
      })
      .catch((error) => console.error(error));
  };
  return (
    <div className="font-sans py-[64px] bg-[#f5f3ee] text-[#121212] ">
      <div className="p-4 w-full mx-auto sm:w-[640px] min-h-[calc(100vh-64px)] h-auto">
        {/* <p className="text-md font-normal text-center">
          해당 기능은 한국어만 지원됩니다.
        </p> */}
        <h2 className="text-xl font-semibold text-center mt-4">
          원하는 키워드를 선택해 <br /> 온앤오프 플레이리스트를 만들어보세요!
        </h2>

        <div className="flex flex-wrap flex-row mt-4">
          {keywordList.map((option) => (
            <div key={option.id} className="flex items-center space-x-2 mr-4">
              <Checkbox
                id={option.id}
                onCheckedChange={(checked) =>
                  handleCheckboxChange(option.id, checked as boolean)
                }
              />
              <label htmlFor={option.id} className="text-md font-medium">
                {option.label}
              </label>
            </div>
          ))}
        </div>

        <button
          className="px-4 py-2 bg-[#bc2a31] text-[#f5f3ee] mt-4 rounded-md"
          onClick={onSubmit}
          disabled={selected.length === 0}
        >
          플레이리스트 생성하기
        </button>

        <div className="text-lg font-semibold mt-8">퓨즈의 플레이리스트</div>
        <ul className="mt-4 p-2 border rounded-md bg-[#e8e6e1]/40">
          {finalPlaylist.length > 0 ? (
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
            <p className="text-[#757575]">리스트가 없습니다.</p>
          )}
        </ul>
        {finalPlaylist.length > 0 && (
          <div className="flex flex-row items-center mt-4">
            <a href={`${iosMelon}${melonId}`}>
              <button
                className="rounded-md flex flex-row items-center px-[12px] py-2 bg-[#bc2a31] text-[#f5f3ee] mr-4"
                onClick={() => {
                  console.log(`${iosMelon}${melonId}`);
                  track("멜론 아이폰으로 듣기");
                }}
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
                className="rounded-md flex flex-row items-center px-[12px] py-2 bg-[#bc2a31] text-[#f5f3ee] "
                onClick={() => {
                  console.log(`${androidMelon}${melonId}`);
                  track("멜론 안드로이드로 듣기");
                }}
              >
                <Image
                  className="mr-1 rounded-lg"
                  src={icon_melon}
                  alt=""
                  width={18}
                  height={18}
                />{" "}
                안드로이드로 듣기
              </button>
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
