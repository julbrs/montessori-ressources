import "../styles/globals.css";
import Naviguation from "../components/Naviguation";

export default function MontessoriRessources({ Component, pageProps }) {
  return (
    <>
      <Naviguation />
      <main>
        <Component {...pageProps} />
      </main>
    </>
  );
}
