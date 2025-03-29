const { checkIpVirusTotalService } = require('../services/virusTotalService')
const { decodeText, convertToCSV, convertToXLSX } = require('../utils/convertText')
const { ErrorHandler } = require('../utils/errorHandler')

exports.exec = async (req, res, next) => {
  try {
    const { file, api_key, format } = req.body
    const ips = decodeText(file)

    if (ips.length === 0) return next(new ErrorHandler(400, 'El archivo no contiene IPs válidas'))

    const results = await Promise.all(
      ips.map(
        async (ip) =>
          await checkIpVirusTotalService(
            {
              'x-apikey': api_key,
            },
            {
              ipAddress: ip,
            }
          )
            .then((result) => result.data)
            .catch(() => next(new ErrorHandler(400, 'El apiKey no es válido o ya venció')))
      )
    )
    console.log('🚀 ~ exports.exec= ~ results:', results)
    console.log('🚀 ~ exports.exec= ~ format:', format)

    res
      .status(200)
      .json({ result: format == 'xlsx' ? convertToXLSX(results) : convertToCSV(results) })
  } catch (error) {
    next(error)
  }
}
