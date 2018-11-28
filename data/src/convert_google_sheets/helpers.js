
import readXlsxFile from 'read-excel-file/node'

// the object template to take from
const objectTemplate = {
  className: '',
  description: '',
  startDate: '',
  endDate: '',
  duration: ''
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
    const obj = {startDate: date, endDate: date}
    // add the data for the next date of classes
    return arr.concat(
      classes.map(className => ({...objectTemplate, ...obj, className, duration: record[className]}))
    )
  }, [])
  // remove records with duration of 0
  .filter(d => d.duration > 0)
}

// returns an array of promises of the formated excel data for a fileName and all the given sheets
export const getExcelFile = fileName => sheets => sheets.map(sheet => {
  return readXlsxFile(fileName, { sheet }).then(rows => {
    return new Promise(resolve => resolve(getRecords(rows)))
  })
})
