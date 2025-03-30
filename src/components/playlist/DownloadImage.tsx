import Image from "next/image";
import icon_infuse from "@/assets/icons/icon_infuse.svg";
interface DownloadImageProps {
  playlistNickname: string;
  selectedKeyword: string[];
  finalPlaylist: {
    songName: string;
    songAlbum: string;
    songMelonId: string;
    songKeyword: string;
    songWeight: number;
  }[];
}

export function DownloadImage({
  playlistNickname,
  selectedKeyword,
  finalPlaylist,
}: Readonly<DownloadImageProps>) {
  return (
    <div
      id="download-playlist"
      className="font-sans bg-[#f5f3ee] py-4 w-[375px]"
    >
      <div className="text-lg px-3 py-2.5 font-bold bg-[#121212] text-[#f5f3ee]">
        {playlistNickname}님의 플레이리스트
      </div>

      <ul className="flex flex-wrap py-4 px-4 gap-1.5">
        {selectedKeyword.map((keyword) => (
          <li
            key={keyword}
            className="text-[#a32228] bg-[#a32228]/10 px-3 py-1.5 rounded-full text-xs font-medium"
          >
            # {keyword}
          </li>
        ))}
      </ul>

      <ul className="mt-2 px-4">
        {finalPlaylist.map((song) => (
          <li
            key={song.songMelonId}
            className="px-3 py-1 border-b border-[#e8e6e1]/40 last:border-none"
          >
            <span className="font-medium text-[#121212] text-sm flex items-center">
              ♪<span className="ml-1.5">{song.songName}</span>
              {/* <span className="ml-2 text-gray-500 text-xs"> | {song.songAlbum} </span> */}
            </span>
          </li>
        ))}
      </ul>

      <div className="flex flex-row justify-end mt-8 px-4">
        <span className="text-[#121212] text-xs">온앤오프 팬페이지</span>
        <Image
          unoptimized
          className="ml-1 h-[18px] w-[90px]"
          src={icon_infuse}
          alt="서비스 로고"
          width={90}
          height={18}
        />
      </div>
    </div>
  );
}
