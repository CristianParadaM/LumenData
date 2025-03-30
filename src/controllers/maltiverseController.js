const { checkIpMaltiverseService } = require('../services/maltiverseService')
const { ErrorHandler } = require('../utils/errorHandler')

exports.execMaltiverse = async (params) => {
  try {
    const { ips, api_keys, next } = params

    const results = await Promise.all(
      ips.map(async (ip) => {
        for (const apiKey of api_keys) {
          try {
            const result = await checkIpMaltiverseService(
              { Authorization: `bearer ${apiKey}` },
              { ipAddress: ip }
            )
            return result
          } catch (error) {
            console.log('🚀 ~ ips.map ~ error:', error)
            console.warn(`⚠️ Error con API Key ${apiKey}, intentando con la siguiente...`)
          }
        }
        return next(
          new ErrorHandler(
            400,
            `Hay apiKeys invalidas o se agotaron las consultas máximas diarias para tus apiKeys de checkIpMaltiverseService`
          )
        )
      })
    )

    console.log('🚀 results checkIpMaltiverseService:', results)

    return results
  } catch (error) {
    next(error)
  }
}
