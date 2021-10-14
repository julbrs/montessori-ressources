import "../styles/globals.css";
import Naviguation from "../components/nav";

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
