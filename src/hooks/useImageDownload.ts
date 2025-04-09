import { toPng } from "html-to-image";

export function useImageDownload() {
  const downloadImage = async (captureRef: React.RefObject<HTMLDivElement>) => {
    if (captureRef.current === null) {
      return;
    }

    try {
      const dataUrl = await toPng(captureRef.current, { cacheBust: true });
      const link = document.createElement("a");
      link.download = "ONF_playlist.png";
      link.href = dataUrl;
      link.click();
      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  };

  return { downloadImage };
}
