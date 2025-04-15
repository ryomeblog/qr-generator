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
                .argument('[input]', '入力ファイル', DEFAULT_INPUT);

            program.parse(args);

            const options = program.opts();
            const [inputArg] = program.args;
            
            return {
                ...options,
                // 明示的に入力ファイルを設定
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
}

module.exports = ArgumentParser;