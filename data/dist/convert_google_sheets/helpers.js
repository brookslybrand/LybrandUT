"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getExcelFile = void 0;

var _node = _interopRequireDefault(require("read-excel-file/node"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// the object template to take from
var objectTemplate = {
  className: '',
  description: '',
  startDate: '',
  endDate: '',
  duration: '' // gets the records for a single file and formats them correctly

};

var getRecords = function getRecords(rows) {
  // assume first row is the column names
  var columns = rows[0]; // create objects of each record

  var records = rows.slice(1).map(function (row) {
    return columns.reduce(function (obj, col, i) {
      return _objectSpread({}, obj, _defineProperty({}, col, row[i]));
    }, {});
  }); // drop Date from the columns to get only the classes

  var classes = columns.filter(function (column) {
    return column !== 'Date';
  });
  return records.reduce(function (arr, record) {
    var date = record['Date'];
    var obj = {
      startDate: date,
      endDate: date // add the data for the next date of classes

    };
    return arr.concat(classes.map(function (className) {
      return _objectSpread({}, objectTemplate, obj, {
        className: className,
        duration: record[className]
      });
    }));
  }, []) // remove records with duration of 0
  .filter(function (d) {
    return d.duration > 0;
  });
}; // returns an array of promises of the formated excel data for a fileName and all the given sheets


var getExcelFile = function getExcelFile(fileName) {
  return function (sheets) {
    return sheets.map(function (sheet) {
      return (0, _node.default)(fileName, {
        sheet: sheet
      }).then(function (rows) {
        return new Promise(function (resolve) {
          return resolve(getRecords(rows));
        });
      });
    });
  };
};

exports.getExcelFile = getExcelFile;