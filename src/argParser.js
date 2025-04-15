const { Command } = require('commander');
const { QRGeneratorError, ErrorCodes } = require('./errors');

class ArgumentParser {
    static parse(args) {
        const program = new Command();
        const DEFAULT_INPUT = 'qr-text.txt';
        
        try {
            program
                .name('qr-generator')
                .description('テキストファイルの内容からQRコードを生成するツール')
                .option('-s, --size <number>', 'QRコードのサイズ（ピクセル）', this.validateSize, 256)
                .option('-e, --error <level>', 'エラー訂正レベル', this.validateErrorLevel, 'M')
                .option('-m, --margin <number>', 'マージン（セル単位）', this.validateMargin, 4)
                .option('-o, --output <path>', '出力ファイル名', 'qr-output.png')
                .option('-d, --dark <color>', 'QRコードの暗い部分の色', this.validateColor, '#000000')
                .option('-l, --light <color>', 'QRコードの明るい部分の色', this.validateColor, '#FFFFFF')
                .argument('[input]', '入力ファイル', DEFAULT_INPUT);

            program.parse(args);

            const options = program.opts();
            const [inputArg] = program.args;
            
            return {
                ...options,
                input: inputArg || DEFAULT_INPUT
            };
        } catch (error) {
            throw new QRGeneratorError(
                ErrorCodes.INVALID_OPTION,
                { option: error.optionName, value: error.optionValue, details: error.message }
            );
        }
    }

    static validateSize(value) {
        const size = parseInt(value);
        if (isNaN(size) || size < 128 || size > 1024) {
            throw new Error('サイズは128から1024の間で指定してください');
        }
        return size;
    }

    static validateErrorLevel(value) {
        if (!['L', 'M', 'Q', 'H'].includes(value.toUpperCase())) {
            throw new Error('エラー訂正レベルはL, M, Q, Hのいずれかを指定してください');
        }
        return value.toUpperCase();
    }

    static validateMargin(value) {
        const margin = parseInt(value);
        if (isNaN(margin) || margin < 0 || margin > 10) {
            throw new Error('マージンは0から10の間で指定してください');
        }
        return margin;
    }

    static validateColor(value) {
        const colorRegex = /^#[0-9A-Fa-f]{6}$/;
        if (!colorRegex.test(value)) {
            throw new QRGeneratorError(
                ErrorCodes.INVALID_COLOR,
                { color: value }
            );
        }
        return value.toUpperCase();
    }
}

module.exports = ArgumentParser;