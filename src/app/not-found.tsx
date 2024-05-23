import Link from "next/link";

export default function NotFound() {
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
