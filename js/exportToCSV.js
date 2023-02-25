// Exporting to CSV is a 4-step process:

// 1st part
// First we narrow the time-frame of our selection and order the CSV chronologically (first oldest)

// 2nd part
// Adds table headers and converts the objectArray into an array of arrays
function convertToArray(objectArray) {
  let txs = sortByKey(objectArray, 'jsdate')
  let output = []
  for (let i = 0; i < txs.length; i++) {
    let row = []
    row[0] = txs[i].date
    row[1] = txs[i].description
    row[2] = txs[i].amount
    row[3] = txs[i].category
    row[4] = txs[i].picture
    output[i] = row
  }
  output.unshift(['Date', 'Description', 'Amount', 'Category', 'Picture'])
  return output
}


// 3rd part
// generates CSV content from an array of arrays

// We create the CSV body here

function generateCSV(arrayOfArrays) {
  let content = ''
  for (let e = 0; e < arrayOfArrays.length; e++) {
    for (let i = 0; i < arrayOfArrays[e].length; i++) {
      let cell = arrayOfArrays[e][i]

      let comma = ','

      // If it's the end of the row, we no longer add the comma
      if (i === arrayOfArrays[e].length-1) {
        comma = ''
      }

      if (isNaN(cell) && cell !== undefined) {
        // escaping possible double quotes in the data with double quotes (""), then we enclose the Not a Number (NaN) data between double quotes
        content += '"' + cell.replaceAll('"', '""') + '"' + comma
      } else if (cell === undefined) {
        content += comma
      } else {
        content += cell + comma
      }
    }
    content += '\n'
  }
  return content
}

// 4th part: Trigger Download
// The download function takes a string in CSV format, the filename, and mimeType as parameters. Supposed to be retro-compatible with IE 11, Chrome 36 and Firefox 29
// How to call:
// downloadCSV(csvContent, 'export.csv', 'text/csv;encoding:utf-8')

const downloadCSV = function (content, fileName, mimeType, email) {

  let a = document.createElement('a')
  mimeType = mimeType || 'application/octet-stream'

  // If we can trigger the native share function on the mobile device we do so:
  // if (navigator.share) {
  //   navigator.share({
  //       title: fileName,
  //       text: 'Exported from Books App',
  //       url: 'data:application/octet-stream,' + encodeURIComponent(content)
  //   }).then(() => alert('Successful share!'))
  //   .catch(err => alert(err));
  // } // works if website is served via HTTPs

  if (navigator.msSaveBlob) { // IE10
    navigator.msSaveBlob(new Blob([content], {
      type: mimeType
    }), fileName)
  } else if (URL && 'download' in a) { //html5 A[download]
    a.href = URL.createObjectURL(new Blob([content], {
      type: mimeType
    }))
    a.setAttribute('download', fileName)
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
  } else {
    location.href = 'data:application/octet-stream,' + encodeURIComponent(content) // only this mime type is supported
  }
}