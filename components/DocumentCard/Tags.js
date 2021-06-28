import React from "react";

const Tag = (props) => {
  return <span className="tag">{props.name}</span>;
};

const Tags = (props) => {
  const { tags } = props;
  if (tags === undefined) {
    return null;
  }
  return (
    <div className="tags">
      {tags.map((tag) => {
        return <Tag key={tag.id} id={tag.id} name={tag.name} />;
      })}
    </div>
  );
};

export default Tags;
