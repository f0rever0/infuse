import { useRef } from "react";
import { useDraggable } from "@/utils/useDraggable";

export default function DraggableScroller({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const containerRef = useRef<HTMLElement>(null);
  const events = useDraggable(containerRef);

  return (
    <>
      <section
        className="flex flex-row gap-2 overflow-x-scroll"
        ref={containerRef}
        {...events}
      >
        {children}
      </section>
    </>
  );
}
