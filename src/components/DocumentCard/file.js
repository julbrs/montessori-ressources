import React from "react";
import { Link } from "react-router-dom";

import Button from "react-bulma-components/lib/components/button";
import Columns from "react-bulma-components/lib/components/columns";
import Box from "react-bulma-components/lib/components/box";
import Heading from "react-bulma-components/lib/components/heading";
import Tags from "./tags";
import { AiFillFilePdf } from "react-icons/ai";
import * as ROUTES from "../../constants/routes";

const FileCard = (props) => {
  const { document } = props;
  return (
    <Columns.Column size="half" tablet={{ size: 12 }} desktop={{ size: 6 }}>
      <Box>
        <Columns breakpoint="tablet">
          <Columns.Column>
            <AiFillFilePdf size="10em" />
            <Button renderAs={Link} to={`${ROUTES.DOCUMENT}/${document.id}`}>
              Télécharger
            </Button>
          </Columns.Column>
          <Columns.Column>
            <Heading size={3}>{document.title}</Heading>
            <p>
              <small>
                Par <strong>{document.author}</strong>
              </small>
            </p>
            <Tags tags={document.tags} />
            <hr />
          </Columns.Column>
        </Columns>
      </Box>
    </Columns.Column>
  );
};
export default FileCard;
