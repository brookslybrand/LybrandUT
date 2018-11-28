"use strict";

var _fs = require("fs");

var _convert_google_sheets = require("./convert_google_sheets");

var _convert_toggle_data = require("./convert_toggle_data");

Promise.all([(0, _convert_google_sheets.getGoogleSheetsData)(), (0, _convert_toggle_data.getToggleSheetData)()]).then(function (data) {
  var dataFlattened = data.reduce(function (arr, a) {
    return arr.concat(a);
  }, []).sort(function (a, b) {
    return b.startDate - a.startDate;
  });
  (0, _fs.writeFileSync)('./public/data.json', JSON.stringify(dataFlattened));
});