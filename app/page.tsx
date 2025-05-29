import App from "@/components/App";
import Footer from "@/components/Footer";
import { Metadata } from "next";

const appUrl = process.env.NEXT_PUBLIC_URL;

export async function generateMetadata(): Promise<Metadata> {
  const frame = {
    version: "next",
    imageUrl: `${appUrl}/home.png`,
    button: {
      title: "PΞACH Tycoon",
      action: {
        type: "launch_frame",
        name: "PΞACH Tycoon",
        url: `${appUrl}`,
        splashImageUrl: `${appUrl}/splash_200.png`,
        splashBackgroundColor: "#0E1418",
      },
    },
  };
  return {
    title: "PΞACH Tycoon",
    openGraph: {
      title: "PΞACH Tycoon",
      description:
        "A seasonal NFT farming game where players can earn and/or sell boxes of real peaches.",
      images: [`${appUrl}/home.png`],
    },
    other: {
      "fc:frame": JSON.stringify(frame),
      "fc:frame:image": `${appUrl}/home.png`,
      "fc:frame:button:1": "PΞACH Tycoon",
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
