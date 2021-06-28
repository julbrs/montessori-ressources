import Head from "next/head";

import img from "../public/about.jpg";

import Image from "next/image";

export default function Info() {
  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-14 mx-auto flex flex-col">
        <div className="lg:w-4/6 mx-auto">
          <div className="flex flex-col sm:flex-row">
            <div className="sm:w-2/3 sm:pl-8 sm:py-8 pt-4 sm:mt-0 text-center sm:text-left">
              <p className=" text-xl font-bold mb-4">
                Bienvenue sur la plateforme de ressources Montessori !
              </p>
              <p className="leading-relaxed text-lg mb-4">
                Les nomenclatures sont des outils essentiels pour accompagner
                les enfants dans leur développement. L’enfant s’épanouit et avec
                ses yeux vifs découvre les mystères de la vie. Grâce à ce
                support, nous enrichissons le vocabulaire de l’enfant. Plus
                celui-ci grandit plus ce support se rélève un allié dans
                l’apprentissage de la lecture et dans le développement de la
                logique.
              </p>
            </div>
          </div>
          <div className="rounded-lg overflow-hidden">
            <Image
              src={img}
              className="object-cover object-center h-full w-full"
              alt=""
            />
          </div>
        </div>
      </div>
    </section>
  );
}
