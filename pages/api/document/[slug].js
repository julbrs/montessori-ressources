import firebase from "../../../lib/firebase";

export default (req, res) => {
  firebase
    .collection("documents")
    .where("slug", "==", req.query.slug)
    .get()
    .then((docs) => {
      if (!docs.docs || !docs.docs.length > 0) {
        res.status(404).json({ message: "Not Found" });
      } else {
      }
      res.json(docs.docs[0].data());
    })
    .catch((error) => {
      res.json({ error });
    });
};
