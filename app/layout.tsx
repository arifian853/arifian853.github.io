import type { Metadata } from "next";
import { Inclusive_Sans, Lexend_Deca } from "next/font/google";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { ScrollToTop } from "@/components/tools/scroll-to-top";
import "./globals.css";

const inclusiveSans = Inclusive_Sans({
  variable: "--font-inclusive-sans",
  subsets: ["latin"],
  weight: "400",
});

const lexend = Lexend_Deca({
  variable: "--font-lexend-deca",
  subsets: ["latin"],
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "Arifian's Portfolio",
  description: "Just a simple portfolio",
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
          {children}
          <ScrollToTop />
        </ThemeProvider>
      </body>
    </html>
  );
}
