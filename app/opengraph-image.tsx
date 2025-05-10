/* eslint-disable @next/next/no-img-element */
import { ImageResponse } from "next/og";

export const runtime = "edge";
export const contentType = "image/png";
export const size = {
  width: 1200,
  height: 630,
};

export default async function Image({
  params,
}: {
  params: { tokenId: string };
}) {
  console.log("params", params);
  const baseUrl =
    process.env.NEXT_PUBLIC_URL || "https://miniapp.peachtycoon.com";
  const logo = `${baseUrl}/images/logo_wordmark.png`;
  const stepOne = `${baseUrl}/images/tree-3.png`;
  const stepTwo = `${baseUrl}/images/tree_harvest.png`;
  const stepThree = `${baseUrl}/images/crate.png`;
  const stepFour = `${baseUrl}/images/home_peach.png`;
  const stepFive = `${baseUrl}/images/home_peach_bite.png`;
  const stepSix = `${baseUrl}/images/peach-box-12.png`;

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
          paddingTop: "40px",
          paddingBottom: "40px",
          color: "#ffffff", // Changed default text color
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "50px",
            width: "100%",
            padding: "0px 30px 0px 30px",
            fontSize: "80px",
            marginBottom: "10px",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div>YOU</div>
            <div>BUY</div>
            <div>TREE.</div>
          </div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="60"
            height="60"
            fill="#F5253D"
            viewBox="0 0 16 16"
          >
            <path
              fill-rule="evenodd"
              d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8"
            />
          </svg>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div>TREE</div>
            <div>GROWS</div>
            <div>PEACH.</div>
          </div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="60"
            height="60"
            fill="#F5253D"
            viewBox="0 0 16 16"
          >
            <path
              fill-rule="evenodd"
              d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8"
            />
          </svg>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div>YOU</div>
            <div>EAT*</div>
            <div style={{ marginBottom: "1px" }}>PEACH.</div>
            <div style={{ fontSize: "12px" }}>
              *or sell to the marketplace for others to enjoy.
            </div>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "5px",
          }}
        >
          <img
            src={logo}
            alt="Peach Tycoon"
            style={{
              height: "64px",
            }}
          />

          <div
            style={{
              fontFamily: "Work Sans",
              fontSize: "20px",
              color: "#E46C1E",
            }}
          >
            Buy Now, Munch Later.
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
              gap: "10px",
              marginTop: "15px",
            }}
          >
            <img
              src={stepOne}
              alt="tree"
              style={{
                height: "150px",
              }}
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="40"
              height="40"
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
                height: "150px",
              }}
            />

            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="40"
              height="40"
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
                height: "150px",
              }}
            />

            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="40"
              height="40"
              fill="#F5253D"
              viewBox="0 0 16 16"
            >
              <path
                fill-rule="evenodd"
                d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8"
              />
            </svg>

            <img
              src={stepFour}
              alt="peachbox"
              style={{
                height: "150px",
              }}
            />

            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="40"
              height="40"
              fill="#F5253D"
              viewBox="0 0 16 16"
            >
              <path
                fill-rule="evenodd"
                d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8"
              />
            </svg>

            <img
              src={stepFive}
              alt="peachbox"
              style={{
                height: "150px",
              }}
            />

            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="40"
              height="40"
              fill="#F5253D"
              viewBox="0 0 16 16"
            >
              <path
                fill-rule="evenodd"
                d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8"
              />
            </svg>

            <img
              src={stepSix}
              alt="tree"
              style={{
                height: "150px",
              }}
            />
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
