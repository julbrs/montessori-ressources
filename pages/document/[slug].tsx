import { useRouter } from "next/router";
import Image from "next/image";
import Head from "next/head";
import Link from "next/link";

import firebase from "../../lib/firebase";

import { DiscussionEmbed } from "disqus-react";

// This gets called on every build
export async function getStaticProps({ params }) {
  const snapshot = await firebase
    .collection("documents")
    .where("slug", "==", params.slug)
    .where("validated", "==", true)
    .get();

  if (!snapshot.docs) {
    return {
      notFound: true,
    };
  } else {
    let { category_id, title, type, cards, author, file } = snapshot.docs[0].data();

    const snapshotCategory = await firebase.collection("categories").doc(category_id).get();

    if (cards === undefined) cards = null;
    if (file === undefined) file = null;
    return {
      props: {
        title,
        type,
        cards,
        author,
        file,
        category: snapshotCategory.data().title,
        category_slug: snapshotCategory.data().slug,
      }, // will be passed to the page component as props
      revalidate: 60 * 60,
    };
  }
}

/**
 * List of static path to generate at the build
 * @returns
 */
export async function getStaticPaths() {
  const snapshot = await firebase.collection("documents").where("validated", "==", true).get();

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

export default function Document({ title, cards, author, category, category_slug }) {
  const router = useRouter();
  const slug = router.query.slug;
  let mainImage = "https://dummyimage.com/400x400";
  if (cards && cards.length > 0) {
    mainImage = cards[0].file.src;
  }
  let url = null;
  if (typeof window !== "undefined") {
    url = window.location.href;
  }
  return (
    <>
      <section className="text-gray-600 body-font overflow-hidden">
        <Head>
          <title>{title} - Montessori Ressources - Nomenclature</title>
          <meta name="description" content="Nomenclature Montessori : {title} avec fichier PDF à imprimer." />
        </Head>
        <div className="container px-5 py-14 mx-auto">
          <div className="lg:w-4/5 mx-auto flex flex-wrap">
            <div className="lg:w-1/2 w-full lg:h-auto h-64 relative">
              <Image
                alt="ecommerce"
                className=" object-contain object-center rounded"
                src={mainImage}
                layout="fill"
              />
            </div>
            <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
              <Link href={`/category/${category_slug}`}>
                <a className="text-sm title-font text-gray-500 tracking-widest uppercase">{category}</a>
              </Link>
              <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">{title}</h1>
              <p className="leading-relaxed pb-5 border-b-2 border-gray-100 mb-4">
                Cette nomenclature, fournie par <strong>{author}</strong> est à propos des{" "}
                <strong>{title}</strong>. Elle a été validée par notre équipe éducative, elle est utilisable
                dans un contexte Montessori. <br />
                Le bouton <strong>Télécharger</strong> ci-dessous permet de générer une version{" "}
                <strong>PDF</strong> du document au normes Montessori (l&apos;image sera présentée dans la
                bonne taille avec les bons libellés à imprimer).
              </p>

              <div className="flex mt-6">
                <span className="title-font font-medium text-2xl text-gray-900">License</span>
                <Link href={`/document/print/${slug}`} passHref>
                  <div className="flex ml-auto text-white bg-blue-500 border-0 py-2 px-6 focus:outline-none hover:bg-blue-600 cursor-pointer rounded">
                    Télécharger
                  </div>
                </Link>
                <button className="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4">
                  <svg
                    fill="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        {cards && (
          <div className="container px-5 py-14 mx-auto">
            <div className="flex flex-wrap w-full mb-5">
              <div className="lg:w-1/2 w-full mb-6 lg:mb-0">
                <h2 className="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900">
                  Toutes les images
                </h2>
                <div className="h-1 w-20 bg-blue-500 rounded"></div>
              </div>
            </div>
            <div className="flex flex-wrap -m-4">
              {cards &&
                cards.map((card, index) => (
                  <div key={index} className="xl:w-1/4 md:w-1/2 p-4">
                    <div className="bg-gray-100 p-6 rounded-lg">
                      <div className="h-80 relative">
                        <Image
                          className="rounded w-full object-contain object-center mb-6"
                          src={card.file.src}
                          alt={card.file.title}
                          layout="fill"
                        />
                      </div>
                      <h2 className="text-lg text-gray-900 font-medium title-font mb-4">{card.name}</h2>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}
      </section>
      <section className="text-gray-600 body-font overflow-hidden">
        <div className="container px-5 py-14 mx-auto">
          {url && (
            <DiscussionEmbed
              shortname="montessori-ressources"
              config={{
                url,
                identifier: slug[0],
                title: title,
              }}
            />
          )}
        </div>
      </section>
    </>
  );
}
