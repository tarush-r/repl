import "./ExpandableComponent.css";
import React, { useState } from "react";

const ExpandableComponent = ({ object }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const renderObject = (obj) => {
    return Object.keys(obj).map((key) => (
      <div key={key} style={{ display: "flex" }}>
        <div className="keys">{key}: </div>
        {typeof obj[key] === "object" ? (
          <ExpandableComponent object={obj[key]} />
        ) : typeof obj[key] === "string" ? (
          <div className="vals">"{obj[key]}"</div>
        ) : (
          <>
            <div className="vals">{obj[key]}</div>
          </>
        )}
      </div>
    ));
  };

  return (
    <div style={{ marginLeft: 0, whiteSpace: "pre-wrap" }}>
      <div
        style={{ display: "flex", alignItems: "center", cursor: "pointer" }}
        onClick={handleToggle}
      >
        <span className="type" style={{ marginLeft: 5 }}>
          {Array.isArray(object) ? "Array" : "Object"}
        </span>
        <span className="arrows">{isOpen ? "▼" : "►"}</span>
      </div>
      {isOpen && <div style={{ marginLeft: 20 }}>{renderObject(object)}</div>}
    </div>
  );

//   return (
//     // <div className="container">
//       <JSONTree
//         data={object}
//         theme={{
//           base00: "white",
//         }}
//       />
//     // </div>
//   );
};

export default ExpandableComponent;
