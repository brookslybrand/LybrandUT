import { readFile } from 'fs'
import csv from 'csvtojson'

// returns a promise that resolves with all of the google sheets data
export const getToggleSheetData = () => new Promise(resolve => {
  const fileName = 'public/toggl_sheet.csv'

  // read in a csv file
  csv()
  .fromFile(fileName)
  .then(data => {
    // convert all dates 
    const convertedData = data.map(d => {
      const {
        'Class': className,
        'Duration': duration,
        'Description': description,
        'Start date': startDate, 'Start time': startTime,
        'End date': endDate, 'End time': endTime        
      } = d

      return {
        className, duration, description,
        startDate: new Date(`${startDate} ${startTime} GMT+00:00`),
        endDate: new Date(`${endDate} ${endTime} GMT+00:00`)
      }
    })

    resolve(convertedData)
  })
})
