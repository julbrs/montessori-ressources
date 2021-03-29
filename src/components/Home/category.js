import * as ROUTES from "../../constants/routes";
import { Link } from "react-router-dom";

import List from "react-bulma-components/lib/components/list";
import { withFirebase } from "components/Firebase";
import Categories from "./categories";

const Category = (props) => {
  const { category } = props;

  return (
    <List.Item
      renderAs={Link}
      to={`${ROUTES.CATEGORY}/${category.id}/${category.slug}`}
    >
      {category.title}
      <Categories parent={category.id} />
    </List.Item>
  );
};

export default withFirebase(Category);
