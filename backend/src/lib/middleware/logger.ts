import winston from "winston";
import "winston-daily-rotate-file";

const DIRNAME = "logs";

class WinstonLogger {
  private logger: winston.Logger;

  constructor() {
    this.logger = winston.createLogger({
      level: "info",
      format: winston.format.json(),
      transports: [
        new winston.transports.Console({
          format: winston.format.combine(
            winston.format.colorize(),
            winston.format.timestamp(),
            winston.format.printf(({ timestamp, level, message }) => {
              return `${level}: ${message} [${new Date(timestamp as Date).toLocaleString()}]`;
            }),
          ),
        }),
        new winston.transports.DailyRotateFile({
          dirname: `${DIRNAME}/error`,
          filename: "application-%DATE%.log",
          datePattern: "YYYY-MM-DD",
          zippedArchive: true,
          maxSize: "20m",
          maxFiles: "168d", // 6 months
          level: "error",
        }),
        new winston.transports.DailyRotateFile({
          dirname: `${DIRNAME}/info`,
          filename: "application-%DATE%.log",
          datePattern: "YYYY-MM-DD",
          zippedArchive: true,
          maxSize: "20m",
          maxFiles: "168d", // 6 months
          level: "info",
        }),
      ],
    });
  }

  log(message: string) {
    this.logger.info(message);
  }

  error(message: string) {
    this.logger.error(message);
  }
}

const Logger = new WinstonLogger();

export default Logger;
