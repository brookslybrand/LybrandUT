import { writeFileSync } from 'fs'

import { getGoogleSheetsData } from './convert_google_sheets'
import { getToggleSheetData } from './convert_toggle_data'

Promise.all([getGoogleSheetsData(), getToggleSheetData()]).then(data => {
  const dataFlattened = data.reduce((arr, a) => arr.concat(a), [])
    .sort((a, b) => b.startDate - a.startDate)
    
    writeFileSync('./public/data.json', JSON.stringify(dataFlattened))
})