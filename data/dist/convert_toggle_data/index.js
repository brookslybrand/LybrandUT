"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getToggleSheetData = void 0;

var _fs = require("fs");

var _csvtojson = _interopRequireDefault(require("csvtojson"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// returns a promise that resolves with all of the google sheets data
var getToggleSheetData = function getToggleSheetData() {
  return new Promise(function (resolve) {
    var fileName = 'public/toggl_sheet.csv'; // read in a csv file

    (0, _csvtojson.default)().fromFile(fileName).then(function (data) {
      // convert all dates 
      var convertedData = data.map(function (d) {
        var className = d['Class'],
            duration = d['Duration'],
            description = d['Description'],
            startDate = d['Start date'],
            startTime = d['Start time'],
            endDate = d['End date'],
            endTime = d['End time'];
        return {
          className: className,
          duration: duration,
          description: description,
          startDate: new Date("".concat(startDate, " ").concat(startTime, " GMT+00:00")),
          endDate: new Date("".concat(endDate, " ").concat(endTime, " GMT+00:00"))
        };
      });
      resolve(convertedData);
    });
  });
};

exports.getToggleSheetData = getToggleSheetData;