import React, { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "react-bulma-components/lib/components/navbar";
import * as ROUTES from "../../constants/routes";
import { AuthUserContext } from "../Session";
import { AiFillFacebook, AiFillGoogleCircle } from "react-icons/ai";
import { withFirebase } from "components/Firebase";

const Naviguation = (props) => {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <Navbar color="primary" fixed="top" active={open} transparent={false}>
      <Navbar.Brand>
        <Navbar.Item renderAs={Link} to={ROUTES.LANDING} arrowless>
          <span role="img" aria-label="book">
            📖
          </span>{" "}
          Montessori Ressources
        </Navbar.Item>
        <Navbar.Burger active={open.toString()} onClick={handleClick} />
      </Navbar.Brand>
      <AuthUserContext.Consumer>
        {(authUser) =>
          authUser ? (
            <NavigationAuth firebase={props.firebase} user={authUser} />
          ) : (
            <NavigationNonAuth firebase={props.firebase} />
          )
        }
      </AuthUserContext.Consumer>
    </Navbar>
  );
};

const NavigationAuth = (props) => {
  // when you logout clean the token
  const logout = () => {
    props.firebase.doSignOut();
  };

  return (
    <Navbar.Menu>
      <Navbar.Container>
        <Navbar.Item renderAs={Link} to={ROUTES.LANDING}>
          Documents
        </Navbar.Item>
        <Navbar.Item renderAs={Link} to={ROUTES.ADD}>
          Créer
        </Navbar.Item>
        <Navbar.Item renderAs={Link} to={ROUTES.INFO}>
          À propos
        </Navbar.Item>
        <Navbar.Item renderAs={Link} to={ROUTES.CONTACT}>
          Nous contacter
        </Navbar.Item>
      </Navbar.Container>

      <Navbar.Container position="end">
        <Navbar.Item onClick={logout}>
          Logout ({props.user.displayName})
        </Navbar.Item>
      </Navbar.Container>
    </Navbar.Menu>
  );
};

const NavigationNonAuth = (props) => {
  const googleLogin = () => {
    props.firebase.signInWithGoogle();
  };

  const facebookLogin = () => {
    props.firebase.signInWithFacebook();
  };

  return (
    <Navbar.Menu>
      <Navbar.Container>
        <Navbar.Item renderAs={Link} to={ROUTES.LANDING}>
          Documents
        </Navbar.Item>
        <Navbar.Item renderAs={Link} to={ROUTES.INFO}>
          À propos
        </Navbar.Item>
        <Navbar.Item renderAs={Link} to={ROUTES.CONTACT}>
          Nous contacter
        </Navbar.Item>
      </Navbar.Container>

      <Navbar.Container position="end">
        <Navbar.Item onClick={facebookLogin}>
          <AiFillFacebook size="2em" />
        </Navbar.Item>

        <Navbar.Item onClick={googleLogin}>
          <AiFillGoogleCircle size="2em" />
        </Navbar.Item>
      </Navbar.Container>
    </Navbar.Menu>
  );
};

export default withFirebase(Naviguation);
