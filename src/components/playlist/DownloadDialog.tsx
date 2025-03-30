import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { track } from "@amplitude/analytics-browser";
import { toPng } from "html-to-image";

interface DownloadDialogProps {
  captureRef: React.RefObject<HTMLDivElement>;
  playlistNickname: string;
  setPlaylistNickname: (value: string) => void;
}

export function DownloadDialog({
  captureRef,
  playlistNickname,
  setPlaylistNickname,
}: Readonly<DownloadDialogProps>) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const clickDownloadButton = () => {
    if (captureRef.current === null) {
      return;
    }

    toPng(captureRef.current, { cacheBust: true })
      .then((dataUrl) => {
        const link = document.createElement("a");
        link.download = "ONF_playlist.png";
        link.href = dataUrl;
        link.click();
      })
      .catch((err) => {
        console.log(err);
      });

    setPlaylistNickname("");
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="w-full mt-4 bg-[#121212] text-[#f5f3ee] hover:bg-[#121212] hover:text-[#f5f3ee]"
          onClick={() => track("플레이리스트 이미지로 저장하기")}
        >
          이미지로 저장하기
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>이미지로 저장하기</DialogTitle>
          <DialogDescription>
            플레이리스트에 들어갈 닉네임을 입력해주세요.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Input
            type="text"
            placeholder="닉네임을 입력해주세요."
            className="col-span-4"
            value={playlistNickname}
            onChange={(e) => setPlaylistNickname(e.target.value)}
          />
        </div>
        <DialogFooter>
          <Button
            disabled={playlistNickname.length === 0}
            onClick={clickDownloadButton}
          >
            저장
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
