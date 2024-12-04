import { Header } from "@/components/header";
import "../styles/globals.css"; // Import your global CSS file
import type { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Header />
      <main className="container mx-auto px-4 py-8">
        <Component {...pageProps} />
      </main>
    </>
  );
}

export default MyApp;
