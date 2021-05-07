import React from "react";

const UrlInput = (props) => {
  return (
    <input
      className="p-2 m-1"
      style={{ width: "300px" }}
      onChange={(e) => props.setUrl(e.target.value)}
      placeholder="Make your links shorter"
      value={props.url}
    />
  );
};

export default UrlInput;
