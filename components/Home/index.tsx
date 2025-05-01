"use client";

import { useSignIn } from "@/hooks/use-sign-in";
import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const { signIn, isLoading, isSignedIn, user } = useSignIn({
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
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold font-heading">Welcome</h1>
        <p className="text-lg text-brand-blue">
          {isSignedIn ? "You are signed in!" : "Sign in to get started"}
        </p>

        {!isSignedIn ? (
          <button
            onClick={signIn}
            disabled={isLoading}
            className="px-6 py-3 bg-brand-orange text-brand-white font-semibold rounded-lg shadow-md hover:bg-brand-red focus:outline-none focus:ring-2 focus:ring-brand-orange focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
          >
            {isLoading ? "Signing in..." : "Sign in"}
          </button>
        ) : (
          <div className="space-y-4">
            {user && (
              <div className="flex flex-col items-center space-y-2">
                <Image
                  src={user.pfp_url}
                  alt="Profile"
                  className="w-20 h-20 rounded-full"
                  width={80}
                  height={80}
                />
                <div className="text-center">
                  <p className="font-semibold">{user.display_name}</p>
                  <p className="text-sm text-brand-blue">@{user.username}</p>
                </div>
              </div>
            )}
            <button
              onClick={testAuth}
              className="px-6 py-3 bg-brand-green text-brand-white font-semibold rounded-lg shadow-md hover:bg-brand-red focus:outline-none focus:ring-2 focus:ring-brand-green focus:ring-opacity-50 transition-colors duration-200"
            >
              Test Authentication
            </button>

            {testResult && (
              <div className="mt-4 p-4 rounded-lg bg-brand-gray text-brand-white text-sm">
                {testResult}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
