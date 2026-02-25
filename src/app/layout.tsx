import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

// Import Rubik font and Rubik Italic from local .ttf files
const rubik = localFont({
  src: "./fonts/Rubik/Rubik-VariableFont_wght.ttf",
  variable: "--font-rubik",
  weight: "100 900",
});

const rubikItalic = localFont({
  src: "./fonts/Rubik/Rubik-Italic-VariableFont_wght.ttf",
  variable: "--font-rubik-italic",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "seif basel ",
  description: "this is my portfolio",
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body
        className={`${rubik.variable} ${rubikItalic.variable}  antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
