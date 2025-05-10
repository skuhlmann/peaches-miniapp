import App from "@/components/App";
import Footer from "@/components/Footer";
import { env } from "@/lib/env";
import { Metadata } from "next";

const appUrl = process.env.NEXT_PUBLIC_URL;

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
  const frame = {
    version: "next",
    imageUrl: `${appUrl}/opengraph-image`,
    button: {
      title: "PΞACH Tycoon",
      action: {
        type: "launch_frame",
        name: "PΞACH Tycoon",
        url: `${appUrl}`,
        iconImageUrl: `${appUrl}/images/home_peach.png`,
        splashImageUrl: `${appUrl}/preview.png`,
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
      images: [`${appUrl}/opengraph-image`],
    },
    other: {
      "fc:frame": JSON.stringify(frame),
      "fc:frame:image": `${appUrl}/opengraph-image`,
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
