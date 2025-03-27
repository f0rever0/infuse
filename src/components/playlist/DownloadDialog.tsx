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

export function DownloadDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="w-full mt-4 bg-[#121212] text-[#f5f3ee] hover:bg-[#121212] hover:text-[#f5f3ee] "
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
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">확인</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
