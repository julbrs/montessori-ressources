import React, { useEffect, useState } from "react";
import { List } from "react-bulma-components";
import { withFirebase } from "./Firebase";
import Category from "./Category";

const Categories = (props) => {
  const {
    parent,
    firebase: { db },
  } = props;
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    db.collection("categories")
      .where("parent_id", "==", parent)
      .orderBy("title")
      .get()
      .then((querySnapshot) => {
        setCategories(
          querySnapshot.docs.map((doc) => {
            let temp = doc.data();
            temp.id = doc.id;
            return temp;
          })
        );
      })
      .catch((error) => {
        console.error(error);
      });
  }, [db, parent]);

  if (categories && categories.length !== 0) {
    return (
      <List hoverable>
        {categories.map((category, idx) => (
          <Category key={idx} category={category} />
        ))}
      </List>
    );
  } else {
    return null;
  }
};

export default withFirebase(Categories);
