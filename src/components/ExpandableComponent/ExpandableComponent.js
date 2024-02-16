// import React from "react";
import "./ExpandableComponent.css";
import React, { useState } from "react";
// import { JSONTree } from "react-json-tree";
import ReactCodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";

const ExpandableComponent = ({ object }) => {
  console.log("inside expandable obje ", object);
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const renderObject = (obj) => {
    console.log("Trying to render");
    return Object.keys(obj).map((key) => (
      <div key={key} style={{ display: "flex" }}>
        <pre style={{ whiteSpace: "pre-wrap" }}>{key}: </pre>
        {typeof obj[key] === "object" ? (
          <ExpandableComponent object={obj[key]} />
        ) : (
          <pre style={{ whiteSpace: "pre-wrap" }}>{obj[key]}</pre>
        )}
      </div>
    ));
  };

  return (
    <pre style={{ marginLeft: 0, whiteSpace: "pre-wrap" }}>
      <div
        style={{ display: "flex", alignItems: "center", cursor: "pointer" }}
        onClick={handleToggle}
      >
        <span style={{ marginLeft: 5 }}>Object</span>
        <span>{isOpen ? "▼" : "►"}</span>
      </div>
      {isOpen && <div style={{ marginLeft: 20 }}>{renderObject(object)}</div>}
    </pre>
  );
};

export default ExpandableComponent;
