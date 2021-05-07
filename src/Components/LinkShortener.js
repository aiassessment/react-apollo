import React, { useEffect, useState } from "react";
import SlugInput from "./SlugInput";
import UrlInput from "./UrlInput";
import { gql, useQuery, useMutation } from "@apollo/client";

const GET_LINK_BY_SLUG = gql`
  query link($slug: String!) {
    link(slug: $slug) {
      id
    }
  }
`;
const CREATE_LINK = gql`
  mutation createLink($url: String!, $slug: String) {
    createLink(url: $url, slug: $slug) {
      url
      slug
    }
  }
`;

const LinkShortener = () => {
  const [slug, setSlug] = useState("");
  const [url, setUrl] = useState("");
  const [slugTaken, setSlugTaken] = useState(false);
  const [submitAvailable, setSubmitAvailable] = useState(false);
  const [addLink, { data: newData }] = useMutation(CREATE_LINK);
  const [justSubmitted, setJustSubmitted] = useState(false);
  const { loading, error, data, refetch } = useQuery(GET_LINK_BY_SLUG, {
    variables: { slug: slug }
  });
  const [allLinks, setAllLinks] = useState([]);

  const submitLink = () => {
    setJustSubmitted(true);
    addLink({ variables: { url: url, slug: slug } });
  };
  useEffect(() => {
    if (newData && newData.createLink) {
      console.log(newData.createLink.url);
      const newLink = {
        originalUrl: newData.createLink.url,
        newUrl: "fake.shorteners/" + newData.createLink.slug
      };
      let arr = [...allLinks];
      if (arr.filter((a) => a.newUrl == newLink.newUrl).length == 0) {
        arr.push(newLink);
        setAllLinks(arr);
      }
    }
  }, [newData]);

  useEffect(() => {
    if (data && data.link) {
      setSlugTaken(true);
      setSubmitAvailable(false);
    } else {
      setSlugTaken(false);
    }
  }, [data]);

  useEffect(() => {
    if ((slug.length > 0 && slug.length < 4) || justSubmitted) {
      setSubmitAvailable(false);
    } else if (!submitAvailable && !slugTaken && !loading) {
      setSubmitAvailable(true);
    }
  }, [slug, slugTaken, loading]);

  useEffect(() => {
    if (slug.length >= 4) {
      refetch();
    }
    if (justSubmitted) {
      setJustSubmitted(false);
    }
  }, [slug]);

  const copyToClipboard = (txt) => {
    const el = document.createElement("textarea");
    el.value = txt;
    document.body.appendChild(el);
    el.select();
    document.execCommand("copy");
    document.body.removeChild(el);
  };

  return (
    <div>
      <div className="bg-blue-400 p-2 mx-auto flex flex-wrap justify-center">
        <UrlInput url={url} setUrl={setUrl} />
        <SlugInput setSlug={setSlug} slug={slug} data={data} />
        <button
          onClick={submitLink}
          className={`hover:bg-blue-500 text-white font-bold px-4 rounded
            ${!submitAvailable ? "bg-gray-400" : "bg-blue-600"}
          `}
        >
          Shorten URL
        </button>
      </div>
      {(slugTaken || (slug.length > 0 && slug.length < 4)) && (
        <div className="text-red-400">
          {slugTaken && "Slug Taken"}
          {slug.length > 0 &&
            slug.length < 4 &&
            "Slug must be at least 5 characters"}
        </div>
      )}
      {allLinks.map((l) => (
        <div key={l.slug}>
          <span>{l.originalUrl} -></span> <input value={l.newUrl} />{" "}
          <button onClick={() => copyToClipboard(l.newUrl)}>COPY</button>
        </div>
      ))}
    </div>
  );
};

export default LinkShortener;
