import { translateLanguage } from "@/utils/translate";

interface BannerProps {
  currentLanguage: string;
}
export default function Banner({ currentLanguage }: Readonly<BannerProps>) {
  return (
    <div className="">
      <div className="mt-4relative pb-[56.25%] h-0 overflow-hidden">
        <iframe
          className="absolute top-0 left-0 w-full h-full"
          src="https://www.youtube.com/embed/xEeROqUidGg?autoplay=1&mute=1&controls=0&loop=1&playlist=xEeROqUidGg"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
        <div className="absolute bottom-0 left-0 p-4 text-white">
          <h1 className="text-lg bold-24 lg:bold-36">The Stranger</h1>
          <p className="hidden break-keep sm:regular-14 lg:regular-18 sm:block sm:w-[80%] lg:w-[50%]">
            {translateLanguage(currentLanguage, "the-stranger-description")}
          </p>
        </div>
      </div>
    </div>
  );
}
