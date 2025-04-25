import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const ProductCardSkeleton = ({ width, className }) => {
  return <Skeleton className={className} width={width} />;
};

export default ProductCardSkeleton;
