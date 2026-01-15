import localFont from "next/font/local";
import "./globals.css";
import Header from "./components/Header";
import Signature from "./components/signature";

const helvetica = localFont({
  src: "./fonts/HelveticaNeue-Medium.otf",
  variable: "--font-helvetica",
  display: "swap",
  preload: true,
});

export const metadata = {
  title: "Thomas Gaudin",
  description: "swiss interactive media designer",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${helvetica.variable} antialiased`}>
        <Signature />
        <Header />
        {children}
      </body>
    </html>
  );
}
