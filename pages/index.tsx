import React from "react";

import firebase from "../lib/firebase";
import Image from "next/image";
import Head from "next/head";
import Link from "next/link";

import { Item } from "../components/document/item";

import banner from "../public/banner.jpg";
import { useState } from "react";

// This gets called on every build
export async function getStaticProps() {
  const docSnapshot = await firebase
    .collection("documents")
    .where("validated", "==", true)
    .where("slug", "!=", null)
    .get();

  const docs = docSnapshot.docs.map((doc) => {
    let { category_id, type, author, title, slug, cards } = doc.data();
    if (cards === undefined) cards = null;
    return {
      category_id,
      type,
      author,
      title,
      slug,
      cards,
    };
  });

  const catSnapshot = await firebase.collection("categories").get();

  const categories = catSnapshot.docs.map((doc) => {
    const { slug, title, parent_id } = doc.data();
    const id = doc.id;
    return { id, slug, title, parent_id };
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

const Category = ({ category, setSelectedCategory, isSelected }) => {
  const onClick = () => {
    if (isSelected) {
      setSelectedCategory(null);
    } else {
      setSelectedCategory(category);
    }
  };
  return (
    <div
      onClick={onClick}
      className="cursor-pointer w-36 text-gray-600 text-xl text-center border-2 border-gray-200 border-opacity-60 rounded-lg m-2"
    >
      <span
        className={`transition ${isSelected ? "font-bold" : "border-gray-300"}`}
      >
        {category.title}
      </span>
    </div>
  );
};

export default function Home({ docs, categories }) {
  const [selectedFirstCategory, setSelectedFirstCategory] = useState(null);
  const [selectedSecondCategory, setSelectedSecondCategory] = useState(null);

  const isDocFirstCategoryOrChildCategory = (doc) => {
    const category_id = doc.category_id;
    if (!selectedFirstCategory) {
      return false;
    }
    if (category_id === selectedFirstCategory.id) {
      return true;
    }
    const childCategories = categories.filter(
      (cat) => cat.parent_id === selectedFirstCategory.id
    );
    if (childCategories.some((cat) => cat.id === category_id)) {
      return true;
    }
    return false;
  };

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
      <div className="container px-5 pt-24 mx-auto">
        <h2 className="text-gray-900 text-3xl title-font font-medium mb-1">
          Catégories
        </h2>
        {/* first level */}
        <div className="flex flex-wrap mt-4">
          {categories &&
            categories
              .filter((cat) => cat.parent_id == null)
              .map((category, index) => (
                <Category
                  category={category}
                  setSelectedCategory={(cat) => {
                    setSelectedFirstCategory(cat);
                    setSelectedSecondCategory(null);
                  }}
                  key={index}
                  isSelected={selectedFirstCategory === category}
                />
              ))}
        </div>
        {/* second level */}
        {selectedFirstCategory && (
          <div className="flex flex-wrap mt-4">
            {categories &&
              categories
                .filter((cat) => cat.parent_id == selectedFirstCategory.id)
                .map((category, index) => (
                  <Category
                    category={category}
                    setSelectedCategory={setSelectedSecondCategory}
                    key={index}
                    isSelected={selectedSecondCategory === category}
                  />
                ))}
          </div>
        )}
      </div>
      <div className="container px-5 pt-24 mx-auto">
        <h2 className="text-gray-900 text-3xl title-font font-medium mb-1">
          Cartes
        </h2>
        <div className="flex flex-wrap">
          {docs &&
            docs
              .filter(
                (doc) =>
                  // no filter if no selected first category
                  !selectedFirstCategory ||
                  // or filter on first selected cat
                  (!selectedSecondCategory &&
                    isDocFirstCategoryOrChildCategory(doc)) ||
                  // or filter on second selected cat
                  doc.category_id === selectedSecondCategory?.id
              )
              .map((doc, index) => <Item key={index} doc={doc} />)}
        </div>
      </div>
    </section>
  );
}
