import Link from "next/link";
import { useEffect } from "react";
import { track } from "@amplitude/analytics-browser";

export default function NotFound() {
  useEffect(() => {
    track("not-found");
  });

  return (
    <div>
      <h2>Page Not Found</h2>
      <p>his page could not be found.</p>
      <Link href="/" className="text-dark-gray">
        Return Home
      </Link>
    </div>
  );
}
