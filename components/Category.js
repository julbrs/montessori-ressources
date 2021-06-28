// import * as ROUTES from "../../constants/routes";
// import { Link } from "react-router-dom";
import Link from "next/link";

import { List } from "react-bulma-components";
import { withFirebase } from "./Firebase";
import Categories from "./Categories";

const Category = (props) => {
  const { category } = props;

  return (
    <List.Item
      renderAs={Link}
      href={`category/${category.id}/${category.slug}`}
    >
      {category.title}
      <Categories parent={category.id} />
    </List.Item>
  );
};

export default withFirebase(Category);
