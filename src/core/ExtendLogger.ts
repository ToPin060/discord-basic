
import winston from "winston";

/**
 *  Comment:
 *      Winston logger can't be inherited actually..
 *      Soo I choice to specialise by composition rather than use an ugly workaround.
 *      See: https://github.com/winstonjs/winston/issues/1902
 * 
 *  Note:
 *      This class is an extension of the Logger from winston.
 *      Official winston documentation: https://www.npmjs.com/package/winston
 *      
 *      ExtenLogger implement an header log.
 * 
 *  ExtendLogger is a singleton. 
 */
export class ExtendLogger {
    private readonly __format = winston.format.printf(({ level, message, timestamp }) => {
        return `${timestamp} ${level}: ${message}`;
    });
    private readonly __separatorHeader: string = "#".repeat(50);

    // Default Winston logger (compound)
    private readonly __logger: winston.Logger;


    private constructor() {
        this.__logger = winston.createLogger({
            transports: [
                new winston.transports.Console({
                    level: "debug",
                    format: winston.format.combine(
                        winston.format.colorize(),
                        winston.format.timestamp(),
                        this.__format
                    )
                }),
                new winston.transports.File({
                    level: "info",
                    format: winston.format.combine(
                        winston.format.timestamp(),
                        this.__format
                    ),
                    filename: "app.log"
                })
            ]
        });
    }

    
    public logHeader(message: string): void {
        this.__logger.info(this.__separatorHeader);
        this.__logger.info("");
        this.__logger.info(`\t\t\t  ${message}`);
        this.__logger.info("");
        this.__logger.info(this.__separatorHeader);
    };

    public info(message: string) {
        this.__logger.info(message);
    };
    public warn(message: string) {
        this.__logger.warn(message);
    };
    public error(message: string) {
        this.__logger.error(message);
    };
    public debug(message: string) {
        this.__logger.debug(message);
    };

    /**
     * Singleton properties
     */
    private static _instance: ExtendLogger;
    public static get instance(): ExtendLogger {
        if (!this._instance) {
            this._instance = new ExtendLogger()
        }
        return this._instance;
    }
}

const logger = ExtendLogger.instance;
export default logger;
