import React from "react";
import { useSelector } from "react-redux";
import HistoryItem from "../HistoryItem/HistoryItem";
import ExpandableComponent from "../ExpandableComponent/ExpandableComponent";
import { parse } from "flatted";

function History() {
  const historyList = useSelector((state) => state.repl.history);
  return (
    <>
      {historyList.map((dataObj, index) => {
        {
          if (dataObj.type == 0) {
            return <HistoryItem key={index} dataObj={dataObj} />;
          } else {
            return (
              <div className="container" key={index}>
                <span className="input-prefix">&lt;</span>
                <ExpandableComponent object={dataObj.value} />
              </div>
            );
          }
        }
      })}
    </>
  );
}

export default History;
