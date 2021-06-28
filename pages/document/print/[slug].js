import { useRouter } from "next/router";
import { admin } from "../../../utils/firebaseAdmin";

// This gets called on every request
export async function getStaticProps({ params }) {
  // Fetch data from firebase
  try {
    const doc = await admin
      .firestore()
      .collection("documents")
      .where("slug", "==", params.slug)
      .get();
    if (!doc || !doc.docs || !doc.docs.length > 0) {
      console.log("hello");
      return {
        notFound: true,
      };
    }
    const data = doc.docs[0];

    if (data.cards && data.cards.length > 0) {
      return {
        props: {
          type: data.type,
          author: data.author,
          cards: data.cards,
          title: data.title,
        },
        revalidate: 10,
      };
    } else {
      return {
        notFound: true,
      };
    }
  } catch (err) {
    return {
      notFound: true,
    };
  }
}

export async function getStaticPaths() {
  return {
    paths: [
      { params: { slug: "toto" } }, // See the "paths" section below
    ],
    // ask the backend if not in generated path
    fallback: true,
  };
}

export default function Document({ type, author, cards, title }) {
  const router = useRouter();
  const { slug } = router.query;
  let mainImage = "https://dummyimage.com/400x400";
  if (cards && cards.length > 0) {
    mainImage = cards[0].file.src;
  }

  return (
    <section className="text-gray-600 body-font overflow-hidden">
      <div className="container px-5 py-14 mx-auto">
        <div className="lg:w-4/5 mx-auto flex flex-wrap">
          <img
            alt="ecommerce"
            className="lg:w-1/2 w-full lg:h-auto h-64 object-contain object-center rounded"
            src={mainImage}
          />
          <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
            <h1 className="text-sm title-font text-gray-500 tracking-widest uppercase">
              {type}
            </h1>
            <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
              {title}
            </h1>
            <p className="leading-relaxed pb-5 border-b-2 border-gray-100 mb-4">
              Cette nomenclature, founie par <strong>{author}</strong> est à
              propos des <strong>{title}</strong>. Elle a été validée par notre
              équipe éducative, elle est utilisable dans un contexte Montessori.{" "}
              <br />
              Le bouton <strong>Télécharger</strong> ci-dessous permet de
              générer une version <strong>PDF</strong> du document au normes
              Montessori (l'image sera présentée dans la bonne taille avec les
              bons libellés à imprimer).
            </p>

            <div className="flex mt-6">
              <span className="title-font font-medium text-2xl text-gray-900">
                License
              </span>
              <button className="flex ml-auto text-white bg-blue-500 border-0 py-2 px-6 focus:outline-none hover:bg-blue-600 rounded">
                Télécharger
              </button>
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
            cards.map((card) => (
              <div className="xl:w-1/4 md:w-1/2 p-4">
                <div className="bg-gray-100 p-6 rounded-lg">
                  <img
                    className="h-96 rounded w-full object-contain object-center mb-6"
                    src={card.file.src}
                    alt={card.file.title}
                  />
                  <h2 className="text-lg text-gray-900 font-medium title-font mb-4">
                    {card.name}
                  </h2>
                </div>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
}
