import Data from "../models/Data";

const getKey = (data, key) => {
    console.log("getting key for ", key)
  var keyType = data[key]["type"];
  var keyValue = data[key]["value"];
  if (keyType == "string") {
    console.log("returned ", keyValue)
    return keyValue
  } else if (keyType == "Number") {
    return keyValue;
  }
  return keyValue;
};

const convertToObj = (data, key, seen, curr) => {
  curr = {};
  //   if (seen[key]) {
  //     return seen[key];
  //   }
  var node = data[key];
  var nodeType = node["type"];
  var nodeVal = node["value"];

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
      var kVal= getKey(data, k);
        console.log("printing; ", kVal);
      curr[kVal] = convertToObj(data, v, seen, curr);
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
      curr.push(convertToObj(data, item, seen, curr));
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
    var errorData = serialized[rootKey]["value"]
    // console.log
    var dataValue = `${errorData['name']} : ${errorData['message']}`
    var dataObj = new Data(0, dataValue)
    return dataObj
}

  var res = convertToObj(serialized, rootKey, {}, {});
//   console.log("response ", res);
  var dataObj = new Data(1, res)
  console.log("response ", dataObj);
  return dataObj;
};

// function parseResponse(serialized) {
//     const objMap = {};

//     function deserializeNode(key) {
//       if (objMap[key]) {
//         return objMap[key];
//       }

//       const node = serialized[key];
//       let obj = {};

//       if (node.type === "object") {
//         node.value.forEach(({ key, value }) => {
//           obj[key] = deserializeNode(value);
//         });
//       } else if (node.type === "array") {
//         obj.length = node.value.length;
//         node.value.forEach(({ value }, index) => {
//           obj[index] = deserializeNode(value);
//         });
//       } else {
//         obj = node.value;
//       }

//       objMap[key] = obj;
//       return obj;
//     }

//     const rootKey = serialized.root;
//     serialized = serialized.serialized;
//     let res = deserializeNode(rootKey);
//     console.log('res ', res)
// }

// const parseResponse = (serialized) => {
//   console.log("here ", serialized);
//   const objMap = {};
//   let original = serialized;
//   serialized = serialized.serialized;
//   console.log("here ", serialized);

//   function deserializeNode(key) {
//     console.log("resolving for key ", key);

//     if (objMap[key]) {
//       return objMap[key];
//     }

//     const node = serialized[key];
//     var obj = {}; // Change const to let
//     // var objArr = [];
//     if (node.type === "object") {
//       node.value.forEach((item) => {
//         var k = item["key"];
//         var value = item["value"];
//         if (k == undefined) {
//           obj[k] = objMap[value];
//         } else {
//           console.log("k, value ", k, " ", value);
//           obj[k] = deserializeNode(value);
//         }
//       });
//     } else if (node.type === "array") {
//       obj = new Array(node.value.length);
//       node.value.forEach((item, index) => {
//         var arrKey = item["key"];
//         var value = item["value"];
//         if (arrKey == undefined) {
//           obj[index] = objMap[value];
//         } else {
//           obj[index] = { [arrKey]: deserializeNode(value) };
//         }
//       });
//     } else {
//       obj = node.value; // Reassign obj here
//     }

//     objMap[key] = obj;
//     return obj;
//   }

//   //   function deserializeNode(key) {
//   //     if (objMap[key]) {
//   //       return objMap[key];
//   //     }

//   //     const node = serialized[key];
//   //     console.log('node jhere ', node, ' ', key, ' key printed')
//   //     let obj;

//   //     if (node.type === "object") {
//   //         console.log('node type is object')
//   //       obj = {};
//   //       node.value.forEach(({ key, value }) => {
//   //         console.log("key value here", key, value)
//   //         if(key == undefined) {
//   //             return seen[]
//   //         }
//   //         obj[key] = deserializeNode(value);
//   //       });
//   //     } else if (node.type === "array") {console.log('node type is array')
//   //       obj = [];
//   //       node.value.forEach(({ value }) => {
//   //         obj.push(deserializeNode(value));
//   //       });
//   //     } else {
//   //       obj = node.value;
//   //     }

//   //     objMap[key] = obj;
//   //     return obj;
//   //   }

//   const rootKey = original.root;
//   console.log("root key ", rootKey);
//   var res = deserializeNode(rootKey);
//   console.log(res);
// };

// const parseRasdesponse = (response) => {
//   // console.log(serialized)
//   const seen = {};
//   let obj = convertToObj(response["serialized"], response["root"], seen);
//   console.log(obj);

//   // function deserializeNode(key) {
//   //     if (objMap[key]) {
//   //         return objMap[key];
//   //     }

//   //     const node = serialized[key];
//   //     const obj = {};

//   //     if (node.type === 'object') {
//   //         node.value.forEach(({ key, value }) => {
//   //             obj[key] = deserializeNode(value);
//   //         });
//   //     } else if (node.type === 'array') {
//   //         obj.length = node.value.length;
//   //         node.value.forEach(({ value }, index) => {
//   //             obj[index] = deserializeNode(value);
//   //         });
//   //     } else {
//   //         obj = node.value;
//   //     }

//   //     objMap[key] = obj;
//   //     return obj;
//   // }

//   // const rootKey = serialized.root;
//   // return deserializeNode(rootKey);
// };

export default parseResponse;
