import type { Metadata } from "next";
import { Inter, Roboto, Montserrat } from "next/font/google";
import "./globals.css";
import NavBar from "./components/NavBar";
import Providers from "./components/Providers";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Next Blog",
  description: "A simple blog built with Next.js and Prisma",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <NavBar />
          <div className="h-full w-full pt-4 px-4 md:px-20 flex justify-center items-center">{children}</div>
        </Providers>
      </body>
    </html >
  );
}
