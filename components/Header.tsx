import Image from "next/image";

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 h-24 flex justify-center items-center bg-brand-black z-10">
      <div className="relative w-72 h-16">
        <Image
          src="/images/logo_wordmark.png"
          alt="Peaches Logo"
          fill
          style={{ objectFit: "contain" }}
          priority
        />
      </div>
    </header>
  );
}
