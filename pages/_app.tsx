import "../styles/globals.css";
import Naviguation from "../components/nav";
import Footer from "../components/footer";
import Script from "next/script";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function MontessoriRessources({ Component, pageProps }) {
  const router = useRouter();
  useEffect(
    function sendGoatCounterEventsOnRoute() {
      const handleRouteChange = (path) => {
        (window as any)?.goatcounter?.count?.({
          path,
        });
      };
      router.events.on("routeChangeComplete", handleRouteChange);
      return () => {
        router.events.off("routeChangeComplete", handleRouteChange);
      };
    },
    [router.events]
  );
  return (
    <>
      <Naviguation />
      <main>
        <Component {...pageProps} />
      </main>
      <Footer />
      {/* GoatCounter */}
      <Script
        async
        data-goatcounter="https://montessori.goatcounter.com/count"
        src="//gc.zgo.at/count.js"
        strategy="afterInteractive"
      />
    </>
  );
}
