"use client";

import Link from "next/link";
import { useMiniApp } from "@/contexts/miniapp-context";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import { UserCircleIcon } from "@heroicons/react/24/outline";

export default function Footer() {
  const { connector } = useMiniApp();
  const { connect } = useConnect();
  const { isConnected } = useAccount();

  return (
    <footer className="fixed bottom-0 left-0 right-0 bg-brand-orange py-4">
      <nav className="container mx-auto px-4">
        <ul className="flex justify-center space-x-8 font-bold">
          {!isConnected && (
            <li>
              <button
                onClick={() => connect({ connector })}
                className="text-brand-white hover:underline font-heading disabled:opacity-50"
              >
                Sign in
              </button>
            </li>
          )}
          {isConnected && (
            <li>
              <Link
                href="/account"
                className="text-brand-white hover:underline font-heading"
              >
                <UserCircleIcon className="h-6 w-6" />
              </Link>
            </li>
          )}
          <li>
            <Link
              href="/orchard"
              className="text-brand-white hover:underline font-heading"
            >
              Orchard
            </Link>
          </li>
          <li>
            <Link
              href="/about"
              className="text-brand-white hover:underline font-heading"
            >
              NFTs for Peaches?
            </Link>
          </li>
        </ul>
      </nav>
    </footer>
  );
}
