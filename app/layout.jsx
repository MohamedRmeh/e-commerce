import "./globals.css";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import { LoginProvider } from "@/context/LoginContext";

export const metadata = {
  title: "E-commerce",
  description: "E-commerce app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen max-w-[1440px] mx-auto">
      <LoginProvider>
        <Navbar/>
        <main className="relative overflow-hidden flex-1">
        {children}
        </main>
        <Footer/>
        </LoginProvider>
        </body>
    </html>
  );
}
