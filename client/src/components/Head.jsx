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
        content="Samiptter social media twitter clone react node mongodb Samip Poudel open source"
      ></meta>

      <meta property="og:title" content={`${title} | Samiptter`} />
      <meta property="og:type" content="website" />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />

      <meta property="og:image" content={image} />
      <meta property="og:image:secure_url" content={image} />

      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:image" content={image} />
      <meta property="twitter:site" content="@samip4sure" />
      <meta property="twitter:creator" content="@samip4sure" />
    </Helmet>
  );
};

Head.defaultProps = {
  title: "Samiptter | The Ultimate Social Media Site",
  ogtitle: "Samiptter | The Ultimate Social Media Site",
  description:
    "The ultimate social media site of your dreams | Let your social life take off!",
  image:
    "https://res.cloudinary.com/samip58/image/upload/v1642145313/samip/samiptter_1_yndgxz.png",
  url: "https://samiptter.herokuapp.com",
  typeOfContent: "website",
};

export default Head;
