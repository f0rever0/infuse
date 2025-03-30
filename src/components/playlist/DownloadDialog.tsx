import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import html2canvas from "html2canvas";
import { track } from "@amplitude/analytics-browser";

interface DownloadDialogProps {
  playlistNickname: string;
  setPlaylistNickname: (value: string) => void;
}

export function DownloadDialog({
  playlistNickname,
  setPlaylistNickname,
}: Readonly<DownloadDialogProps>) {
  const clickDownloadButton = () => {
    const target = document.getElementById("download-playlist");
    if (!target) {
      return alert("사진 저장에 실패했습니다.");
    }
    html2canvas(target, {
      useCORS: true,
    }).then((canvas) => {
      const link = document.createElement("a");
      document.body.appendChild(link);
      link.href = canvas.toDataURL("image/png");
      link.download = "ONF_Playlist.png";
      link.click();
      document.body.removeChild(link);
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="w-full mt-4 bg-[#121212] text-[#f5f3ee] hover:bg-[#121212] hover:text-[#f5f3ee] "
          onClick={() => {
            track("플레이리스트 이미지로 저장하기");
          }}
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
          <div className="grid grid-cols-4 items-center gap-4">
            <Input
              type="text"
              placeholder="닉네임을 입력해주세요."
              className="col-span-4"
              onChange={(e) => setPlaylistNickname(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button
              disabled={playlistNickname.length === 0}
              type="submit"
              onClick={clickDownloadButton}
            >
              확인
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
