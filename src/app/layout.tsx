import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import "./globals.scss";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"], display: "swap" });
const grotesk = Space_Grotesk({ variable: "--font-grotesk", subsets: ["latin"], display: "swap" });
const jetbrains = JetBrains_Mono({ variable: "--font-jetbrains", subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  title: "Md. Al-Amin — Front-End Developer | Angular, React & Next.js",
  description:
    "Portfolio of Md. Al-Amin, a Front-End Developer from Dhaka with 7+ years of experience building responsive web apps with Angular, React, Next.js, NestJS and WordPress.",
  keywords: [
    "Md. Al-Amin",
    "Front-End Developer",
    "Angular Developer",
    "React Developer",
    "Next.js",
    "WordPress",
    "Dhaka",
    "Bangladesh",
    "Portfolio",
  ],
  authors: [{ name: "Md. Al-Amin" }],
  openGraph: {
    title: "Md. Al-Amin — Front-End Developer",
    description:
      "7+ years building responsive web applications with Angular, React, Next.js and modern JavaScript.",
    type: "website",
    images: ["/qsmart-erp.jpg"],
  },
};

export const viewport: Viewport = {
  themeColor: "#f5f7fa",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-theme="light"
      data-widget-pos="right"
      suppressHydrationWarning
      className={`${inter.variable} ${grotesk.variable} ${jetbrains.variable}`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('portfolio-theme')||'light';document.documentElement.setAttribute('data-theme',t);var p=localStorage.getItem('portfolio-widget-pos')||'right';document.documentElement.setAttribute('data-widget-pos',p);var a=localStorage.getItem('portfolio-accent')||'default';if(a!=='default')document.documentElement.setAttribute('data-accent',a);}catch(e){}})();`,
          }}
        />
      </head>
      <body>
        <div className="bg-fx" aria-hidden>
          <div className="blob blob-1" />
          <div className="blob blob-2" />
          <div className="blob blob-3" />
          <div className="bg-grid" />
          <div className="noise" />
        </div>
        {children}
      </body>
    </html>
  );
}
