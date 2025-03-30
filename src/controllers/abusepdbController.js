const { checkIpAbusepdbService } = require('../services/abusepdbService')
const { ErrorHandler } = require('../utils/errorHandler')

exports.execAbuseipdb = async (params) => {
  try {
    const { ips, api_keys, next } = params

    const results = await Promise.all(
      ips.map(async (ip) => {
        for (const apiKey of api_keys) {
          try {
            const result = await checkIpAbusepdbService({ Key: apiKey }, { ipAddress: ip })
            return result.data
          } catch (error) {
            console.warn(`⚠️ Error con API Key ${apiKey}, intentando con la siguiente...`)
          }
        }
        return next(new ErrorHandler(400, `Hay apiKeys invalidas o se agotaron las consultas máximas diarias para tus apiKeys de checkIpAbusepdbService`))
      })
    )

    console.log('🚀 results checkIpAbusepdbService:', results)

    return results
  } catch (error) {
    next(error)
  }
}

