const moment = require('moment');

const dateFormat = (timestamp) => {
  return moment(timestamp).format('MMMM Do YYYY, h:mm:ss a');
};

module.exports = {
  dateFormat,
};
