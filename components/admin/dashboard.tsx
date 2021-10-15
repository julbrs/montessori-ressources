import * as React from "react";

import { CategoryList, CategoryShow, CategoryCreate, CategoryEdit } from "./categories";

import { DocumentList, DocumentShow, DocumentCreate, DocumentEdit } from "./documents";
import { Admin, Resource } from "react-admin";
import { FirebaseDataProvider, FirebaseAuthProvider } from "react-admin-firebase";
import CategoryIcon from "@material-ui/icons/Category";
import DescriptionIcon from "@material-ui/icons/Description";
import Auth from "../auth";
import AdminLayout from "./layout";
import firebase from "../../firebase/clientApp";

const options = {
  logging: false,
  app: firebase,
  rootRef: "",
};
const dataProvider = FirebaseDataProvider({}, options);
const authProvider = FirebaseAuthProvider({}, options);

class Dashboard extends React.Component {
  render() {
    return (
      <Admin layout={AdminLayout} loginPage={Auth} dataProvider={dataProvider} authProvider={authProvider}>
        <Resource
          name="documents"
          icon={DescriptionIcon}
          list={DocumentList}
          show={DocumentShow}
          create={DocumentCreate}
          edit={DocumentEdit}
        />
        <Resource
          name="categories"
          icon={CategoryIcon}
          list={CategoryList}
          show={CategoryShow}
          create={CategoryCreate}
          edit={CategoryEdit}
        />
      </Admin>
    );
  }
}

export default Dashboard;
