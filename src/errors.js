const ErrorCodes = {
    FILE_NOT_FOUND: 'E0001',
    FILE_READ_ERROR: 'E0002',
    INVALID_OPTION: 'E0003',
    WRITE_ERROR: 'E0004'
};

const ErrorMessages = {
    [ErrorCodes.FILE_NOT_FOUND]: 'Input file not found: {path}',
    [ErrorCodes.FILE_READ_ERROR]: 'Failed to read file: {path}',
    [ErrorCodes.INVALID_OPTION]: 'Invalid {option}: {value} ({details})',
    [ErrorCodes.WRITE_ERROR]: 'Failed to write output file: {path}'
};

class QRGeneratorError extends Error {
    constructor(code, params, details = null) {
        const message = ErrorMessages[code].replace(
            /\{(\w+)\}/g,
            (_, key) => params[key]
        );
        super(message);
        this.code = code;
        this.details = details;
    }
}

module.exports = {
    ErrorCodes,
    ErrorMessages,
    QRGeneratorError
};