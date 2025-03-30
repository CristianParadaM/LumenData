const { checkIpVirusTotalService } = require('../services/virusTotalService')
const { ErrorHandler } = require('../utils/errorHandler')

exports.execVirustotal = async (params) => {
  try {
    const { ips, api_keys, next } = params

    const results = await Promise.all(
      ips.map(async (ip) => {
        for (const apiKey of api_keys) {
          try {
            const result = await checkIpVirusTotalService(
              {
                'x-apikey': apiKey,
              },
              {
                ipAddress: ip,
              }
            )
            return result.data
          } catch (error) {
            console.warn(`⚠️ Error con API Key ${apiKey}, intentando con la siguiente...`)
          }
        }
        return next(
          new ErrorHandler(
            400,
            `Hay apiKeys invalidas o se agotaron las consultas máximas diarias para tus apiKeys de checkIpVirusTotalService`
          )
        )
      })
    )

    console.log('🚀 results checkIpVirusTotalService:', results)

    return results
  } catch (error) {
    next(error)
  }
}
