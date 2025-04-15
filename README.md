# QR Code Generator

## 概要
テキストファイルの内容をQRコードに変換し、PNG形式で出力するコマンドラインツールです。
カスタムカラーでQRコードを生成することもできます。

## インストール方法

### グローバルインストール（推奨）
```bash
npm install -g @ryome/qr-generator
```

これにより、`qr-generator` コマンドがグローバルで使用可能になります。

### ローカルインストール
```bash
npm install @ryome/qr-generator
```

この場合は、`npx qr-generator` として実行する必要があります。

## 使用方法

### 基本的な使用方法
```bash
qr-generator [オプション] [ファイルパス]
```

ファイルパスを指定しない場合は、デフォルトで `./qr-text.txt` が読み込まれます。

### オプション
```bash
Options:
  -s, --size <number>      QRコードのサイズ（ピクセル）(デフォルト: 256)
  -e, --error <L|M|Q|H>    エラー訂正レベル (デフォルト: M)
  -m, --margin <number>    マージン（セル単位）(デフォルト: 4)
  -o, --output <path>      出力ファイル名 (デフォルト: qr-output.png)
  -d, --dark <color>       QRコードの暗い部分の色 (デフォルト: #000000)
  -l, --light <color>      QRコードの明るい部分の色 (デフォルト: #ffffff)
  -h, --help              ヘルプを表示
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

# QRコードの色を指定（赤色のQRコード）
qr-generator -d "#FF0000" -l "#FFFFFF" input.txt

# すべてのオプションを指定
qr-generator -s 400 -e H -m 2 -d "#000080" -l "#FFFFCC" -o custom-qr.png input.txt

# npxを使用する場合（ローカルインストール時）
npx qr-generator -s 400 input.txt
```

## 必要要件
- Node.js 14.0.0以上

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

#### E0005: INVALID_COLOR
不正な色指定の場合に発生します。
```
Error [E0005]: Invalid color format: invalid-color (must be #RRGGBB format)
詳細: カラーコードは #RRGGBB 形式で指定してください（例: #FF0000）
```
**対処方法:**
- カラーコードは#で始まる6桁の16進数で指定
- 大文字小文字は区別しない（#ff0000も#FF0000も有効）
- 3桁の短縮形式は使用不可（#FFFは無効）

## ライセンス
MIT License - 詳細は[LICENSE](LICENSE)ファイルを参照してください。

## 作者
ryome

## バグ報告
バグを見つけた場合は、[GitHub Issues](https://github.com/ryome/qr-generator/issues)に報告してください。