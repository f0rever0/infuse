import { useState, useEffect } from "react";

export function useBookmark(videoUrl: string) {
  const [currentBookmarkList, setCurrentBookmarkList] = useState<string[]>([]);

  const toggleBookmark = () => {
    let currentBookmark = JSON.parse(
      localStorage.getItem("infuse-bookmark") || "[]"
    );

    if (currentBookmark.includes(videoUrl)) {
      const index = currentBookmark.indexOf(videoUrl);
      currentBookmark.splice(index, 1);
    } else {
      currentBookmark.push(videoUrl);
    }
    setCurrentBookmarkList(currentBookmark);
    localStorage.setItem("infuse-bookmark", JSON.stringify(currentBookmark));
  };

  useEffect(() => {
    const localStorgeBookmarkVideo = JSON.parse(
      localStorage.getItem("infuse-bookmark") || "[]"
    );
    setCurrentBookmarkList(localStorgeBookmarkVideo);
  }, []);

  return {
    currentBookmarkList,
    toggleBookmark,
  };
}
