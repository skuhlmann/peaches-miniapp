import { Metadata } from "next";
import Peach from "@/components/Peach";

const appUrl = process.env.NEXT_PUBLIC_URL;

type Props = {
  params: Promise<{ tokenId: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { tokenId } = await params;

  const imageUrl = new URL(`${appUrl}/api/peach/${tokenId}`);

  const frame = {
    version: "next",
    imageUrl: imageUrl.toString(),
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
      images: [{ url: imageUrl.toString() }],
    },
    other: {
      "fc:frame": JSON.stringify(frame),
      "fc:frame:image": `${imageUrl.toString()}`,
      "fc:frame:button:1": "PΞACH Tycoon",
    },
  };
}

export default function Page() {
  return <Peach />;
}
