"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getGoogleSheetsData = void 0;

var _fs = require("fs");

var _path = _interopRequireDefault(require("path"));

var _helpers = require("./helpers");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// returns a promise that resolves with all of the google sheets data
var getGoogleSheetsData = function getGoogleSheetsData() {
  return new Promise(function (resolve) {
    (0, _fs.readFile)('public/excel_sheet_names.json', 'utf8', function (err, data) {
      var fileInfo = JSON.parse(data);
      var filePromises = fileInfo.reduce(function (promises, _ref) {
        var fileName = _ref.fileName,
            sheetNames = _ref.sheetNames;
        var fullFileName = "./public/google_sheets/".concat(fileName);
        return promises.concat((0, _helpers.getExcelFile)(fullFileName)(sheetNames));
      }, []);
      Promise.all(filePromises).then(function (data) {
        resolve(data.reduce(function (arr, d) {
          return arr.concat(d);
        }, []));
      });
    });
  });
};

exports.getGoogleSheetsData = getGoogleSheetsData;