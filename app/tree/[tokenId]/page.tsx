import { Metadata } from "next";
import { headers } from "next/headers";
import Tree from "@/components/Tree";

async function getBaseUrl() {
  const headersList = await headers();
  const host = headersList.get("host");
  return `https://${host}`;
}

type Props = {
  params: Promise<{ tokenId: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { tokenId } = await params;
  const baseUrl = await getBaseUrl();

  const frame = {
    version: "next",
    imageUrl: `${baseUrl}/tree/${tokenId}/opengraph-image`,
    button: {
      title: "PΞACH Tycoon",
      action: {
        type: "launch_frame",
        name: "PΞACH Tycoon",
        url: `${baseUrl}`,
        iconImageUrl: `${baseUrl}/images/home_peach.png`,
        splashImageUrl: `${baseUrl}/preview.png`,
        splashBackgroundColor: "#0E1418",
      },
    },
    postUrl: `${baseUrl}/api/frame`,
  };
  return {
    title: "PΞACH Tycoon",
    openGraph: {
      title: "PΞACH Tycoon",
      description:
        "A seasonal NFT farming game where players can earn and/or sell boxes of real peaches.",
      images: [`${baseUrl}/tree/${tokenId}/opengraph-image`],
    },
    other: {
      "fc:frame": JSON.stringify(frame),
      "fc:frame:image": `${baseUrl}/tree/${tokenId}/opengraph-image`,
      "fc:frame:button:1": "PΞACH Tycoon",
      "fc:frame:post_url": `${baseUrl}/api/frame`,
    },
  };
}

export default function Page() {
  return <Tree />;
}
