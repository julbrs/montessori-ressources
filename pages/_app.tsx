import "../styles/globals.css";
import Naviguation from "../components/nav";
import Footer from "../components/footer";

export default function MontessoriRessources({ Component, pageProps }) {
  return (
    <>
      <Naviguation />
      <main>
        <Component {...pageProps} />
      </main>
      <Footer />
    </>
  );
}
