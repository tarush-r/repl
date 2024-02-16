import React from "react";
import "./HistoryItem.css";
import ReactCodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";

const HistoryItem = ({ dataObj}) => {
  // console.log('printing history item')
  let item = "hello";
  return (
    <div className="container">
      <span className="input-prefix">&lt;</span>

      <div style={{ display: "inline-block" }}>
        <ReactCodeMirror
          className="input"
          extensions={[javascript({ jsx: true })]}
          value={dataObj.value}
          readOnly="true"
          editable="false"
          basicSetup={{
            lineNumbers: false,
            highlightActiveLineGutter: false,
            drawSelection: false,
            highlightActiveLine: false,
            highlightSelectionMatches: false,
            rectangularSelection: false,
            foldGutter: false,
            gutters: [],
          }}
        ></ReactCodeMirror>
      </div>
    </div>
  );
};

export default HistoryItem;
