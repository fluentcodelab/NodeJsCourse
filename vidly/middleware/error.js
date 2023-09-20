import "winston-mongodb";
import { createLogger, format, transports } from "winston";

const { combine, timestamp, label, prettyPrint } = format;
const logger = createLogger({
  format: combine(
    timestamp({
      format: "MMM-DD-YYYY HH:mm:ssZ",
    }),
    prettyPrint(),
    format.metadata(),
  ),
  transports: [
    new transports.Console(),
    new transports.File({ filename: "error.log", level: "error" }),
    new transports.MongoDB({ db: "mongodb://127.0.0.1:27017/vidly" }),
  ],
});

export function error(err, req, res, next) {
  logger.error(err.message, err);
  res.status(500).send("Something failed");
}
