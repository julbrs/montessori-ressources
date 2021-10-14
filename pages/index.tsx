import React from "react";

import firebase from "../lib/firebase";
import Image from "next/image";
import Head from "next/head";
import Link from "next/link";

import { Item } from "../components/document/item";

import banner from "../public/banner.jpg";

// This gets called on every build
export async function getStaticProps() {
  const docSnapshot = await firebase.collection("documents").where("validated", "==", true).get();

  const docs = docSnapshot.docs.map((doc) => {
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

  const catSnapshot = await firebase.collection("categories").get();

  const categories = catSnapshot.docs.map((doc) => {
    const { slug, title } = doc.data();
    return { slug, title };
  });

  if (!docs) {
    return {
      notFound: true,
    };
  }

  return {
    props: { docs, categories }, // will be passed to the page component as props
    revalidate: 60 * 5,
  };
}

export default function Home({ docs, categories }) {
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
        <Image src={banner} className="inline" objectFit="cover" layout="fill" alt="" />
      </div>
      <div className="container px-5 pt-24 mx-auto">
        <h2 className="text-gray-900 text-3xl title-font font-medium mb-1">Catégories</h2>
        <div className="flex flex-wrap mt-4">
          {categories &&
            categories.map((category, index) => (
              <Link href={`/category/${category.slug}`} passHref key={index}>
                <div className="cursor-pointer w-36 text-gray-600 text-xl text-center border-2 border-gray-200 border-opacity-60 rounded-lg m-2">
                  {category.title}
                </div>
              </Link>
            ))}
        </div>
      </div>
      <div className="container px-5 pt-24 mx-auto">
        <h2 className="text-gray-900 text-3xl title-font font-medium mb-1">Cartes</h2>
        <div className="flex flex-wrap">
          {docs && docs.map((doc, index) => <Item key={index} doc={doc} />)}
        </div>
      </div>
    </section>
  );
}
