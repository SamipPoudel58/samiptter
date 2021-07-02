import React from "react";
import { Helmet } from "react-helmet";

const Head = ({ title, ogtitle, description, image, url, typeOfContent }) => {
  return (
    <Helmet>
      <html lang="en" />
      <title>{`${title} | Samiptter`}</title>

      <meta name="description" content={description} />
      <meta
        name="keyword"
        content="The ultimate social media site of your dreams | Let your social life take off!"
      ></meta>

      <meta property="og:title" content={ogtitle} />
      <meta property="og:type" content={typeOfContent} />
      <meta property="og:image" content={image} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
    </Helmet>
  );
};

Head.defaultProps = {
  title: "Samiptter | The Ultimate Social Media Site",
  ogtitle: "Samiptter | The Ultimate Social Media Site",
  description:
    "The ultimate social media site of your dreams | Let your social life take off!",
  image: "https://samiptter.herokuapp.com/images/open_graph.png",
  url: "https://samiptter.herokuapp.com",
  typeOfContent: "website",
};

export default Head;
