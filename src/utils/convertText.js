const Papa = require('papaparse')
const XLSX = require('xlsx')

function decodeText(fileBase64) {
  const decodedText = Buffer.from(fileBase64, 'base64').toString('utf-8')
  return decodedText
    .split('\n')
    .map((ip) => ip.trim())
    .filter((ip) => ip)
}

function convertToCSV(data) {
  data = formatData(data)
  const csv = Papa.unparse(data, { delimiter: ',', quotes: false })
  return Buffer.from(csv, 'utf-8').toString('base64')
}

function convertToXLSX(data) {
  data = formatData(data)
  const worksheet = XLSX.utils.json_to_sheet(data)
  const workbook = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Results')
  const buffer = XLSX.write(workbook, { type: 'buffer', bookType: 'xlsx' })
  return buffer.toString('base64')
}

function formatData(data) {
  return data.map((item) => {
    return Object.fromEntries(
      Object.entries(item).map(([key, value]) => [
        key,
        typeof value === 'object' ? JSON.stringify(value) : value,
      ])
    )
  })
}

module.exports = { convertToCSV, convertToXLSX, decodeText }
