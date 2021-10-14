import Head from "next/head";

import AddNomenclature from "../components/add/nomenclature";
import AddFile from "../components/add/file";

export default function Add() {
  return (
    <section className="text-gray-600 body-font relative">
      <Head>
        <title>Ajouter - Montessori Ressources</title>
        <meta
          name="description"
          content="Espace de partage de nomenclatures Montessori gratuite et libre de droits."
        />
      </Head>
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-col text-center w-full mb-12">
          <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">Aidez nous !</h1>
          <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
            Vous pouvez participer à ce projet en fournissant vos propres documents à ce projet! Utilisez
            simplement l&apos;un des formulaires ci-dessous pour déposer vos <strong>images</strong> pour
            nomenclatures, ou fichiers <strong>pdf</strong>. Notre équipe se chargera de valider le contenu
            avant de le proposer sur notre outil. Votre nom sera crédité sur le document.
          </p>
        </div>
        <AddNomenclature />
        <AddFile />
      </div>
    </section>
  );
}
