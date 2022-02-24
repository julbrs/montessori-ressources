import "../styles/globals.css";
import Naviguation from "../components/nav";
import Footer from "../components/footer";
import Script from "next/script";

export default function MontessoriRessources({ Component, pageProps }) {
  return (
    <>
      {/* GoatCounter */}
      <script
        data-goatcounter="https://montessori.goatcounter.com/count"
        async
        src="//gc.zgo.at/count.js"
      ></script>
      <Naviguation />
      <main>
        <Component {...pageProps} />
      </main>
      <Footer />
    </>
  );
}
