"use client";

import { useDisconnect } from "wagmi";
import { useRouter } from "next/navigation";

export default function AccountPage() {
  const { disconnect } = useDisconnect();
  const router = useRouter();

  const handleDisconnect = () => {
    disconnect();
    router.push("/");
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Account</h1>
      <button
        onClick={handleDisconnect}
        className="bg-brand-orange text-white px-4 py-2 rounded hover:bg-orange-600"
      >
        Disconnect Wallet
      </button>
    </div>
  );
}
