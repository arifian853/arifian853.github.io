import type { Metadata } from "next";
import { Inclusive_Sans, Lexend_Deca } from "next/font/google";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { MotionProvider } from "@/components/providers/motion-provider";
import { ScrollToTop } from "@/components/tools/scroll-to-top";
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
  metadataBase: new URL('https://arifian.dev'),
  title: {
    default: "Arifian Saputra | AI Technical Mentor",
    template: "%s | Arifian Saputra",
  },
  description: "AI Technical Mentor at Infinite Learning Indonesia. Passionate about AI, Machine Learning, LLM, NLP, and building production-ready web applications.",
  keywords: ["Arifian Saputra", "AI Technical Mentor", "Web Developer", "Portfolio", "Frontend Developer", "Full Stack Developer"],
  authors: [{ name: "Arifian Saputra" }],
  creator: "Arifian Saputra",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://arifian.dev",
    siteName: "Arifian Saputra",
    title: "Arifian Saputra | AI Technical Mentor",
    description: "AI Technical Mentor at Infinite Learning Indonesia. Passionate about AI, Machine Learning, LLM, NLP, and building production-ready web applications.",
    images: [
      {
        url: "/og.webp",
        width: 1200,
        height: 630,
        alt: "Arifian Saputra - AI Technical Mentor",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Arifian Saputra | AI Technical Mentor",
    description: "AI Technical Mentor at Infinite Learning Indonesia. Passionate about AI, Machine Learning, LLM, NLP, and building production-ready web applications.",
    images: ["/og.webp"],
    creator: "@ArifianSaputra0",
  },
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
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inclusiveSans.variable} ${lexend.variable} font-sans antialiased bg-background text-foreground`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
        >
          <MotionProvider>
            {children}
          </MotionProvider>
          <ScrollToTop />
        </ThemeProvider>
      </body>
    </html>
  );
}
