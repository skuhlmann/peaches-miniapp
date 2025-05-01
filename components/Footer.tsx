import Link from "next/link";

export default function Footer() {
  return (
    <footer className="fixed bottom-0 left-0 right-0 bg-brand-darkOrange py-4">
      <nav className="container mx-auto px-4">
        <ul className="flex justify-center space-x-8">
          <li>
            <Link
              href="/about"
              className="text-brand-white hover:text-brand-orange"
            >
              About
            </Link>
          </li>
          <li>
            <Link
              href="/buy-trees"
              className="text-brand-white hover:text-brand-orange"
            >
              Buy Trees
            </Link>
          </li>
        </ul>
      </nav>
    </footer>
  );
}
