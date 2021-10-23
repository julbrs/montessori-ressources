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

      {/* Hotjar Tracking Code for https://montessori-ressources.net/ */}
      <Script strategy="lazyOnload">
        {`
        (function(h,o,t,j,a,r){
            h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
            h._hjSettings={hjid:2665947,hjsv:6};
            a=o.getElementsByTagName('head')[0];
            r=o.createElement('script');r.async=1;
            r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
            a.appendChild(r);
        })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
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
