import React from "react";

import banner from "./banner.jpg";
import { useParams } from "react-router-dom";
import Image from "react-bulma-components/lib/components/image";
import Columns from "react-bulma-components/lib/components/columns";
import Section from "react-bulma-components/lib/components/section";
import Heading from "react-bulma-components/lib/components/heading";
import Documents from "./documents";
import Categories from "./categories";
import withTracker from "tools/withTracker";

const Home = () => {
  let { category } = useParams();
  return (
    <>
      <Image
        src={banner}
        style={{ width: "100%", marginLeft: "auto", marginRight: "auto" }}
      />
      <Section>
        <Columns>
          <Columns.Column size={3}>
            <Heading size={6}>Catégories</Heading>
            <Categories />
          </Columns.Column>
          <Columns.Column>
            <Documents category={category} />
          </Columns.Column>
        </Columns>
      </Section>
    </>
  );
};

export default withTracker(Home);
