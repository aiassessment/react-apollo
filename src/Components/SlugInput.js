import React from "react";
const SlugInput = (props) => {
  return (
    <div>
      <input
        className="p-2 m-1"
        type="text"
        onChange={(e) => props.setSlug(e.target.value)}
        placeholder="Custom slug"
        value={props.slug}
      />
    </div>
  );
};

export default SlugInput;
