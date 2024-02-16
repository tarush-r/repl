import React from "react";
import { useSelector } from "react-redux";
import HistoryItem from "../HistoryItem/HistoryItem";
import ExpandableComponent from "../ExpandableComponent/ExpandableComponent";
import { parse } from "flatted";

function History() {
  const historyList = useSelector((state) => state.repl.history);
  console.log("entire history here ", historyList);
  return (
    <>
      {historyList.map((dataObj, index) => {
        {
          console.log(dataObj.type == 1);
          if (dataObj.type == 0) {
            return <HistoryItem key={index} dataObj={dataObj} />;
            // return (<UserInput value={dataObj.value}/>);
          } else {
            return (
              <div className="container">
                <span className="input-prefix">&lt;</span>
                <ExpandableComponent key={index} object={dataObj.value} />
              </div>
            );
          }
          //   else if (dataObj.type == 1) {
          //     return (
          //       <>
          //         <ExpandableObject key={index} object={dataObj} />
          //       </>
          //     );
          //   } else {
          //     return <HistoryItem key={index} item={dataObj}/>;
          //   }
          //   if (dataObj.type == 0) {
          //     return (
          //       // <ExpandableObject key={index} object={dataObj.value} />
          //       <HistoryItem key={index} item={dataObj.value} index={index} />
          //     );
          //     // return (<UserInput value={dataObj.value}/>);
          //   } else if (dataObj.type == 1) {
          //     return (
          //       <>
          //         <ExpandableObject key={index} object={dataObj.value} />
          //       </>
          //     );
          //   } else {
          //     return (
          //       <HistoryItem key={index} item={dataObj.value} index={index} />
          //     );
          //     // return (<Error/>);
          //   }

          // return typeof item == "object" ? (
          //   <ExpandableObject object={item.rawData} />
          // ) : (
          //   // <ObjectComponent key={index} obj={item} />
          //   <HistoryItem key={index} item={item} index={index} />
          // );
        }
      })}
    </>
  );

  // console.log("list here", historyList);
  // return (
  //   <>
  //     {historyList.map((item, index) => {
  //       {
  //         // item = typeof item == "object"  || typeof item == "Array" ? parse(item) : item;
  //         console.log('before logging here ', typeof item, ' ', item, 'end')
  //         // item = parse(item);
  //         console.log('logging here ', typeof item, ' ', item, 'end')
  //         return typeof item == "object" ? (
  //           <ExpandableObject object={item.rawData} />
  //         ) : (
  //           // <ObjectComponent key={index} obj={item} />
  //           <HistoryItem key={index} item={item} index={index} />
  //         );
  //       }
  //     })}
  //   </>
  // );
}

export default History;
