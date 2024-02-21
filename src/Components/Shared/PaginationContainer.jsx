import React from "react";
import Pagination from "react-js-pagination";

const PaginationContainer = (props) => (
  <Pagination 
    innerClass="mb-0 pagination"
    itemClass="page-item"
    linkClass="page-link"
    pageRangeDisplayed={10}
    {...props}
    />
);

export default PaginationContainer;
