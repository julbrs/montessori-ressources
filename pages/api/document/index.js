import firebase from "../../../lib/firebase";

export async function getData() {
  const snapshot = await firebase
    .collection("documents")
    .where("validated", "==", true)
    .get();

  const data = snapshot.docs.map((doc) => {
    const docData = doc.data();
    return {
      type: docData.type,
      author: docData.author,
      title: docData.title,
      slug: docData.slug,
    };
  });

  return data;
}

export default async (req, res) => {
  const myData = await getData();
  res.json(myData);
};

// export default async (req, res) => {
//   const snapshot = await firebase
//     .collection("documents")
//     .where("validated", "==", true)
//     .get();

//   res.json(
//     snapshot.docs.map((doc) => {
//       const docData = doc.data();
//       return {
//         type: docData.type,
//         author: docData.author,
//         title: docData.title,
//         slug: docData.slug,
//       };
//     })
//   );
// };
