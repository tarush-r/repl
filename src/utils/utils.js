import Data from "../models/Data";

const getKey = (data, key) => {
  var keyType = data[key]["type"];
  var keyValue = data[key]["value"];
  if (keyType == "string") {
    return keyValue;
  } else if (keyType == "number") {
    return keyValue;
  }
  return keyValue;
};

const convertToObj = (data, key, seen) => {
  let curr;
  var node = data[key];
  var nodeType = node["type"];
  var nodeVal = node["value"];

  if (nodeType == "object") {
    curr = {};
  }
  if (nodeType == "array") {
    curr = [];
  }
  if (seen[key]) {
    return seen[key];
  }
  seen[key] = curr;

  if (nodeType != "object" && nodeType != "array") {
    return nodeVal;
  }
  if (nodeType == "object") {
    nodeVal.forEach((item) => {
      var k = item["key"];
      var v = item["value"];
      var kVal = getKey(data, k);

      curr[kVal] = convertToObj(data, v, seen);
    });
  }
  if (nodeType == "array") {
    nodeVal.forEach((item) => {
      curr.push(convertToObj(data, item, seen));
    });
  }
  return curr;
};

const parseResponse = (serialized) => {
  let original = serialized;
  serialized = serialized.serialized;

  const rootKey = original.root;

  if (serialized[rootKey]["type"] == "error") {
    var errorData = serialized[rootKey]["value"];
    var dataValue = `${errorData["name"]} : ${errorData["message"]}`;
    var dataObj = new Data(0, dataValue);
    return dataObj;
  }

  var res = convertToObj(serialized, rootKey, {});
  if (typeof res == null) {
    res = "null";
    var dataObj = new Data(0, res);
    return dataObj;
  }
  if (typeof res != "object") {
    res = res + "";
    var dataObj = new Data(0, res);
    return dataObj;
  }
  var dataObj = new Data(1, res);
  dataObj.value = dataObj.value;
  return dataObj;
};

export default parseResponse;
