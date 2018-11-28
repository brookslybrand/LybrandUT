import { readFile } from 'fs'
import path from 'path'

import { getExcelFile } from './helpers'

// returns a promise that resolves with all of the google sheets data
const getGoogleSheetsData = () => new Promise(resolve => {
  readFile(`${__dirname}/excel_sheet_names.json`, 'utf8', (err, data) => {
    const fileInfo = JSON.parse(data)

    const filePromises = fileInfo.reduce((promises, { fileName, sheetNames }) => {
      const fullFileName = path.join(__dirname, '../files/google_sheets', fileName)
      return promises.concat(getExcelFile(fullFileName)(sheetNames))
    }, [])


    Promise.all(filePromises).then(data => {
      resolve(data.reduce((arr, d) => arr.concat(d), []))
    })
  })
})
