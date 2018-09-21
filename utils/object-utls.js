const uuid = require("uuid/v4");

const objUtils = {
  addClientId(obj,id) {
    return Object.assign( {}, obj, {client_id : uuid()})
  },
  addSessionId(obj,id) {
    return Object.assign( {}, obj, {session_id : uuid()})
  },
  addId(obj,id) {
    return Object.assign( {}, obj, {id : uuid()})
  }
};
module.exports = objUtils;
