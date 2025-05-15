import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 h-20 flex justify-center items-center bg-brand-black z-10 border-b border-dotted border-brand-green">
      <Link href="/" className="relative w-72 h-16">
        <Image
          src="/images/logo_wordmark.png"
          alt="Peaches Logo"
          fill
          style={{ objectFit: "contain" }}
          priority
        />
      </Link>
    </header>
  );
}
