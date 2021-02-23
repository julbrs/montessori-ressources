import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import * as ROUTES from "../../constants/routes";
import List from "react-bulma-components/lib/components/list";
import { withFirebase } from "components/Firebase";

const Categories = (props) => {
  const {
    firebase: { db },
  } = props;
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    db.collection("categories")
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
  }, [db]);

  return (
    <List hoverable>
      {categories.map((category, idx) => (
        <Category key={idx} category={category} />
      ))}
    </List>
  );
};

const Category = (props) => {
  const { category } = props;

  return (
    <List.Item
      renderAs={Link}
      to={`${ROUTES.CATEGORY}/${category.id}/${category.slug}`}
    >
      {category.title}
    </List.Item>
  );
};

export default withFirebase(Categories);
