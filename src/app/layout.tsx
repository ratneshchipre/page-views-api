import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { GeistPixelSquare } from "geist/font/pixel";
import "@/styles/globals.css";
import ThemeProvider from "@/components/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/sonner";
import { SITE_INFO, X_USERNAME } from "@/config/site";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_INFO.url),
  title: {
    template: `%s | ${SITE_INFO.name}`,
    default: SITE_INFO.name,
  },
  description: SITE_INFO.description,
  keywords: SITE_INFO.keywords,
  authors: [
    {
      name: SITE_INFO.author,
      url: "https://ratneshc.com",
    },
  ],
  creator: SITE_INFO.author,
  openGraph: {
    title: SITE_INFO.name,
    description: SITE_INFO.description,
    url: SITE_INFO.url,
    siteName: SITE_INFO.name,
    images: [
      {
        url: SITE_INFO.metaImage,
        width: 1200,
        height: 630,
        alt: SITE_INFO.name,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_INFO.name,
    description: SITE_INFO.description,
    images: [SITE_INFO.metaImage],
    creator: X_USERNAME,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} ${GeistPixelSquare.variable} antialiased selection:bg-foreground selection:text-primary-foreground`}
    >
      <body>
        <ThemeProvider>
          <Toaster position="top-center" />
          <TooltipProvider>
            <div className="container mx-auto flex min-h-screen max-w-4xl flex-col px-2">
              <div className="border-x">{children}</div>
            </div>
          </TooltipProvider>
        </ThemeProvider>
        <script
          defer
          src="https://static.cloudflareinsights.com/beacon.min.js"
          data-cf-beacon={JSON.stringify({
            token: process.env.NEXT_PUBLIC_CF_BEACON_TOKEN,
          })}
        ></script>
        <script
          defer
          src="/script"
          data-site="page-views-api.ratneshc.com"
          data-path="/"
        ></script>
      </body>
    </html>
  );
}
