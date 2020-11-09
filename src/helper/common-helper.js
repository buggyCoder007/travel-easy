const _ = require("lodash");

checkMandatoryFields = (reqObj, fields) => {
  let fieldsNotAvailable = [];
  console.log(reqObj);
  for (field of fields) {
    if (!_.has(reqObj, field) || _.isEmpty(reqObj[field])) {
      fieldsNotAvailable.push(field);
    }
  }
  return fieldsNotAvailable;
};

module.exports = {
  checkMandatoryFields
};
