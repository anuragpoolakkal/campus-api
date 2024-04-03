import log4js from "log4js";

log4js.configure({
    appenders: {
        file: {
            type: "file",
            filename: "logs/application.log",
            maxLogSize: 10485760,
            numBackups: 3,
            compress: true,
        },
        console: {
            type: "stdout",
        },
    },
    categories: {
        default: {
            appenders: ["file", "console"],
            level: "info",
        },
    },
});

const logger = log4js.getLogger();

export default logger;
