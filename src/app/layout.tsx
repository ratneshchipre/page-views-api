import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { GeistPixelSquare } from "geist/font/pixel";
import "@/styles/globals.css";
import ThemeProvider from "@/components/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Page Views API",
  description: "A simple API to track page views",
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
          src="https://page-views-api.ratneshc.com/script"
          data-site="page-views-api.ratneshc.com"
          defer
        ></script>
      </body>
    </html>
  );
}
