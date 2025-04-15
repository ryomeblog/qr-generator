const fs = require('fs').promises;
const path = require('path');
const { QRGeneratorError, ErrorCodes } = require('./errors');

class FileReader {
    static async readFile(filePath) {
        try {
            // カレントディレクトリからの相対パスを解決
            const resolvedPath = path.resolve(process.cwd(), filePath);

            // ファイルの存在確認
            try {
                await fs.access(resolvedPath, fs.constants.R_OK);
            } catch (error) {
                throw new QRGeneratorError(
                    ErrorCodes.FILE_NOT_FOUND,
                    { path: filePath },
                    'ファイルが存在しないか、読み取り権限がありません。\n' +
                    `確認したパス: ${resolvedPath}`
                );
            }

            // ファイルの読み込み
            const content = await fs.readFile(resolvedPath, 'utf8');
            
            if (!content.trim()) {
                throw new QRGeneratorError(
                    ErrorCodes.FILE_READ_ERROR,
                    { path: filePath },
                    'ファイルが空です'
                );
            }

            return content.trim();
        } catch (error) {
            if (error instanceof QRGeneratorError) {
                throw error;
            }
            throw new QRGeneratorError(
                ErrorCodes.FILE_READ_ERROR,
                { path: filePath },
                error.message
            );
        }
    }
}

module.exports = FileReader;