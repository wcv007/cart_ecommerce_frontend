import React from "react";
import "./Table.css";

const Table = ({ headings, children }) => {
  return (
    <table className="common_table">
      <thead>
        <tr>
          {headings.map((head, index) => (
            <th key={index}>{head}</th>
          ))}
        </tr>
      </thead>
      {children}
    </table>
  );
};

export default Table;
