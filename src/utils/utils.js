import Data from "../models/Data";
import { stringify } from "flatted";

const getKey = (data, key) => {
  console.log("getting key for ", key);
  var keyType = data[key]["type"];
  var keyValue = data[key]["value"];
  if (keyType == "string") {
    console.log("returned ", keyValue);
    return keyValue;
  } else if (keyType == "Number") {
    return keyValue;
  }
  return keyValue;
};

const convertToObj = (data, key, seen) => {
  let curr = {};
  //   if (seen[key]) {
  //     return seen[key];
  //   }
  var node = data[key];
  var nodeType = node["type"];
  var nodeVal = node["value"];

  if (seen[key]) {
    return seen[key];
  }
  seen[key] = curr;

  console.log(nodeType, " ", nodeVal);
  if (nodeType != "object" && nodeType != "array") {
    // var kVal,
    //     kType = getKey(data[k]);
    return nodeVal;
  }
  if (nodeType == "object") {
    // var temp = {}
    nodeVal.forEach((item) => {
      var k = item["key"];
      var v = item["value"];
      var kVal = getKey(data, k);
      console.log("printing; ", kVal);
      curr[kVal] = convertToObj(data, v, seen);
      //   curr.push(convertToObj(data, item, seen, curr));
    });
    // for (let [k, v] of nodeVal.entries()) {
    //   var kVal,
    //     kType = getKey(data[k]);
    //     console.log(kVal, ' for node with key ', key);
    //   curr[kVal] = convertToObj(data, v, seen, curr);
    // }
    console.log(curr);
  }
  if (nodeType == "array") {
    // var temp = {}
    curr = [];
    nodeVal.forEach((item) => {
      curr.push(convertToObj(data, item, seen));
    });
  }
  //   seen[key] = curr;
  return curr;
};

const parseResponse = (serialized) => {
  console.log("here ", serialized);
  const objMap = {};
  let original = serialized;
  serialized = serialized.serialized;
  console.log("here ", serialized);

  const rootKey = original.root;
  console.log("root key ", rootKey);

  if (serialized[rootKey]["type"] == "error") {
    var errorData = serialized[rootKey]["value"];
    // console.log
    var dataValue = `${errorData["name"]} : ${errorData["message"]}`;
    var dataObj = new Data(0, dataValue);
    return stringify(dataObj);
  }

  var res = convertToObj(serialized, rootKey, {});
  console.log("response ", typeof res, ' ', res);
  if (typeof res == null) {
    res = "null";
    var dataObj = new Data(0, res);
    return dataObj;
  }
  if (typeof res != "object") {
    // console.log("response not obj: ", res.toString())
    res = res + "";
    var dataObj = new Data(0, res);
    return dataObj;
  }
  var dataObj = new Data(1, res);
  //   console.log("response ", dataObj);
  dataObj.value = dataObj.value;
  return dataObj;
};

export default parseResponse;
