import React, { useReducer, useState } from "react";
import { useDispatch } from "react-redux";
import { addToHistory, executeOnServer } from "../../state/repl/replSlice";
import "./CodeInput.css";
import ReactCodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import Data from "../../models/Data";


const CodeInput = () => {
  const dispatch = useDispatch();
  const [inputValue, setInputValue] = useState("");

  const dispatchAction = () => {
    if(inputValue == "") {
        return;
    }
    dispatch(executeOnServer(inputValue));
    var userInput = new Data(0, inputValue)
    dispatch(addToHistory(userInput));
    setInputValue("");
  };

  const handleKeyPress = (event) => {
    if (event.key == "Enter" && !event.shiftKey) {
      event.preventDefault();
      event.stopPropagation();
      dispatchAction();
    }
  };

  const onChange = (val, viewUpdate) => {
    setInputValue(val);
  };

  return (
    <div className="container">
      <span className="input-prefix">&gt;</span>
      {/* <input className="input" ref={inputRef} onKeyDown={handleKeyPress} /> */}
      <ReactCodeMirror
        className="input"
        extensions={[javascript({ jsx: true })]}
        aria-autocomplete="list"
        aria-multiline="false"
        autoFocus="false"
        onKeyDown={handleKeyPress}
        onKeyDownCapture={(event) => {
          if (event.key == "Enter" && !event.shiftKey) {
            event.preventDefault();
          }
        }}
        value={inputValue}
        onChange={onChange}
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
        style={{ outline: "none" }}
      ></ReactCodeMirror>
    </div>
  );
};

export default CodeInput;
