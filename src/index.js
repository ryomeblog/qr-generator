const ArgumentParser = require('./argParser');
const FileReader = require('./fileReader');
const QRGenerator = require('./qrGenerator');
const { QRGeneratorError } = require('./errors');

async function main() {
    try {
        // コマンドライン引数の解析
        const options = ArgumentParser.parse(process.argv);
        
        // 入力ファイルの読み込み
        const text = await FileReader.readFile(options.input);
        
        // QRコード生成
        const generator = new QRGenerator(options);
        await generator.generateQRImage(text, options.output);
        
        console.log(`QRコードを生成しました: ${options.output}`);
        process.exit(0);
    } catch (error) {
        if (error instanceof QRGeneratorError) {
            console.error(`Error [${error.code}]: ${error.message}`);
            if (error.details) {
                console.error(`詳細: ${error.details}`);
            }
        } else {
            console.error('予期せぬエラーが発生しました:', error.message);
        }
        process.exit(1);
    }
}

main();