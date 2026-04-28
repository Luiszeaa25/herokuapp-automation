import {createLogger, format, transports } from 'winston';

const logFormat = format.combine(
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    format.printf(({ timestamp, level, message }) => `${timestamp} [${level.toUpperCase()}]: ${message}`)
);

export const logger = createLogger({

    level: 'info',
    format: logFormat,
    transports: [

        // Logs en en la consola
        new transports.Console({
            format: format.combine(format.colorize(),logFormat)
        }),

        //Guardado de logs en archivo
        new transports.File({
            filename: 'logs/combined.log',
            maxsize: 5242880,
            maxFiles: 5,
        }),

        new transports.File({

            filename: 'logs/error.log',
            level: 'error'
        })
    ]
});