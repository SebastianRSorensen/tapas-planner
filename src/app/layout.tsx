import type React from "react";
import "./globals.css";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Toaster } from "@/components/ui/toaster";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import SessionProvider from "@/components/session-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "17. mai-feiring – Felles tapasbord",
  description:
    "Bli med på feiringa! Logg inn og velg ka du vil ta med te 17. mai-bordet.",
  generator: "v0.dev",
  themeColor: "#ba0c2f",
  metadataBase: new URL("https://tapas-planner.vercel.app/"),
  openGraph: {
    title: "17. mai feiring – Felles tapasbord",
    description:
      "Bli med på feiringa! Logg inn og velg ka du vil ta med te 17. mai-bordet.",
    url: "https://tapas-planner.vercel.app/",
    siteName: "17. mai-feiring",
    images: [
      {
        url: "tapas-celebration.png",
        width: 1200,
        height: 630,
        alt: "Norsk flagg og tapas",
      },
    ],
    locale: "nb_NO",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "17. mai-feiring – Felles tapasbord",
    description:
      "Bli med på feiringa! Logg inn og velg ka du vil ta med te 17. mai-bordet.",
    images: ["/tapas-celebration.png"],
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light">
          <SessionProvider session={session}>
            <div className="relative flex min-h-screen flex-col">
              <Header />
              <main className="flex-1">{children}</main>
              <Footer />
            </div>
            <Toaster />
          </SessionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
