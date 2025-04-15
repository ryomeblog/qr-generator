const QRCode = require('qrcode');
const { QRGeneratorError, ErrorCodes } = require('./errors');

class QRGenerator {
    constructor(options = {}) {
        this.options = {
            width: options.size || 256,
            errorCorrectionLevel: options.error || 'M',
            margin: options.margin || 4,
            color: {
                dark: options.dark || '#000000',
                light: options.light || '#FFFFFF'
            }
        };
    }

    async generateQRImage(text, outputPath) {
        try {
            // オプションのバリデーション
            this.validateOptions();

            // QRコード生成とファイル保存
            await QRCode.toFile(outputPath, text, this.options);
        } catch (error) {
            if (error instanceof QRGeneratorError) {
                throw error;
            }

            if (error.message.includes('width')) {
                throw new QRGeneratorError(
                    ErrorCodes.INVALID_OPTION,
                    { option: 'size', value: this.options.width, details: 'サイズは128から1024の間で指定してください' }
                );
            }

            throw new QRGeneratorError(
                ErrorCodes.WRITE_ERROR,
                { path: outputPath },
                error.message
            );
        }
    }

    validateOptions() {
        // サイズの検証
        if (this.options.width < 128 || this.options.width > 1024) {
            throw new QRGeneratorError(
                ErrorCodes.INVALID_OPTION,
                { option: 'size', value: this.options.width, details: 'サイズは128から1024の間で指定してください' }
            );
        }

        // エラー訂正レベルの検証
        if (!['L', 'M', 'Q', 'H'].includes(this.options.errorCorrectionLevel)) {
            throw new QRGeneratorError(
                ErrorCodes.INVALID_OPTION,
                { option: 'error', value: this.options.errorCorrectionLevel, details: 'エラー訂正レベルはL, M, Q, Hのいずれかを指定してください' }
            );
        }

        // マージンの検証
        if (this.options.margin < 0 || this.options.margin > 10) {
            throw new QRGeneratorError(
                ErrorCodes.INVALID_OPTION,
                { option: 'margin', value: this.options.margin, details: 'マージンは0から10の間で指定してください' }
            );
        }

        // 色のフォーマット検証
        const colorRegex = /^#[0-9A-Fa-f]{6}$/;
        if (!colorRegex.test(this.options.color.dark)) {
            throw new QRGeneratorError(
                ErrorCodes.INVALID_COLOR,
                { color: this.options.color.dark }
            );
        }
        if (!colorRegex.test(this.options.color.light)) {
            throw new QRGeneratorError(
                ErrorCodes.INVALID_COLOR,
                { color: this.options.color.light }
            );
        }
    }
}

module.exports = QRGenerator;