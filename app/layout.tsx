import type { Metadata } from "next";
import { Inclusive_Sans, Lexend_Deca } from "next/font/google";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { MotionProvider } from "@/components/providers/motion-provider";
import { ScrollToTop } from "@/components/tools/scroll-to-top";
import { SITE_URL, HOME_TITLE, HOME_DESCRIPTION, pageMetadata, siteStructuredData } from "@/lib/seo";
import "./globals.css";

const inclusiveSans = Inclusive_Sans({
  variable: "--font-inclusive-sans",
  subsets: ["latin"],
  weight: "400",
  display: "swap", // Prevent FOIT (Flash of Invisible Text)
});

const lexend = Lexend_Deca({
  variable: "--font-lexend-deca",
  subsets: ["latin"],
  weight: ["400"],
  display: "swap", // Prevent FOIT (Flash of Invisible Text)
});

export const metadata: Metadata = {
  ...pageMetadata("Home", HOME_DESCRIPTION, "/"),
  metadataBase: new URL(SITE_URL),
  title: { default: HOME_TITLE, template: "%s | Arifian Saputra" },
  authors: [{ name: "Arifian Saputra" }],
  creator: "Arifian Saputra",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning data-scroll-behavior="smooth">
      <body
        className={`${inclusiveSans.variable} ${lexend.variable} font-sans antialiased bg-background text-foreground`}
        suppressHydrationWarning
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(siteStructuredData).replace(/</g, "\\u003c") }}
        />
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <MotionProvider>
            {children}
            <ScrollToTop />
          </MotionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
