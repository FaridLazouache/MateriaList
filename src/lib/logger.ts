type LogLevel = 'debug' | 'info' | 'warn' | 'error';

const LOG_LEVELS: Record<LogLevel, number> = {
    debug: 0,
    info: 1,
    warn: 2,
    error: 3,
};

const getLogLevel = (): LogLevel => {
    const level = process.env.LOG_LEVEL?.toLowerCase() as LogLevel;
    return level && level in LOG_LEVELS ? level : 'info';
};

const currentLogLevel = getLogLevel();
const isSvelte = typeof window !== 'undefined';

const formatMessage = (level: LogLevel, message: string): string => {
    const timestamp = new Date().toISOString();
    return `[${timestamp}] [${level.toUpperCase()}] ${message}`;
};

const shouldLog = (level: LogLevel): boolean => {
    return LOG_LEVELS[level] >= LOG_LEVELS[currentLogLevel];
};

export const logger = {
    debug: (message: string) => {
        if (shouldLog('debug')) {
            const formatted = formatMessage('debug', message);
            isSvelte ? console.log(formatted) : console.debug(formatted);
        }
    },
    info: (message: string) => {
        if (shouldLog('info')) {
            console.info(formatMessage('info', message));
        }
    },
    warn: (message: string) => {
        if (shouldLog('warn')) {
            console.warn(formatMessage('warn', message));
        }
    },
    error: (message: string) => {
        if (shouldLog('error')) {
            console.error(formatMessage('error', message));
        }
    },
};