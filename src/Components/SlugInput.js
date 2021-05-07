import React, { useEffect, useState } from "react";
import { gql, useQuery } from "@apollo/client";

const GET_ALL_LINKS = gql`
  query link($slug: String!) {
    link(slug: $slug) {
      id
    }
  }
`;

const SlugInput = () => {
  const [slug, setSlug] = useState("");
  const [slugTaken, setSlugTaken] = useState(false);
  const { loading, error, data, refetch } = useQuery(GET_ALL_LINKS, {
    variables: { slug: slug }
  });
  useEffect(() => {}, []);
  useEffect(() => {
    if (data && data.link) {
      setSlugTaken(true);
    } else {
      setSlugTaken(false);
    }
  }, [data]);

  useEffect(() => {
    if (slug.length >= 4) {
      refetch();
    }
  }, [slug]);
  return (
    <div>
      <input
        style={{ width: "200px" }}
        type="text"
        onChange={(e) => setSlug(e.target.value)}
      />
      <button
        className={`
            ${data && data.link ? "bg-red-400" : ""}
            ${slug.length < 4 ? "bg-gray-400" : ""}
          `}
      >
        {data && data.link && "Slug Taken"}
        {(!data || !data.link) && "Submit"}
      </button>
      {slugTaken && <div className="text-red-400">Slug Taken</div>}
    </div>
  );
};

export default SlugInput;
