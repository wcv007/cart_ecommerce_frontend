import React from "react";
import "./ProductsSidebar.css";
import LinkWithIcon from "../Navbar/LinkWithIcon";
import useData from "../hooks/useData";
import backendURL from "../../utils/config";

const ProductsSidebar = () => {
  const { data: category, error } = useData("/category");

  return (
    <section className="sidebar">
      <div className="category align_center">
        <h3 className="category_head">Category</h3>
      </div>
      {category &&
        category?.length >= 0 &&
        category?.map((cat, index) => (
          <div className="category_text_wrapper" key={index}>
            <LinkWithIcon
              key={cat._id}
              title={cat.name}
              icon={`${backendURL}/category/${cat.image}`}
              link={`/products?category=${cat.name}`}
              sidebar
            ></LinkWithIcon>
          </div>
        ))}
      {error && <em className="form_error">{error}</em>}
    </section>
  );
};

export default ProductsSidebar;
