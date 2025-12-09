import localFont from "next/font/local";
import "./globals.css";
import Header from "./components/Header";

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
        <Header />
        {children}
      </body>
    </html>
  );
}
