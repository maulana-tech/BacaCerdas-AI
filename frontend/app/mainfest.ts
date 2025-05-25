import type { Metadata } from "next";

const defaultUrl = "https://bacacerdas.ai";

export const metadata: Metadata = {
  metadataBase: new URL(defaultUrl),
  title: "BacaCerdas-AI - Platform Membaca Cerdas",
  description:
    "Platform membaca dan pembelajaran berbasis AI untuk meningkatkan pemahaman dan akuisisi pengetahuan",
  keywords: ["membaca", "AI", "pembelajaran", "pendidikan", "pemahaman"],
  authors: [{ name: "Tim BacaCerdas-AI" }],
  creator: "BacaCerdas-AI",
  robots: "index, follow",
  manifest: "/manifest.webmanifest",
  themeColor: "#000000",
  icons: {
    icon: [{ url: "/favicon-196.png", sizes: "196x196", type: "image/png" }],
    apple: [{ url: "/apple-icon-180.png" }],
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "BacaCerdas-AI",
    startupImage: [
      {
        url: "/splash_screens/10.2__iPad_landscape.png",
        media: "(orientation: landscape)",
      },
      {
        url: "/splash_screens/10.2__iPad_portrait.png",
        media: "(orientation: portrait)",
      },
      {
        url: "/splash_screens/10.5__iPad_Air_landscape.png",
        media: "(orientation: landscape)",
      },
      {
        url: "/splash_screens/10.5__iPad_Air_portrait.png",
        media: "(orientation: portrait)",
      },
      {
        url: "/splash_screens/10.9__iPad_Air_landscape.png",
        media: "(orientation: landscape)",
      },
      {
        url: "/splash_screens/10.9__iPad_Air_portrait.png",
        media: "(orientation: portrait)",
      },
      {
        url: "/splash_screens/11__iPad_Pro__10.5__iPad_Pro_landscape.png",
        media: "(orientation: landscape)",
      },
      {
        url: "/splash_screens/11__iPad_Pro__10.5__iPad_Pro_portrait.png",
        media: "(orientation: portrait)",
      },
      {
        url: "/splash_screens/11__iPad_Pro_M4_landscape.png",
        media: "(orientation: landscape)",
      },
      {
        url: "/splash_screens/11__iPad_Pro_M4_portrait.png",
        media: "(orientation: portrait)",
      },
      {
        url: "/splash_screens/12.9__iPad_Pro_landscape.png",
        media: "(orientation: landscape)",
      },
      {
        url: "/splash_screens/12.9__iPad_Pro_portrait.png",
        media: "(orientation: portrait)",
      },
      {
        url: "/splash_screens/13__iPad_Pro_M4_landscape.png",
        media: "(orientation: landscape)",
      },
      {
        url: "/splash_screens/13__iPad_Pro_M4_portrait.png",
        media: "(orientation: portrait)",
      },
      {
        url: "/splash_screens/4__iPhone_SE__iPod_touch_5th_generation_and_later_landscape.png",
        media: "(orientation: landscape)",
      },
      {
        url: "/splash_screens/4__iPhone_SE__iPod_touch_5th_generation_and_later_portrait.png",
        media: "(orientation: portrait)",
      },
      {
        url: "/splash_screens/8.3__iPad_Mini_landscape.png",
        media: "(orientation: landscape)",
      },
      {
        url: "/splash_screens/8.3__iPad_Mini_portrait.png",
        media: "(orientation: portrait)",
      },
      {
        url: "/splash_screens/9.7__iPad_Pro__7.9__iPad_mini__9.7__iPad_Air__9.7__iPad_landscape.png",
        media: "(orientation: landscape)",
      },
      {
        url: "/splash_screens/9.7__iPad_Pro__7.9__iPad_mini__9.7__iPad_Air__9.7__iPad_portrait.png",
        media: "(orientation: portrait)",
      },
      {
        url: "/splash_screens/iPhone_11__iPhone_XR_landscape.png",
        media: "(orientation: landscape)",
      },
      {
        url: "/splash_screens/iPhone_11__iPhone_XR_portrait.png",
        media: "(orientation: portrait)",
      },
      {
        url: "/splash_screens/iPhone_11_Pro_Max__iPhone_XS_Max_landscape.png",
        media: "(orientation: landscape)",
      },
      {
        url: "/splash_screens/iPhone_11_Pro_Max__iPhone_XS_Max_portrait.png",
        media: "(orientation: portrait)",
      },
      {
        url: "/splash_screens/iPhone_13_mini__iPhone_12_mini__iPhone_11_Pro__iPhone_XS__iPhone_X_landscape.png",
        media: "(orientation: landscape)",
      },
      {
        url: "/splash_screens/iPhone_13_mini__iPhone_12_mini__iPhone_11_Pro__iPhone_XS__iPhone_X_portrait.png",
        media: "(orientation: portrait)",
      },
      {
        url: "/splash_screens/iPhone_14_Plus__iPhone_13_Pro_Max__iPhone_12_Pro_Max_landscape.png",
        media: "(orientation: landscape)",
      },
      {
        url: "/splash_screens/iPhone_14_Plus__iPhone_13_Pro_Max__iPhone_12_Pro_Max_portrait.png",
        media: "(orientation: portrait)",
      },
      {
        url: "/splash_screens/iPhone_16e__iPhone_14__iPhone_13_Pro__iPhone_13__iPhone_12_Pro__iPhone_12_landscape.png",
        media: "(orientation: landscape)",
      },
      {
        url: "/splash_screens/iPhone_16e__iPhone_14__iPhone_13_Pro__iPhone_13__iPhone_12_Pro__iPhone_12_portrait.png",
        media: "(orientation: portrait)",
      },
      {
        url: "/splash_screens/iPhone_16__iPhone_15_Pro__iPhone_15__iPhone_14_Pro_landscape.png",
        media: "(orientation: landscape)",
      },
      {
        url: "/splash_screens/iPhone_16__iPhone_15_Pro__iPhone_15__iPhone_14_Pro_portrait.png",
        media: "(orientation: portrait)",
      },
      {
        url: "/splash_screens/iPhone_16_Plus__iPhone_15_Pro_Max__iPhone_15_Plus__iPhone_14_Pro_Max_landscape.png",
        media: "(orientation: landscape)",
      },
      {
        url: "/splash_screens/iPhone_16_Plus__iPhone_15_Pro_Max__iPhone_15_Plus__iPhone_14_Pro_Max_portrait.png",
        media: "(orientation: portrait)",
      },
      {
        url: "/splash_screens/iPhone_16_Pro_landscape.png",
        media: "(orientation: landscape)",
      },
      {
        url: "/splash_screens/iPhone_16_Pro_portrait.png",
        media: "(orientation: portrait)",
      },
      {
        url: "/splash_screens/iPhone_16_Pro_Max_landscape.png",
        media: "(orientation: landscape)",
      },
      {
        url: "/splash_screens/iPhone_16_Pro_Max_portrait.png",
        media: "(orientation: portrait)",
      },
      {
        url: "/splash_screens/iPhone_8__iPhone_7__iPhone_6s__iPhone_6__4.7__iPhone_SE_landscape.png",
        media: "(orientation: landscape)",
      },
      {
        url: "/splash_screens/iPhone_8__iPhone_7__iPhone_6s__iPhone_6__4.7__iPhone_SE_portrait.png",
        media: "(orientation: portrait)",
      },
      {
        url: "/splash_screens/iPhone_8_Plus__iPhone_7_Plus__iPhone_6s_Plus__iPhone_6_Plus_landscape.png",
        media: "(orientation: landscape)",
      },
      {
        url: "/splash_screens/iPhone_8_Plus__iPhone_7_Plus__iPhone_6s_Plus__iPhone_6_Plus_portrait.png",
        media: "(orientation: portrait)",
      },
    ],
  },
};
