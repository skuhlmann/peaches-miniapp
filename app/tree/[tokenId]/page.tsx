import { Metadata } from "next";
import { headers } from "next/headers";
import Tree from "@/components/Tree";

const appUrl = process.env.NEXT_PUBLIC_URL;

type Props = {
  params: Promise<{ tokenId: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { tokenId } = await params;

  console.log("tokenId", tokenId);

  const frame = {
    version: "next",
    imageUrl: `${appUrl}/tree/${tokenId}/opengraph-image`,
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
      images: [`${appUrl}/tree/${tokenId}/opengraph-image`],
    },
    other: {
      "fc:frame": JSON.stringify(frame),
      "fc:frame:image": `${appUrl}/tree/${tokenId}/opengraph-image`,
      "fc:frame:button:1": "PΞACH Tycoon",
      "fc:frame:post_url": `${appUrl}/api/frame`,
    },
  };
}

export default function Page() {
  return <Tree />;
}
