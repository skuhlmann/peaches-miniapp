"use client";

import { useSignIn } from "@/hooks/use-sign-in";
import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const { isSignedIn, user } = useSignIn({
    autoSignIn: false,
  });
  const [testResult, setTestResult] = useState<string>("");

  const testAuth = async () => {
    try {
      const res = await fetch("/api/test", {
        credentials: "include",
      });
      const data = await res.json();

      if (!res.ok) {
        setTestResult(`Auth test failed: ${data.error}`);
        return;
      }

      setTestResult(`Auth test succeeded! Server response: ${data.message}`);
    } catch (error) {
      setTestResult(
        "Auth test failed: " +
          (error instanceof Error ? error.message : "Unknown error")
      );
    }
  };

  return (
    <div className="bg-brand-black text-brand-white flex min-h-screen flex-col items-center justify-center p-4">
      <section className="flex flex-col md:flex-row items-center justify-center gap-8 w-full max-w-4xl">
        {/* Step 1 */}
        <div className="flex flex-col items-center md:flex-row md:items-center gap-4">
          <Image
            src="/images/tree-3.png"
            alt="Tree"
            width={80}
            height={80}
            className="mb-2 md:mb-0"
          />
          <span className="text-5xl md:text-6xl font-extrabold leading-tight font-headline">
            YOU
            <br />
            BUY
            <br />
            TREE.
          </span>
        </div>
        {/* Arrow 1 */}
        <div className="hidden md:flex items-center">
          <Image src="/images/arrow_1.png" alt="arrow" width={60} height={60} />
        </div>
        {/* Step 2 */}
        <div className="flex flex-col items-center md:flex-row md:items-center gap-4">
          <Image
            src="/images/home_peach.png"
            alt="Peach"
            width={80}
            height={80}
            className="mb-2 md:mb-0"
          />
          <span className="text-5xl md:text-6xl font-extrabold leading-tight font-headline">
            TREE
            <br />
            GROWS
            <br />
            PEACH.
          </span>
        </div>
        {/* Arrow 2 */}
        <div className="hidden md:flex items-center">
          <Image src="/images/arrow_1.png" alt="arrow" width={60} height={60} />
        </div>
        {/* Step 3 */}
        <div className="flex flex-col items-center md:flex-row md:items-center gap-4">
          <Image
            src="/images/home_peach_bite.png"
            alt="Peach Bite"
            width={80}
            height={80}
            className="mb-2 md:mb-0"
          />
          <span className="text-5xl md:text-6xl font-extrabold leading-tight font-headline">
            YOU
            <br />
            EAT<span className="align-super text-2xl">*</span>
            <br />
            PEACH.
          </span>
          <span className="text-xs mt-2 text-brand-white/70">
            *or sell to the marketplace for others to enjoy.
          </span>
        </div>
      </section>
    </div>
  );
}
