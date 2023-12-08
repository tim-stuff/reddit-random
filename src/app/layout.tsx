import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "../components/Header/Header";
import { Web3Modal } from "../context/Web3Modal";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Stable Assignment",
  description: "Assignment project for Stable Labs",
};

/**
 * Renders the root layout
 *
 * @component
 * @param children - React nodes as children passed to the layout
 * @returns A root layout wrapper
 */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Web3Modal>
          <Header />
          {children}
        </Web3Modal>
      </body>
    </html>
  );
}
