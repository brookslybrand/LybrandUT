import { readFile } from 'fs'
import path from 'path'

import { getExcelFile } from './helpers'

// returns a promise that resolves with all of the google sheets data
export const getGoogleSheetsData = () => new Promise(resolve => {
  readFile('public/excel_sheet_names.json', 'utf8', (err, data) => {
    const fileInfo = JSON.parse(data)

    const filePromises = fileInfo.reduce((promises, { fileName, sheetNames }) => {
      const fullFileName = `./public/google_sheets/${fileName}`
      return promises.concat(getExcelFile(fullFileName)(sheetNames))
    }, [])


    Promise.all(filePromises).then(data => {
      resolve(data.reduce((arr, d) => arr.concat(d), []))
    })
  })
})
