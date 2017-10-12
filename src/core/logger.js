const { createLogger, format, transports } = require('winston')
const { combine, timestamp, label, printf } = format

const myFormat = printf(info => {
  return `${info.timestamp} [${info.label}] ${info.level}: ${info.message}`
})

const createLabelledLogger = (labelName) => createLogger({
  level: 'info',
  format: combine(
    label({label: labelName}),
    timestamp(),
    myFormat
  ),
  transports: [new transports.Console()]
})

export const logger = {
  default: createLogger({
    level: 'info',
    transports: [new transports.Console()]
  })
}
