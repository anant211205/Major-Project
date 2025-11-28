import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import { ClerkProvider } from "@clerk/nextjs";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata = {
  title: "AI FMS",
  description: "one stop finance platform",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${inter.className}`}>
          {/* header */}
          <Header/>
          {children}
          {/* footer */}
          <footer>
            <div>
              <p>Made by RG10</p>
            </div>
          </footer>
        </body>
      </html>
    </ClerkProvider>
  );
}
