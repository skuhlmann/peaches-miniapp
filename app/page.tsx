import App from "@/components/App";
import Footer from "@/components/Footer";
import { Metadata } from "next";

const appUrl = process.env.NEXT_PUBLIC_URL;

export async function generateMetadata(): Promise<Metadata> {
  const frame = {
    version: "vNext",
    imageUrl: `${appUrl}/home.png`,
    button: {
      title: "PΞACH Tycoon",
      action: {
        type: "launch_frame",
        name: "PΞACH Tycoon",
        url: `${appUrl}`,
        // iconImageUrl: `${appUrl}/images/home_peach.png`,
        splashImageUrl: `${appUrl}/splash_200.png`,
        splashBackgroundColor: "#0E1418",
      },
    },
    postUrl: `${appUrl}/api/frame`,
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
      "fc:frame:post_url": `${appUrl}/api/frame`,
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
