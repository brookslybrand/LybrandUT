
import readXlsxFile from 'read-excel-file/node'

// the object template to take from
const objectTemplate = {
  'Class': '',
  'Description': '',
  'Start date': '',
  'Start time': '',
  'End date': '',
  'End time': '',
  'Duration': ''
}

// gets the records for a single file and formats them correctly
const getRecords = rows => {
  // assume first row is the column names
  const columns = rows[0]
  // create objects of each record
  const records = rows.slice(1).map(row => {
    return columns.reduce((obj, col, i) => ({...obj, [col]: row[i]}), {})
  })

  // drop Date from the columns to get only the classes
  const classes = columns.filter(column => column !== 'Date')
  return records.reduce((arr, record) => {
    const date = record['Date']
    const obj = {'Start date': date, 'Start time': date}
    // add the data for the next date of classes
    return arr.concat(
      classes.map(c => ({...objectTemplate, ...obj, 'Class': c, 'Duration': record[c]}))
    )
  }, [])
  // remove records with duration of 0
  .filter(d => d.Duration > 0)
}

// returns an array of promises of the formated excel data for a fileName and all the given sheets
export const getExcelFile = fileName => sheets => sheets.map(sheet => {
  return readXlsxFile(fileName, { sheet }).then(rows => {
    return new Promise(resolve => resolve(getRecords(rows)))
  })
})
