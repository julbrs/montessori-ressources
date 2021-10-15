import "../styles/globals.css";
import Naviguation from "../components/nav";
import Footer from "../components/footer";
import Script from "next/script";

export default function MontessoriRessources({ Component, pageProps }) {
  return (
    <>
      {/* Global Site Tag (gtag.js) - Google Analytics */}
      <Script strategy="lazyOnload" src={`https://www.googletagmanager.com/gtag/js?id=G-E5P930JTF9`} />

      <Script strategy="lazyOnload">
        {`
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-E5P930JTF9', {
        page_path: window.location.pathname,
      });
  `}
      </Script>
      <Naviguation />
      <main>
        <Component {...pageProps} />
      </main>
      <Footer />
    </>
  );
}
