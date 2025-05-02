import App from "@/components/App";
import Footer from "@/components/Footer";
import { env } from "@/lib/env";
import { Metadata } from "next";

const appUrl = env.NEXT_PUBLIC_URL;

const frame = {
  version: "next",
  imageUrl: `${appUrl}/preview.png`,
  button: {
    title: "Launch App",
    action: {
      type: "launch_frame",
      name: "Peach Tycoon",
      url: appUrl,
      splashImageUrl: `${appUrl}/logo.png`,
      splashBackgroundColor: "#0E1418",
    },
  },
};

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Peach Tycoon",
    openGraph: {
      title: "Peach Tycoon",
      description:
        "A seasonal NFT farming game where players can earn and/or sell boxes of real peaches.",
    },
    other: {
      "fc:frame": JSON.stringify(frame),
    },
  };
}

export default function Home() {
  return (
    <>
      <App />
      <Footer />
    </>
  );
}
