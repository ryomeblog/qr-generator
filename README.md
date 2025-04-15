# QR Code Generator

## 概要
テキストファイルの内容をQRコードに変換し、PNG形式で出力するコマンドラインツールです。

## インストール方法
```bash
npm install
```

## 使用方法

### 基本的な使用方法
```bash
qr-generator [オプション] [ファイルパス]
```

ファイルパスを指定しない場合は、デフォルトで `./qr-text.txt` が読み込まれます。

### オプション
```bash
Options:
  -s, --size <number>     QRコードのサイズ（ピクセル）(デフォルト: 256)
  -e, --error <L|M|Q|H>   エラー訂正レベル (デフォルト: M)
  -m, --margin <number>   マージン（セル単位）(デフォルト: 4)
  -o, --output <path>     出力ファイル名 (デフォルト: qr-output.png)
  -h, --help             ヘルプを表示
```

### 使用例
```bash
# 基本的な使用方法（デフォルトのファイルを使用）
qr-generator

# 特定のファイルを指定
qr-generator path/to/input.txt

# サイズとエラー訂正レベルを指定
qr-generator -s 400 -e H input.txt

# 出力ファイル名を指定
qr-generator -o custom-qr.png input.txt

# すべてのオプションを指定
qr-generator -s 400 -e H -m 2 -o custom-qr.png input.txt
```

## トラブルシューティング

### エラーコードと対処方法

#### E0001: FILE_NOT_FOUND
入力ファイルが見つからない場合に発生します。
```
Error [E0001]: Input file not found: ./input.txt
詳細: 指定されたパスにファイルが存在しません
```
**対処方法:**
- ファイルパスが正しいか確認
- ファイルが存在するか確認
- 相対パスの場合、実行時のカレントディレクトリを確認

#### E0002: FILE_READ_ERROR
ファイルの読み込みに失敗した場合に発生します。
```
Error [E0002]: Failed to read file: ./input.txt
詳細: ファイルの読み込み権限がないか、ファイルがロックされています
```
**対処方法:**
- ファイルの権限設定を確認
- ファイルが他のプロセスによってロックされていないか確認
- ファイルが破損していないか確認

#### E0003: INVALID_OPTION
不正なオプション値が指定された場合に発生します。
```
Error [E0003]: Invalid error correction level: X (must be L, M, Q, or H)
詳細: エラー訂正レベルは L, M, Q, H のいずれかを指定してください
```
**対処方法:**
- サイズは128-1024の範囲内の正の整数を指定
- エラー訂正レベルは L, M, Q, H のいずれかを指定
- マージンは0-10の範囲内の正の整数を指定

#### E0004: WRITE_ERROR
出力ファイルの書き込みに失敗した場合に発生します。
```
Error [E0004]: Failed to write output file: ./qr-output.png
詳細: 出力先のディレクトリに書き込み権限がないか、ディスク容量が不足しています
```
**対処方法:**
- 出力先ディレクトリの書き込み権限を確認
- ディスク容量が十分か確認
- 出力ファイルが他のプロセスによってロックされていないか確認

## ライセンス
MIT License - 詳細は[LICENSE](LICENSE)ファイルを参照してください。