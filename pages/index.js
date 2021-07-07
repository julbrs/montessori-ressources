import React from "react";

import Link from "next/link";
import firebase from "../lib/firebase";
import Image from "next/image";
import Head from "next/head";

import banner from "../public/banner.jpg";

// This gets called on every build
export async function getStaticProps() {
  const snapshot = await firebase
    .collection("documents")
    .where("validated", "==", true)
    .get();

  const data = snapshot.docs.map((doc) => {
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

  if (!data) {
    return {
      notFound: true,
    };
  }

  return {
    props: { data }, // will be passed to the page component as props
    revalidate: 60 * 5,
  };
}

const Item = ({ doc }) => {
  if (doc.type == "file") {
    return <ItemFile file={doc} />;
  } else {
    return <ItemNomenclature nomenclature={doc} />;
  }
};

const ItemFile = ({ file }) => {
  return (
    <div className="p-4 md:w-1/3">
      <div className="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden">
        <div className="h-48 w-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-48 w-48 m-auto"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
            />
          </svg>
        </div>

        <div className="p-6">
          <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">
            CATEGORY
          </h2>
          <h1 className="title-font text-lg font-medium text-gray-900 mb-3">
            {file.title}
          </h1>
          <p className="leading-relaxed mb-3">
            Par <strong>{file.author}.</strong>
          </p>
          <div className="flex items-center flex-wrap ">
            <Link href={`/document/${file.slug}`} passHref>
              <div className="text-blue-500 inline-flex items-center md:mb-2 lg:mb-0 cursor-pointer">
                Voir plus
                <svg
                  className="w-4 h-4 ml-2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14"></path>
                  <path d="M12 5l7 7-7 7"></path>
                </svg>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

const ItemNomenclature = ({ nomenclature }) => {
  const cards = nomenclature.cards;
  let mainImage = "https://dummyimage.com/400x400";
  if (cards && cards.length > 0) {
    mainImage = cards[0].file.src;
  }
  return (
    <div className="p-4 md:w-1/3">
      <div className="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden">
        <div className="h-48 w-full relative">
          <Image
            className=""
            src={mainImage}
            alt="blog"
            layout="fill"
            objectFit="contain"
          />
        </div>

        <div className="p-6">
          <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">
            CATEGORY
          </h2>
          <h1 className="title-font text-lg font-medium text-gray-900 mb-3">
            {nomenclature.title}
          </h1>
          <p className="leading-relaxed mb-3">
            Par <strong>{nomenclature.author}.</strong>
          </p>
          <div className="flex items-center flex-wrap ">
            <Link href={`/document/${nomenclature.slug}`} passHref>
              <div className="text-blue-500 inline-flex items-center md:mb-2 lg:mb-0 cursor-pointer">
                Voir plus
                <svg
                  className="w-4 h-4 ml-2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14"></path>
                  <path d="M12 5l7 7-7 7"></path>
                </svg>
              </div>
            </Link>
            {/* <span className="text-gray-400 mr-3 inline-flex items-center lg:ml-auto md:ml-0 ml-auto leading-none text-sm pr-3 py-1 border-r-2 border-gray-200">
                        <svg
                          className="w-4 h-4 mr-1"
                          stroke="currentColor"
                          strokeWidth="2"
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          viewBox="0 0 24 24"
                        >
                          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                          <circle cx="12" cy="12" r="3"></circle>
                        </svg>
                        1.2K
                      </span> */}
            {/* <span className="text-gray-400 inline-flex items-center leading-none text-sm">
                        <svg
                          className="w-4 h-4 mr-1"
                          stroke="currentColor"
                          strokeWidth="2"
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          viewBox="0 0 24 24"
                        >
                          <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
                        </svg>
                        6
                      </span> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default function Home({ data }) {
  return (
    <section className="text-gray-600 body-font">
      <Head>
        <title>Montessori Ressources</title>
        <meta
          name="description"
          content="Espace de partage de nomenclatures Montessori gratuite et libre de droits."
        />
      </Head>
      <div className="h-96 relative">
        <Image
          src={banner}
          className="inline"
          objectFit="cover"
          layout="fill"
          alt=""
        />
      </div>
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-wrap -m-4">
          {data && data.map((doc, index) => <Item key={index} doc={doc} />)}
        </div>
      </div>
    </section>
  );
}
