"use client";

import Link from "next/link";
import { useSignIn } from "@/hooks/use-sign-in";

export default function Footer() {
  const { signIn, isLoading, isSignedIn } = useSignIn({
    autoSignIn: false,
  });

  return (
    <footer className="fixed bottom-0 left-0 right-0 bg-brand-orange py-4">
      <nav className="container mx-auto px-4">
        <ul className="flex justify-center space-x-8">
          {!isSignedIn && (
            <li>
              <button
                onClick={signIn}
                disabled={isLoading}
                className="text-brand-white hover:text-brand-orange disabled:opacity-50"
              >
                {isLoading ? "Signing in..." : "Sign in"}
              </button>
            </li>
          )}
          <li>
            <Link
              href="/buy-trees"
              className="text-brand-white hover:text-brand-orange"
            >
              Buy Trees
            </Link>
          </li>
          <li>
            <Link
              href="/about"
              className="text-brand-white hover:text-brand-orange"
            >
              How?
            </Link>
          </li>
        </ul>
      </nav>
    </footer>
  );
}
