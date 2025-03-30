interface DownloadImageProps {
  captureRef: React.RefObject<HTMLDivElement>;
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
  captureRef,
  playlistNickname,
  selectedKeyword,
  finalPlaylist,
}: Readonly<DownloadImageProps>) {
  return (
    <div
      ref={captureRef}
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

      <ul className="font-sans mt-2 px-4">
        {finalPlaylist.map((song) => (
          <li
            key={song.songMelonId}
            className="px-3 py-1 border-b border-[#e8e6e1]/40 last:border-none"
          >
            <span className="font-medium text-[#121212] text-sm flex items-center">
              ♪<span className="ml-1.5 font-sans">{song.songName}</span>
              {/* <span className="ml-2 text-gray-500 text-xs"> | {song.songAlbum} </span> */}
            </span>
          </li>
        ))}
      </ul>

      <div className="flex flex-row justify-end mt-8 px-4">
        <span className="text-[#121212] text-xs mr-1">온앤오프 팬페이지</span>
        <svg
          width="84"
          height="16"
          viewBox="0 0 84 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0.56 0.999999H7.08V15H0.56V0.999999ZM8.21625 0.999999H14.0963L19.9363 8V0.999999H21.1363V15H16.4363L9.43625 5.68V15H8.21625V0.999999ZM22.2592 0.999999H36.7792V2.18H29.2792V7.36H32.9592V8.56H29.2792V15H22.2592V0.999999ZM44.6433 15.1C42.2299 15.1 40.5033 14.7467 39.4633 14.04C38.4366 13.3333 37.9233 12.2533 37.9233 10.8V0.999999H45.5633V10.8C45.5633 11.7467 45.7699 12.44 46.1833 12.88C46.6099 13.3067 47.1699 13.52 47.8633 13.52C49.4099 13.52 50.1833 12.6133 50.1833 10.8V0.999999H51.3633V10.8C51.3633 11.9333 51.1233 12.8133 50.6433 13.44C50.1633 14.0533 49.4433 14.4867 48.4833 14.74C47.5233 14.98 46.2433 15.1 44.6433 15.1ZM63.0341 6.02C64.6207 6.44667 65.8074 7.01333 66.5941 7.72C67.3807 8.41333 67.7741 9.32 67.7741 10.44C67.7741 11.3333 67.4941 12.1333 66.9341 12.84C66.3741 13.5467 65.5474 14.1 64.4541 14.5C63.3741 14.9 62.0607 15.1 60.5141 15.1C58.6874 15.1 57.0741 14.8667 55.6741 14.4C54.2874 13.92 53.2007 13.34 52.4141 12.66L53.0741 11.76C53.7674 12.3067 54.6407 12.7733 55.6941 13.16C56.7474 13.5467 57.8807 13.74 59.0941 13.74C59.8807 13.74 60.4741 13.6267 60.8741 13.4C61.2874 13.1733 61.4941 12.8533 61.4941 12.44C61.4941 11.72 60.7807 11.16 59.3541 10.76L56.7541 10C55.3407 9.57333 54.2474 8.98 53.4741 8.22C52.7141 7.46 52.3341 6.56 52.3341 5.52C52.3341 4.65333 52.6074 3.86667 53.1541 3.16C53.7007 2.45333 54.4941 1.9 55.5341 1.5C56.5874 1.08667 57.8474 0.879999 59.3141 0.879999C60.7141 0.879999 62.0007 1.04 63.1741 1.36C64.3607 1.68 65.3274 2.06667 66.0741 2.52L65.4141 3.44C64.7874 3.08 64.0341 2.77333 63.1541 2.52C62.2874 2.26667 61.3741 2.14 60.4141 2.14C59.5741 2.14 58.9274 2.27333 58.4741 2.54C58.0341 2.79333 57.8141 3.14667 57.8141 3.6C57.8141 3.94667 57.9807 4.25333 58.3141 4.52C58.6474 4.77333 59.2807 5.02667 60.2141 5.28L63.0341 6.02ZM68.7827 0.999999H83.3227V2.18H75.8227V7.36H79.5027V8.56H75.8227V13.8H83.3227V15H68.7827V0.999999Z"
            fill="black"
          />
        </svg>
      </div>
    </div>
  );
}
