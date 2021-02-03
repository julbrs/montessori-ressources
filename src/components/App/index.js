import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Add from "../Add";
import Contact from "../Contact";
import DocumentPrint from "../DocumentPrint";
import Naviguation from "../Navigation";
import MainFooter from "../Footer";
import Info from "../Info";
import Home from "../Home";
import withTracker from "../../tools/withTracker";
import { withAuthentication } from "../Session";
import * as ROUTES from "../../constants/routes";

import "./App.scss";

const App = () => (
  /* Every component in our router has acess to AuthContext. 
    The provider takes a value prop that we bind with the initial value.
    Every time this value changes, all components that listen to our context will re-render */
  <Router>
    <Naviguation />
    {/* A <Switch> looks through its children <Route>s and
        renders the first one that matches the current URL. */}
    <main>
      <Switch>
        <Route
          path={`${ROUTES.DOCUMENT}/:documentId`}
          component={DocumentPrint}
        />
        <Route path={`${ROUTES.CATEGORY}/:category`} component={Home} />
        <Route path={ROUTES.ADD} component={withTracker(Add)} />
        <Route path={ROUTES.INFO} component={withTracker(Info)} />
        <Route path={ROUTES.CONTACT} component={Contact} />
        <Route path={ROUTES.LANDING} exact component={Home} />
      </Switch>
    </main>
    <MainFooter />
  </Router>
);

export default withAuthentication(App);
