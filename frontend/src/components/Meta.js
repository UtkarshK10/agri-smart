import React from "react";
import { Helmet } from "react-helmet";

const Meta = ({ title, description, keywords }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keyword" content={keywords} />
    </Helmet>
  );
};

Meta.defaultProps = {
  title: "Welcome To AgriSmart",
  description: "Revolutionizing Agriculture with Technology",
  keywords:
    "Contract Farming, Machine Learning, Yield Prediction, Plant Disease Detection",
};

export default Meta;
