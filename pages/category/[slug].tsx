import { useRouter } from "next/router";
import Head from "next/head";

import firebase from "../../lib/firebase";
import { Item } from "../../components/document/item";

// This gets called on every build
export async function getStaticProps({ params }) {
  const snapshot = await firebase
    .collection("categories")
    .where("slug", "==", params.slug)
    .get();

  if (!snapshot.docs) {
    return {
      notFound: true,
    };
  } else {
    const id = snapshot.docs[0].id;
    let { title, slug } = snapshot.docs[0].data();

    const docSnapshot = await firebase
      .collection("documents")
      .where("validated", "==", true)
      .where("slug", "!=", null)
      .where("category_id", "==", id)
      .get();

    const data = docSnapshot.docs.map((doc) => {
      let { type, author, title, slug, cards } = doc.data();
      if (cards === undefined) cards = null;
      return {
        type,
        author,
        title,
        slug,
        cards,
      };
    });
    return {
      props: { title, data }, // will be passed to the page component as props
      revalidate: 60 * 60,
    };
  }
}

/**
 * List of static path to generate at the build
 * @returns
 */
export async function getStaticPaths() {
  const snapshot = await firebase.collection("categories").get();

  const paths = snapshot.docs.map((doc) => {
    const data = doc.data();
    return {
      params: {
        slug: data.slug,
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

export default function Category({ title, data }) {
  const router = useRouter();
  const slug = router.query.slug;

  return (
    <section className="text-gray-600 body-font overflow-hidden">
      <Head>
        <title>{title} - Montessori Ressources</title>
        <meta
          name="description"
          content="Nomenclature Montessori : {title} avec fichier PDF à imprimer."
        />
      </Head>
      <div className="container px-5 pt-14 mx-auto">
        <div className="lg:w-4/5 mx-auto">
          <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
            {title}
          </h1>
          <p className="leading-relaxed pb-5 border-b-2 border-gray-100 mb-4">
            Voici la catégorie <strong>{title}</strong>.
          </p>
        </div>
      </div>

      <div className="container px-5 pt-24 mx-auto">
        <div className="lg:w-4/5 mx-auto">
          <h2 className="text-gray-900 text-3xl title-font font-medium mb-1">
            Cartes
          </h2>
          <div className="flex flex-wrap">
            {data?.length > 0 ? (
              data.map((doc, index) => <Item key={index} doc={doc} />)
            ) : (
              <p>Pas encore de cartes ici!</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
