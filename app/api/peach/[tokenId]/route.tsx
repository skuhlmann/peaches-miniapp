/* eslint-disable @next/next/no-img-element */
import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";
import { SEQUENCE_ENDPOINT, PEACH_NFT_CONTRACT_ADDRESS } from "@/lib/constants";
import { SequenceIndexer } from "@0xsequence/indexer";

export const dynamic = "force-dynamic";

const size = {
  width: 600,
  height: 400,
};

export async function GET(
  request: NextRequest,
  {
    params,
  }: {
    params: Promise<{
      tokenId: string;
    }>;
  }
) {
  const { tokenId } = await params;
  const searchParams = request.nextUrl.searchParams;
  const amount = searchParams.get("amount");

  const baseUrl =
    process.env.NEXT_PUBLIC_URL || "https://miniapp.peachtycoon.com";
  const logo = `${baseUrl}/images/logo_wordmark.png`;
  const peachIcon = `${baseUrl}/images/peach-avatar-trans.png`;
  const stepOne = `${baseUrl}/images/tree-3.png`;
  const stepTwo = `${baseUrl}/images/home_peach_bite.png`;
  const stepThree = `${baseUrl}/images/peach-box-12.png`;

  // let logoData = await fetch(logo)
  // Fetch font data
  const helsinki = `${baseUrl}/fonts/helsinki-webfont.woff`;
  const helsinkiData = await fetch(helsinki)
    .then((res) => {
      if (!res.ok) {
        throw new Error(
          `Failed to fetch font: ${res.status} ${res.statusText}`
        );
      }
      return res.arrayBuffer();
    })
    .catch((error) => {
      console.error("helsinki Font fetch error:", error);
      return null;
    });

  const workSans = `${baseUrl}/fonts/WorkSans-Regular.ttf`;
  const workSansData = await fetch(workSans)
    .then((res) => {
      if (!res.ok) {
        throw new Error(
          `Failed to fetch font: ${res.status} ${res.statusText}`
        );
      }
      return res.arrayBuffer();
    })
    .catch((error) => {
      console.error("workSans Font fetch error:", error);
      return null;
    });

  let nftImage: string | undefined = `/images/peach_fallback.png`;

  try {
    const indexer = new SequenceIndexer(
      SEQUENCE_ENDPOINT,
      process.env.SEQUENCE_API_KEY
    );

    const nft = await indexer.getTokenBalances({
      contractAddress: PEACH_NFT_CONTRACT_ADDRESS,
      tokenID: tokenId,
      includeMetadata: true,
    });

    if (nft.balances[0] && nft.balances[0].tokenMetadata?.image) {
      const imgPath = nft.balances[0].tokenMetadata.image
        .split("/ipfs/")[1]
        .split("/");

      console.log(
        "nft.balances[0].tokenMetadata.image",
        nft.balances[0].tokenMetadata.image
      );

      console.log("imgPath", imgPath);

      nftImage = `https://daohaus.mypinata.cloud/ipfs/${imgPath[0]}/${
        imgPath[1] ? imgPath[1] : ""
      }`;
    }
  } catch (error) {
    console.error("Error:", error);
  }

  console.log("nftImage", nftImage);

  // Build fonts array conditionally
  const fonts = [];
  if (helsinkiData) {
    fonts.push({
      name: "Helsinki",
      data: helsinkiData,
    });
  }
  if (workSansData) {
    fonts.push({
      name: "Work Sans",
      data: workSansData,
    });
  }

  return new ImageResponse(
    (
      <div
        style={{
          background: "#0E1418",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          paddingTop: "20px",
          paddingBottom: "20px",
          color: "#ffffff", // Changed default text color
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "flex-start",
            gap: "10px",
            width: "100%",
            padding: "0px 20px 0px 20px",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start",
              alignItems: "flex-start",
            }}
          >
            <img
              src={nftImage}
              alt="Peach Tycoon"
              style={{
                height: "337px",
                marginBottom: "10px",
              }}
            />
          </div>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "20px" }}
          >
            <img
              src={logo}
              alt="Peach Tycoon"
              style={{
                height: "32px",
              }}
            />

            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-start",
                alignItems: "center",
                width: "100%",
                color: "#419361",
                fontSize: "36px",
                gap: "5px",
              }}
            >
              <div>I GOT PEACHES!</div>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-start",
                alignItems: "flex-start",

                width: "100%",
                fontSize: "30px",
                textTransform: "uppercase",
                marginTop: "7px",
              }}
            >
              <div style={{ marginBottom: "5px" }}>YOU BUY TREE.</div>
              <div style={{ marginBottom: "5px" }}>TREE GROWS PEACH.</div>
              <div style={{ marginBottom: "0px" }}>YOU EAT* PEACH.</div>
              <div style={{ fontSize: "6px" }}>
                *or sell to the marketplace for others to enjoy.
              </div>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
                gap: "2px",
                marginTop: "7px",
              }}
            >
              <img
                src={stepOne}
                alt="tree"
                style={{
                  height: "75px",
                }}
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="#F5253D"
                viewBox="0 0 16 16"
              >
                <path
                  fill-rule="evenodd"
                  d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8"
                />
              </svg>
              <img
                src={stepTwo}
                alt="peach"
                style={{
                  height: "75px",
                }}
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="#F5253D"
                viewBox="0 0 16 16"
              >
                <path
                  fill-rule="evenodd"
                  d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8"
                />
              </svg>
              <img
                src={stepThree}
                alt="peachbox"
                style={{
                  height: "75px",
                }}
              />
            </div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: fonts, // Pass the conditionally built fonts array
    }
  );
}
