import { env } from "@/lib/env";

/**
 * Get the farcaster manifest for the frame, generate yours from Warpcast Mobile
 *  On your phone to Settings > Developer > Domains > insert website hostname > Generate domain manifest
 * @returns The farcaster manifest for the frame
 */
export async function getFarcasterManifest() {
  let frameName = "PΞACH Tycoon";
  let noindex = false;
  const appUrl = env.NEXT_PUBLIC_URL;
  if (appUrl.includes("localhost")) {
    frameName += " Local";
    noindex = true;
  } else if (appUrl.includes("ngrok")) {
    frameName += " NGROK";
    noindex = true;
  } else if (appUrl.includes("https://dev.")) {
    frameName += " Dev";
    noindex = true;
  }
  return {
    accountAssociation: {
      header: env.NEXT_PUBLIC_FARCASTER_HEADER,
      payload: env.NEXT_PUBLIC_FARCASTER_PAYLOAD,
      signature: env.NEXT_PUBLIC_FARCASTER_SIGNATURE,
    },
    frame: {
      version: "1",
      name: frameName,
      iconUrl: `${appUrl}/icon_1024.png`,
      homeUrl: appUrl,
      // deprecated
      // imageUrl: `${appUrl}/preview.png`,
      // buttonTitle: `Launch App`,
      splashImageUrl: `${appUrl}/splash_200.png`,
      splashBackgroundColor: "#0E1418",
      webhookUrl: `${appUrl}/api/webhook`,
      // Metadata https://github.com/farcasterxyz/miniapps/discussions/191
      subtitle: "Farm for real peaches.", // 30 characters, no emojis or special characters, short description under app name
      description:
        "A seasonal NFT farming game where players can earn and/or sell boxes of real peaches.", // 170 characters, no emojis or special characters, promotional message displayed on Mini App Page
      primaryCategory: "games",
      tags: ["mini-app", "farming", "nfts", "peaches", "digiedibles"], // up to 5 tags, filtering/search tags
      tagline:
        "A seasonal NFT farming game where players can earn and/or sell boxes of real peaches.", // 30 characters, marketing tagline should be punchy and descriptive
      ogTitle: `${frameName}`, // 30 characters, app name + short tag, Title case, no emojis
      ogDescription:
        "A seasonal NFT farming game where players can earn and/or sell boxes of real peaches.", // 100 characters, summarize core benefits in 1-2 lines
      screenshotUrls: [
        // 1284 x 2778, visual previews of the app, max 3 screenshots
        // `${appUrl}/images/feed.png`,
      ],
      heroImageUrl: `${appUrl}/preview.png`, // 1200 x 630px (1.91:1), promotional display image on top of the mini app store
      ogImageUrl: `${appUrl}/preview.png`, // 1200 x 630px (1.91:1), promotional image, same as app hero image
      noindex: noindex,
    },
  };
}
