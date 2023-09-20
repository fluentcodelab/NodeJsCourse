import { createLogger, format, transports } from "winston";

const { combine, timestamp, label, prettyPrint } = format;
const logger = createLogger({
  format: combine(
    timestamp({
      format: "MMM-DD-YYYY HH:mm:ssZ",
    }),
    prettyPrint(),
  ),
  transports: [
    new transports.Console(),
    new transports.File({ filename: "error.log", level: "error" }),
  ],
});

export function error(err, req, res, next) {
  logger.error(err.message, err);
  res.status(500).send("Something failed");
}
