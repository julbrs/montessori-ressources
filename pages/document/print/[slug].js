import { useRouter } from "next/router";
import Head from "next/head";
import dynamic from "next/dynamic";

const Loading = () => {
  return <p>Chargement...</p>;
};

const DocumentPdf = dynamic(() => import("../../../components/print"), {
  ssr: false,
  loading: Loading,
});

import firebase from "../../../lib/firebase";

// This gets called on every build
export async function getStaticProps({ params }) {
  const snapshot = await firebase
    .collection("documents")
    .where("slug", "==", params.slug)
    .where("validated", "==", true)
    .get();

  if (!snapshot.docs || !snapshot.docs.length > 0) {
    return {
      notFound: true,
    };
  } else {
    let { title, type, cards, author, file } = snapshot.docs[0].data();
    if (cards === undefined) cards = null;
    if (file === undefined) file = null;
    return {
      props: { title, type, cards, author, file }, // will be passed to the page component as props
      revalidate: 60 * 60,
    };
  }
}

/**
 * List of static path to generate at the build
 * @returns
 */
export async function getStaticPaths() {
  const snapshot = await firebase
    .collection("documents")
    .where("validated", "==", true)
    .get();

  const paths = snapshot.docs.map((doc) => {
    const docData = doc.data();
    return {
      params: {
        slug: docData.slug,
      },
    };
  });
  return {
    // pre render all validated documents
    paths,
    // ask the backend if not in generated path
    fallback: true,
  };
}

export default function DocumentPrint({ title, type, cards, author, file }) {
  const router = useRouter();

  return (
    <section className="text-gray-600 body-font overflow-hidden">
      <Head>
        <title>{title} - Montessori Ressources</title>
        <meta
          name="description"
          content="Nomenclature Montessori : {title} avec fichier PDF à imprimer."
        />
      </Head>
      <DocumentPdf document={{ title, type, cards, author, file }} />
    </section>
  );
}
